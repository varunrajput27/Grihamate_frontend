import React, { useState } from "react";
// import apartmentImg from "../assets/apartment.jpg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Validation: limit phone to 10 digits
    if (id === "phone" && value.length > 10) return;

    // Validation: limit email to 50 characters (adjust as needed)
    if (id === "email" && value.length > 50) return;

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/getintouch`,
        formData
      );

      toast.success(res.data.message, {
        duration: 3000, // 3 seconds
        position: "top-right",
      });

      setFormData({ fullname: "", email: "", phone: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Try again.", {
        duration: 3000, // 3 seconds
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center px-4 py-12 relative">
      {/* React Hot Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white/70 border border-white/40 transition-all duration-300">
        {/* Left Side — Image */}
        <div
          className="relative p-10 flex flex-col justify-start items-start text-white space-y-5 overflow-hidden h-full lg:h-auto"
          style={{
            backgroundImage: "url('/images/apartment.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 mt-10">
            <h2 className="text-3xl lg:text-4xl font-extrabold leading-snug drop-shadow-md">
              Let’s turn your <span className="text-blue-300">ideas</span> into reality...
            </h2>
            <p className="text-gray-200 text-sm max-w-sm drop-shadow-sm">
              Whether you're dreaming big or solving small challenges — our team crafts
              meaningful digital experiences that leave a lasting impression.
            </p>
          </div>
        </div>

        {/* Right Side — Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center bg-white">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h3>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {["fullname", "email", "phone"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  required
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg text-white font-semibold text-sm shadow-md transition-transform duration-200 cursor-pointer ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
