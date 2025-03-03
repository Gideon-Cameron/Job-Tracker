import React from "react";

interface FilterBarProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filterStatus, setFilterStatus, searchQuery, setSearchQuery }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <label className="text-gray-700 dark:text-gray-300">Filter by Status:</label>
        <select
          className="ml-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
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
      <div>
        <label className="text-gray-700 dark:text-gray-300">Search:</label>
        <input
          type="text"
          className="ml-2 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          placeholder="Search by company"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterBar;
