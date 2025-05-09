import React, { useState } from "react";
import { db } from "../firebaseConfig"; // ✅ Import Firestore
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth

const JobForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // ✅ Get logged-in user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;
    if (!user) {
      alert("You must be logged in to add a job!");
      return;
    }

    setLoading(true); // ✅ Prevents multiple submissions

    try {
      await addDoc(collection(db, "jobs"), {
        title,
        company,
        status,
        date: new Date().toISOString().split("T")[0], // Store date in YYYY-MM-DD format
        userId: user.uid,
      });

      console.log("Job added successfully!"); // ✅ Debugging log

      // ✅ Clear form after submission
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
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#112240] p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-[#ccd6f6]">Add a Job</h2>
      <div className="mb-2">
        <label className="block text-[#8892b0] dark:text-gray-300">Job Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-[#8892b0] dark:text-gray-300">Company</label>
        <input
          type="text"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-[#8892b0] dark:text-gray-300">Status</label>
        <select
          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <button
        type="submit"
        className={`mt-3 w-full border border-[#64ffda] text-[#64ffda] hover:bg-[#64ffda]/10 transition-colors duration-200 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Job"}
      </button>
    </form>
  );
};

export default JobForm;
