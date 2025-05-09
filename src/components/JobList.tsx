import React from "react";
import { motion } from "framer-motion";

interface Job {
  id: string;
  title: string;
  company: string;
  status: string;
  date: string;
}

interface JobListProps {
  jobs: Job[];
  deleteJob: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-200";
    case "Interview Scheduled":
      return "bg-yellow-100 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-200";
    case "Offer Received":
      return "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-200";
    case "Rejected":
      return "bg-red-100 text-red-900 dark:bg-red-700 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};

const JobList: React.FC<JobListProps> = ({ jobs, deleteJob }) => {
  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-[#ccd6f6] mb-4">
        Job Applications
      </h2>

      {jobs.length === 0 ? (
        <p className="text-gray-500 dark:text-[#8892b0]">No jobs added yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <motion.li
              key={job.id}
              className={`p-4 rounded-lg shadow-md ${getStatusColor(job.status)} transition-colors`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{job.title}</h3>
                  <p className="text-sm">{job.company}</p>
                  <p className="text-xs opacity-70">Applied: {job.date}</p>
                </div>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="text-[#64ffda] border border-[#64ffda] px-3 py-1 rounded hover:bg-[#64ffda]/10 transition"
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default JobList;
