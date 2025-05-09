import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const JobForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;
    if (!user) {
      alert("You must be logged in to add a job!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "jobs"), {
        title,
        company,
        status,
        date: new Date().toISOString().split("T")[0],
        userId: user.uid,
      });

      setTitle("");
      setCompany("");
      setStatus("Applied");
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-[#112240] p-6 rounded-lg shadow-md space-y-4 transition-colors duration-300"
      >
        <motion.h2
          className="text-2xl font-bold text-gray-900 dark:text-[#ccd6f6] mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Add a New Job
        </motion.h2>

        {/* Job Title */}
        <div>
          <label className="block text-gray-700 dark:text-[#8892b0] mb-1">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#0a192f] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition"
            placeholder="e.g. Frontend Developer"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-gray-700 dark:text-[#8892b0] mb-1">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#0a192f] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition"
            placeholder="e.g. OpenAI"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 dark:text-[#8892b0] mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-[#0a192f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition"
          >
            <option value="Applied">Applied</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Offer Received">Offer Received</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors duration-200 py-2 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Job"}
        </button>
      </form>
    </motion.div>
  );
};

export default JobForm;
