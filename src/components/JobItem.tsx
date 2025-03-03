import React from "react";
import { motion } from "framer-motion";

interface Job {
  id: number;
  title: string;
  company: string;
  status: string;
  date: string;
}

interface JobItemProps {
  job: Job;
  deleteJob: (id: number) => void;
}

// ✅ Status Color Mapping
const statusColors: Record<string, string> = {
  Applied: "bg-blue-200 text-blue-800",
  "Interview Scheduled": "bg-yellow-200 text-yellow-800",
  Rejected: "bg-red-200 text-red-800",
  Offer: "bg-green-200 text-green-800",
};

const JobItem: React.FC<JobItemProps> = ({ job, deleteJob }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center border border-gray-300 dark:border-gray-700"
    >
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Applied on {job.date}</p>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[job.status] || "bg-gray-200 text-gray-800"}`}>
          {job.status}
        </span>
      </div>
      <button
        onClick={() => deleteJob(job.id)}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        ❌ Delete
      </button>
    </motion.li>
  );
};

export default JobItem;
