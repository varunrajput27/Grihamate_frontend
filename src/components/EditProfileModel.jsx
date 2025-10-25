import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { User, Phone, Lock, X, Loader2, Mail, Eye, EyeOff } from "lucide-react"; // 💡 Eye and EyeOff icons imported

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditProfileModel = ({ isOpen, onClose }) => {
    const { user, login } = useAuth();
    
    // 💡 State to manage form data
    const [formData, setFormData] = useState({
        fullname: "",
        phone: "",
        email: "",
        password: "", // New Password
        currentPassword: "", // Required for verification
    });

    // 💡 States for password visibility
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const authToken = localStorage.getItem("token");

    // Load user data into form whenever modal opens OR user updates
    useEffect(() => {
        if (isOpen && user) {
            setFormData({
                fullname: user.fullname || "",
                phone: user.phone || "",
                email: user.email || "",
                password: "", 
                currentPassword: "", 
            });
            // 💡 Reset password visibility when modal opens
            setShowNewPassword(false);
            setShowCurrentPassword(false);
        }
    }, [isOpen, user]); 

    // Guard Clause: Render only when open and user data is available
    if (!isOpen || !user) return null;

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userId = user?._id?.$oid || user?._id || user?.id; 
        if (!userId) {
            toast.error("User ID missing — please log in again.");
            setLoading(false);
            return;
        }

        if (!formData.currentPassword) {
            toast.error("Please enter your current password.");
            setLoading(false);
            return;
        }

        try {
            const payload = {
                fullname: formData.fullname,
                phone: formData.phone,
                email: formData.email,
                currentPassword: formData.currentPassword,
            };
            if (formData.password) payload.password = formData.password;

            const res = await axios.put(`${API_BASE_URL}/api/user/update/${userId}`, payload, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            const updatedUser = res.data?.user;

            // Refresh AuthContext and localStorage with new data
            if (updatedUser) {
                const token = localStorage.getItem("token");
                login(token, updatedUser); // This updates the global 'user' state

                // FIX: Update local form state immediately with new data and clear passwords.
                setFormData({
                    fullname: updatedUser.fullname || "",
                    phone: updatedUser.phone || "",
                    email: updatedUser.email || "", 
                    password: "", 
                    currentPassword: "", 
                });
            }

            toast.success("Profile updated successfully! 🎉");
            
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Update failed. Please check your details.");
        } finally {
            setLoading(false);
            
            // Fallback for clearing passwords if API call failed or after success
            if (formData.password || formData.currentPassword) {
                 setFormData((p) => ({ 
                    ...p, 
                    password: "", 
                    currentPassword: "" 
                }));
            }
            // 💡 Reset password visibility after operation
            setShowNewPassword(false);
            setShowCurrentPassword(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
            <Toaster position="top-right" />
            <div className="bg-white w-full max-w-md mx-4 rounded-xl shadow-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5 cursor-pointer" />
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2 text-indigo-600" /> Edit Profile
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">
                    
                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative mt-1">
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                autoComplete="name"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <div className="relative mt-1">
                            <input
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                autoComplete="tel"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative mt-1">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email" 
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* New Password with Show/Hide Toggle */}
                    <div >
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative mt-1">
                            <input
                                // 💡 Dynamic type based on state
                                type={showNewPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your new Password"
                                autoComplete="new-password" 
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            {/* 💡 Toggle button */}
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5 cursor-pointer" /> : <Eye className="w-5 h-5 cursor-pointer" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Current Password with Show/Hide Toggle */}
                    <div className="pt-2 border-t mt-4">
                        <label className="text-sm font-medium text-gray-700">
                            Type Current Password for Confirmation <span className="text-red-500">*</span>
                        </label>
                        <div className="relative mt-1">
                            <input
                                // 💡 Dynamic type based on state
                                type={showCurrentPassword ? "text" : "password"}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Type your current password"
                                autoComplete="new-password" 
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            {/* 💡 Toggle button */}
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600"
                            >
                                {showCurrentPassword ? <EyeOff className="w-5 h-5 cursor-pointer" /> : <Eye className="w-5 h-5 cursor-pointer" />}
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center font-semibold py-2 px-4 rounded-lg transition cursor-pointer ${
                            loading
                                ? "bg-indigo-400 cursor-not-allowed text-white"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5 mr-2" /> Updating...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModel;