import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto text-center mt-20">
      <h1 className="text-3xl font-bold">Welcome to Job Tracker</h1>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Manage your job applications efficiently.
      </p>
      <div className="mt-6 space-x-4">
        <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded">
          Go to Dashboard
        </Link>
        <Link to="/login" className="px-4 py-2 bg-gray-700 text-white rounded">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
