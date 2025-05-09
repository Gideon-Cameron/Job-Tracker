import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // ✅ Get user & logout function

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#ccd6f6] ">
          <Link to="/">Job Tracker</Link>
        </h1>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-[#ccd6f6] hover:text-[#64ffda]">Home</Link>
          <Link to="/dashboard" className="text-[#ccd6f6] hover:text-[#64ffda]">Dashboard</Link>
          <Link to="/job-tracker" className="text-[#ccd6f6] hover:text-[#64ffda]">Job Tracker</Link>
          
          {/* ✅ Show Login & Signup only if user is NOT logged in */}
          {!user ? (
            <>
              <Link to="/login" className="text-[#ccd6f6] hover:text-[#64ffda]">Login</Link>  
              <Link to="/signup" className="text-[#ccd6f6] hover:text-[#64ffda]">Sign Up</Link>
            </>
          ) : (
            // ✅ Show Logout only if user is logged in
            <button 
              onClick={logout} 
              className="px-6 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition-colors duration-200"
              >
              Logout
            </button>
          )}

          {/* ✅ Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            // className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded transition"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
