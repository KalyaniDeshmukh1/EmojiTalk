import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // 👈 for navigation


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setMessage("Passwords do not match!");
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
      username,
      email,
      password,
    });

    if (response.status === 201) {
      setMessage("Signup successful! You can now log in.");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  } catch (error) {
    if (error.response?.data) {
      const errors = Object.entries(error.response.data)
        .map(([field, msgs]) => {
          // If msgs is array, join; if string, just return it
          return `${field}: ${Array.isArray(msgs) ? msgs.join(" ") : msgs}`;
        })
        .join(" | ");
      setMessage(errors);
    } else {
      setMessage("Error signing up. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h3 className="text-center p-4 font-bold text-blue-600">
          Create an account to keep your progress saved.
        </h3>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-bold" 
            disabled={loading}
          >
            Sign Up
          </button>
        </form>

        {/* 👇 Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </Link>
        </p>

        <Link to="start-game">
        <p className="text-center text-md p-2 text-blue-600 underline">
          skip signup — start playing now!
        </p>
        </Link>

        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signup;
