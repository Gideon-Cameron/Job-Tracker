import React from "react";

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

const JobList: React.FC<JobListProps> = ({ jobs, deleteJob }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200";
      case "Interview Scheduled":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200";
      case "Offer Received":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Job Applications</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs added yet.</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className={`p-4 rounded shadow-md ${getStatusColor(job.status)}`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-sm">{job.company}</p>
                  <p className="text-xs">Date Applied: {job.date}</p>
                </div>
                <button
                  onClick={() => deleteJob(job.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
