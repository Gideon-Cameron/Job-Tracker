import React from "react";
import { motion } from "framer-motion";

interface FilterBarProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-[#112240] p-4 rounded-lg shadow-md flex flex-wrap md:justify-between gap-4 items-center transition-colors duration-300"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filter Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-gray-800 dark:text-[#8892b0] font-medium">
          Filter by Status:
        </label>
        <select
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-[#0a192f] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Search Field */}
      <div className="flex items-center gap-2">
        <label className="text-gray-800 dark:text-[#8892b0] font-medium">
          Search:
        </label>
        <input
          type="text"
          placeholder="Company name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-[#0a192f] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda] transition"
        />
      </div>
    </motion.div>
  );
};

export default FilterBar;
