import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await login(email, password); // ✅ Returns UserCredential
      console.log("User logged in:", userCredential.user.email); // ✅ Log user email only
      navigate("/dashboard"); // ✅ Redirect to Dashboard
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mx-auto text-center mt-20">
      <h2 className="text-xl font-bold">Login</h2>
      <form onSubmit={handleLogin} className="mt-6 max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
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
          Login
        </button>
      </form>
      <p className="mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
