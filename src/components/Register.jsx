// // src/Components/Register.jsx
// import React, { useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Toaster, toast } from "react-hot-toast";
// import { AiOutlineHome, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Register = () => {
//   const [form, setForm] = useState({
//     fullname: "",
//     email: "",
//     phone: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Refs for Enter key focus
//   const fullnameRef = useRef();
//   const emailRef = useRef();
//   const phoneRef = useRef();
//   const passwordRef = useRef();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone") {
//       if (/^\d*$/.test(value) && value.length <= 10) {
//         setForm((prev) => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleKeyDown = (e, nextRef) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       nextRef?.current?.focus();
//     }
//   };

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.fullname.trim()) return toast.error("Full Name is required");
//     if (!form.email.trim() || !isValidEmail(form.email)) return toast.error("Enter a valid email");
//     if (!form.phone || form.phone.length !== 10) return toast.error("Phone must be 10 digits");
//     if (!form.password) return toast.error("Password is required");

//     try {
//       setLoading(true);
//       const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/register`, form);

//       toast.success(response.data.message || "Registered successfully!", { duration: 2000 });
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong", { duration: 3000 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 relative">
//       <Toaster position="top-right" />

//       {/* Home Button */}
//       <button
//         onClick={() => navigate("/")}
//         className="fixed top-4 left-4 bg-white shadow-lg flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 transition cursor-pointer z-50"
//       >
//         <AiOutlineHome className="text-[#3d5a80]" size={20} />
//         <span className="text-[#3d5a80] font-medium">Home</span>
//       </button>

//       <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
//         <h2 className="text-3xl font-bold mb-6 text-center text-[#3d5a80]">Create Account</h2>

//         <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
//           {/* Full Name */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="fullname"
//               value={form.fullname}
//               ref={fullnameRef}
//               onChange={handleChange}
//               onKeyDown={(e) => handleKeyDown(e, emailRef)}
//               placeholder="Enter your full name"
//               autoComplete="off"
//               className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#3d5a80]"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               ref={emailRef}
//               onChange={handleChange}
//               onKeyDown={(e) => handleKeyDown(e, phoneRef)}
//               placeholder="Enter your email"
//               autoComplete="off"
//               className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#3d5a80]"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
//             <input
//               type="text"
//               name="phone"
//               value={form.phone}
//               ref={phoneRef}
//               onChange={handleChange}
//               onKeyDown={(e) => handleKeyDown(e, passwordRef)}
//               placeholder="Enter 10-digit phone number"
//               maxLength={10}
//               autoComplete="off"
//               className="w-full border border-gray-300 rounded px-3 py-3 focus:outline-none focus:ring-2 focus:ring-[#3d5a80]"
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block mb-1 font-medium text-gray-700">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={form.password}
//               ref={passwordRef}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               autoComplete="new-password"
//               className="w-full border border-gray-300 rounded px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#3d5a80]"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
//             >
//               {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full bg-[#3d5a80] text-white py-3 rounded-xl hover:bg-[#2c4460] transition cursor-pointer font-medium text-lg ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <div className="mt-6 text-center text-gray-600 font-medium">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-[#3d5a80] hover:underline cursor-pointer font-semibold"
//           >
//             Login here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineHome, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const nameRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val) && val.length <= 10) setPhone(val);
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") { e.preventDefault(); nextRef?.current?.focus(); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Full Name is required");
    if (phone.length !== 10) return toast.error("Phone must be 10 digits");
    if (!password.trim()) return toast.error("Password is required");

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/register`, {
        name, phone, password
      });
      toast.success(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-6 relative">
      <Toaster position="top-right" />

      {/* Home button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 bg-white shadow-md flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 z-50"
      >
        <AiOutlineHome className="text-[#3d5a80]" size={20} />
        <span className="text-[#3d5a80] font-semibold hidden sm:inline">Home</span>
      </button>

      {/* Register Card */}
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#3d5a80]">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          {/* Full Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              ref={nameRef}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, phoneRef)}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#3d5a80]"
              autoComplete="off"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              ref={phoneRef}
              onChange={handlePhoneChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
              placeholder="Enter 10-digit phone number"
              maxLength={10}
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:ring-2 focus:ring-[#3d5a80]"
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-700 text-sm sm:text-base">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              ref={passwordRef}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 sm:px-4 py-2 sm:py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#3d5a80]"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#3d5a80] text-white py-2 sm:py-3 rounded-xl hover:bg-[#2c4460] transition cursor-pointer font-medium text-base sm:text-lg ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm sm:text-base">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="text-[#3d5a80] font-semibold hover:underline cursor-pointer"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
