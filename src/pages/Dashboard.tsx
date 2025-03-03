import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // ✅ Import Firestore
import { doc, getDoc } from "firebase/firestore"; // ✅ Import Firestore functions

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  date: string;
}

interface DashboardProps {
  jobs: Job[];
}

const Dashboard: React.FC<DashboardProps> = ({ jobs }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ email: string } | null>(null);

  // 🚀 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      setTimeout(() => navigate("/login"), 2000);
    } else {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as { email: string });
        }
      };
      fetchUserData();
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="container mx-auto text-center mt-20">
        <h2 className="text-xl font-bold">You are not logged in</h2>
        <p className="text-gray-500">Redirecting to login...</p>
      </div>
    );
  }

  // ✅ Count job statuses
  const totalJobs = jobs.length;
  const appliedCount = jobs.filter((job) => job.status === "Applied").length; // ✅ Applied Jobs
  const interviewCount = jobs.filter((job) => job.status === "Interview Scheduled").length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
  const offersCount = jobs.filter((job) => job.status.toLowerCase() === "offer received").length;
  console.log("Jobs Data:", jobs);

  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-xl font-bold">Welcome, {userData?.email || "User"}!</h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-blue-200 text-blue-900 dark:bg-blue-700 dark:text-white rounded-lg">
          <p className="text-lg font-semibold">{totalJobs}</p>
          <p className="text-sm">Total Applications</p>
        </div>
        <div className="p-4 bg-yellow-200 text-yellow-900 dark:bg-yellow-700 dark:text-white rounded-lg">
          <p className="text-lg font-semibold">{appliedCount}</p>
          <p className="text-sm">Applied Jobs</p>
        </div>
        <div className="p-4 bg-purple-200 text-purple-900 dark:bg-purple-700 dark:text-white rounded-lg">
          <p className="text-lg font-semibold">{interviewCount}</p>
          <p className="text-sm">Interviews Scheduled</p>
        </div>
        <div className="p-4 bg-red-200 text-red-900 dark:bg-red-700 dark:text-white rounded-lg">
          <p className="text-lg font-semibold">{rejectedCount}</p>
          <p className="text-sm">Rejections</p>
        </div>
        <div className="p-4 bg-green-200 text-green-900 dark:bg-green-700 dark:text-white rounded-lg">
          <p className="text-lg font-semibold">{offersCount}</p>
          <p className="text-sm">Offers Received</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
