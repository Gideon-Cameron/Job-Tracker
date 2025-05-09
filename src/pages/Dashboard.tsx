import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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
        <h2 className="text-xl font-bold text-gray-800 dark:text-[#ccd6f6]">You are not logged in</h2>
        <p className="text-gray-600 dark:text-[#8892b0]">Redirecting to login...</p>
      </div>
    );
  }

  const totalJobs = jobs.length;
  const appliedCount = jobs.filter((job) => job.status === "Applied").length;
  const interviewCount = jobs.filter((job) => job.status === "Interview Scheduled").length;
  const rejectedCount = jobs.filter((job) => job.status === "Rejected").length;
  const offersCount = jobs.filter((job) => job.status.toLowerCase() === "offer received").length;

  return (
    <div className="container mx-auto mt-20 px-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-[#ccd6f6]">
        Welcome, {userData?.email || ""}
      </h2>

      <h3 className="text-lg text-gray-600 dark:text-[#8892b0] mb-6">
        Your applications overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Applications" value={totalJobs} color="border-[#64ffda]" />
        <StatCard label="Applied Jobs" value={appliedCount} color="border-[#64ffda]" />
        <StatCard label="Interviews Scheduled" value={interviewCount} color="border-[#64ffda]" />
        <StatCard label="Rejections" value={rejectedCount} color="border-[#64ffda]" />
        <StatCard label="Offers Received" value={offersCount} color="border-[#64ffda]" />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color }) => {
  return (
    <div
      className={`p-6 rounded-lg border ${color} shadow-md bg-white dark:bg-[#1a1f2e] transition hover:shadow-lg hover:border-[#64ffda]`}
    >
      <p className="text-3xl font-bold text-gray-900 dark:text-[#ccd6f6]">{value}</p>
      <p className="text-sm text-gray-600 dark:text-[#8892b0]">{label}</p>
    </div>
  );
};

export default Dashboard;
