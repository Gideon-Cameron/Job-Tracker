import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password);
      console.log("User signed up:", userCredential.user.email);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#0a192f] transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-md bg-white dark:bg-[#112240] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-[#ccd6f6] mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-[#0a192f] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-[#0a192f] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#64ffda]"
          />

          <button
            type="submit"
            className="w-full px-4 py-2 border border-[#64ffda] text-[#64ffda] rounded hover:bg-[#64ffda]/10 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-[#8892b0] text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#64ffda] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
