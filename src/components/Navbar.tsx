import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-[#0a192f] shadow-md py-4 px-6"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold text-[#ccd6f6] hover:text-[#64ffda] transition"
        >
          Job Tracker
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleToggle}
          className="md:hidden text-2xl text-[#ccd6f6] hover:text-[#64ffda]"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden flex flex-col gap-4 mt-4 px-6"
          >
            <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
            <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLinks = ({
  user,
  logout,
  closeMenu,
}: {
  user: any;
  logout: () => void;
  closeMenu: () => void;
}) => (
  <>
    <Link to="/" onClick={closeMenu} className="text-[#ccd6f6] hover:text-[#64ffda] transition">
      Home
    </Link>
    <Link to="/dashboard" onClick={closeMenu} className="text-[#ccd6f6] hover:text-[#64ffda] transition">
      Dashboard
    </Link>
    <Link to="/job-tracker" onClick={closeMenu} className="text-[#ccd6f6] hover:text-[#64ffda] transition">
      Job Tracker
    </Link>

    {!user ? (
      <>
        <Link to="/login" onClick={closeMenu} className="text-[#ccd6f6] hover:text-[#64ffda] transition">
          Login
        </Link>
        <Link to="/signup" onClick={closeMenu} className="text-[#ccd6f6] hover:text-[#64ffda] transition">
          Sign Up
        </Link>
      </>
    ) : (
      <button
        onClick={() => {
          logout();
          closeMenu();
        }}
        className="px-4 py-1 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition"
      >
        Logout
      </button>
    )}
  </>
);

const ThemeToggle = ({ toggleTheme, theme }: { toggleTheme: () => void; theme: string }) => (
  <button
    onClick={toggleTheme}
    aria-label="Toggle theme"
    className="text-[#ccd6f6] hover:text-[#64ffda] text-xl transition"
  >
    {theme === "light" ? "🌙" : "☀️"}
  </button>
);

export default Navbar;
