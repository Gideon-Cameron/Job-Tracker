import React, { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { db } from "./firebaseConfig";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useAuth } from "./context/AuthContext";

// ✅ Lazy Load Pages for Better Performance
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const JobForm = lazy(() => import("./components/JobForm"));
const FilterBar = lazy(() => import("./components/FilterBar"));
const JobList = lazy(() => import("./components/JobList"));

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  date: string;
  userId: string;
}

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  // 🔥 Load Jobs from Firestore (Only for Logged-in User)
  useEffect(() => {
    if (!user) {
      setJobs([]);
      return;
    }

    const q = query(collection(db, "jobs"), where("userId", "==", user.uid));

    // ✅ Prevent multiple listeners
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Firestore Updated - Jobs:", snapshot.docs.length); // Debugging Log
      setJobs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          company: doc.data().company,
          status: doc.data().status,
          date: doc.data().date,
          userId: doc.data().userId,
        })) as Job[]
      );
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ Add Job to Firestore
  const addJob = async (newJob: { title: string; company: string; status: string; date: string }) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const jobRef = await addDoc(collection(db, "jobs"), {
        ...newJob,
        userId: user.uid,
      });

      // ✅ Update UI Optimistically
      setJobs((prevJobs) => [...prevJobs, { id: jobRef.id, ...newJob, userId: user.uid }]);

      console.log("Job added successfully!");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // ✅ Delete Job from Firestore
  const deleteJob = async (id: string) => {
    try {
      await deleteDoc(doc(db, "jobs", id));

      // ✅ Update UI Optimistically
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));

      console.log("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // ✅ Filter jobs
  const filteredJobs = jobs.filter(
    (job) =>
      (filterStatus === "All" || job.status === filterStatus) &&
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-3xl p-6 mt-20">
        <Suspense fallback={<div className="text-center text-gray-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard jobs={jobs} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/job-tracker"
              element={
                <>
                  <JobForm addJob={addJob} /> {/* ✅ Fixed: Pass `addJob` here */}
                  <FilterBar
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                  <JobList jobs={filteredJobs} deleteJob={deleteJob} />
                </>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
