import React, { lazy, Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { db } from "./firebaseConfig";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
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

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Firestore Updated - Jobs:", snapshot.docs.length);
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

  const deleteJob = async (id: string) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      console.log("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (filterStatus === "All" || job.status === filterStatus) &&
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#111827] dark:text-darkPrimaryText transition-colors duration-300">
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
                  <JobForm />
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
    </div>
  );
};

export default App;
