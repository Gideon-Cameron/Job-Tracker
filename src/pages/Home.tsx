import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <motion.div
      className="container mx-auto text-center mt-24 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-gray-900 dark:text-[#ccd6f6] mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome to Job Tracker
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 dark:text-[#8892b0] max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Your personal job search assistant. Organize, track, and monitor your job applications from one place. Easily manage statuses, add notes, and never lose track of your job hunt progress again!
      </motion.p>

      <motion.div
        className="mt-10 flex justify-center gap-6 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
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
      </motion.div>
    </motion.div>
  );
};

export default Home;
