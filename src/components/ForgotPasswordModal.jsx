import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordModal = ({ onClose }) => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/forgotpassword`,
        { email }
      );

      // ✅ Check response and show toast
      if (response.status === 200) {
        toast.success(response.data.message || "Reset link sent to your email", {
          duration: 2000,
        });
        setTimeout(() => {
      navigate("/"); // Home page
    }, 2000);
      } else {
        toast.error(response.data.message || "Failed to send reset link", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset link",
        { duration: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <Toaster position="top-right" />
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center text-[#3d5a80] mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Enter your registered email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3d5a80] cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3d5a80] text-white py-3 rounded hover:bg-[#2c4460] cursor-pointer transition"
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
