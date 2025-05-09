import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto text-center mt-24 px-6">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-[#ccd6f6] mb-4">
        Welcome to Job Tracker
      </h1>

      <p className="text-lg text-gray-700 dark:text-[#8892b0] max-w-2xl mx-auto">
        Your personal job search assistant. Organize, track, and monitor your job applications from one place. Easily manage statuses, add notes, and never lose track of your job hunt progress again.
      </p>

      <div className="mt-10 flex justify-center gap-6 flex-wrap">
        <Link
          to="/dashboard"
          className="px-6 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-200"
        >
          Go to Dashboard
        </Link>

        <Link
          to="/login"
          className="px-6 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;


