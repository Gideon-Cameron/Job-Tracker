import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signup(email, password); // ✅ Returns UserCredential
      console.log("User signed up:", userCredential.user.email); // ✅ Log user email only
      navigate("/dashboard"); // ✅ Redirect to Dashboard
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="container mx-auto text-center mt-20">
      <h2 className="text-xl font-bold">Sign Up</h2>
      <form onSubmit={handleSignup} className="mt-6 max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded dark:bg-gray-700 dark:text-white mt-4"
          required
        />
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded mt-4">
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
