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

const statusColors: Record<string, string> = {
  Applied: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200",
  "Interview Scheduled": "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100",
  "Offer Received": "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100",
};

const JobItem: React.FC<JobItemProps> = ({ job, deleteJob }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-white dark:bg-[#112240] rounded-lg shadow-md flex justify-between items-start border border-gray-300 dark:border-gray-700"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-[#ccd6f6]">{job.title}</h3>
        <p className="text-sm text-gray-600 dark:text-[#8892b0]">{job.company}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Applied on {job.date}</p>
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[job.status] || "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}
        >
          {job.status}
        </span>
      </div>
      <button
        onClick={() => deleteJob(job.id)}
        className="px-3 py-1 text-[#64ffda] border border-[#64ffda] rounded hover:bg-[#64ffda]/10 transition ml-4 text-sm"
      >
        ❌ Delete
      </button>
    </motion.li>
  );
};

export default JobItem;
