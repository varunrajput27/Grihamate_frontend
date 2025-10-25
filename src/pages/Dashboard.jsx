// import React, { useState, useEffect } from 'react';
// import PropertyCard from '../components/Propertycard';
// import { User, Settings, Edit, Loader2, Home, Receipt, Trash2, X } from 'lucide-react'; 
// import { useAuth } from '../context/AuthContext';
// import axios from 'axios';
// import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
// import EditProfileModel from '../components/EditProfileModel';
// import { toast, Toaster } from 'react-hot-toast'; 

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // ---------------- DeleteConfirmationModal ----------------
// const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
//             <div className="bg-white w-full max-w-sm mx-4 rounded-xl shadow-lg p-6 relative">
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                     disabled={isDeleting}
//                 >
//                     <X className="w-5 h-5 cursor-pointer" />
//                 </button>

//                 <div className="text-center">
//                     <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
//                     <h3 className="text-xl font-bold text-gray-800 mb-2">Are you absolutely sure?</h3>
//                     <p className="text-sm text-gray-600 mb-6">
//                         This action <strong>cannot be undone</strong>. All your profile data, listings, and applications will be permanently deleted.
//                     </p>
                    
//                     <div className="flex justify-around space-x-4">
//                         <button
//                             onClick={onClose}
//                             className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
//                             disabled={isDeleting}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             onClick={onConfirm}
//                             className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer flex justify-center items-center"
//                             disabled={isDeleting}
//                         >
//                             {isDeleting ? <Loader2 className="animate-spin w-5 h-5 mr-2"/> : null}
//                             Yes, Delete My Account
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ---------------- DashboardHeader ----------------
// const DashboardHeader = ({ onEditClick, onDeleteClick }) => {
//     const { user } = useAuth();
//     const userName = user?.fullname || "John Doe"; 
//     const userEmail = user?.email || "john.doe@example.com";

//     return (
//         <header className="bg-gray-800 text-white p-4 sm:p-6 shadow-md">
//             <div className="max-w-7xl mx-auto flex justify-between items-center">
//                 <div className="flex items-center space-x-3">
//                     <div className="bg-indigo-500 p-2 rounded-full">
//                         <User className="w-6 h-6" />
//                     </div>
//                     <div>
//                         <h1 className="text-xl font-bold">Hello, {userName}</h1>
//                         <p className="text-sm text-gray-400">{userEmail}</p>
//                     </div>
//                 </div>

//                 <div className="flex items-center space-x-4">
//                     <Settings className="w-6 h-6 hidden sm:block" />
                    
//                     <button
//                         onClick={onEditClick}
//                         className="flex items-center bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-150 text-sm cursor-pointer"
//                     >
//                         <Edit className="w-4 h-4 mr-2" />
//                         Edit Profile
//                     </button>
                    
//                     <button
//                         onClick={onDeleteClick} 
//                         className="p-2 rounded-lg text-white hover:text-red-500 transition duration-150 cursor-pointer"
//                         title="Delete Account"
//                     >
//                         <Trash2 className="w-6 h-6" />
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// };

// // ---------------- BookingItem ----------------
// const BookingItem = ({ booking }) => {
//     const basicDetails = booking.basicDetails || {};
//     const location = booking.location || {};

//     const title = basicDetails.title || `Property ID: ${booking.propertyId || booking._id}`;
//     const fullAddress = location.fullAddress || "Unknown address";
//     const city = location.city || "Unknown city";

//     const createdAt = new Date(booking.createdAt || Date.now());
//     const date = createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
//     const time = createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

//     const type = booking.propertyDetails?.listingType || booking.listingType || 'N/A';

//     return (
//         <div className="bg-[#f3f3f3] rounded-lg p-4 flex justify-between items-start sm:items-center mb-4 flex-col sm:flex-row">
//             <div className="flex flex-col gap-2">
//                 <h3 className="text-[16px] font-semibold text-gray-900">{title}</h3>

//                 <div className="flex items-center text-sm text-gray-700 gap-1">
//                     <FaMapMarkerAlt className="text-gray-500" />
//                     <span>{fullAddress}, {city}</span>
//                 </div>

//                 <div className="flex items-center gap-4 text-sm text-gray-700">
//                     <div className="flex items-center gap-1">
//                         <FaCalendarAlt className="text-gray-500" />
//                         <span>{date}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                         <FaClock className="text-gray-500" />
//                         <span>{time}</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-2 sm:mt-0">
//                 <span className="bg-[#ff7043] text-white text-xs px-3 py-1 rounded-full font-semibold">
//                     Applied ({type})
//                 </span>
//             </div>
//         </div>
//     );
// };

// // ---------------- DashboardPage ----------------
// const DashboardPage = () => {
//     const [activeTab, setActiveTab] = useState('rent');
//     const [isEditOpen, setIsEditOpen] = useState(false);
//     const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); 
//     const [isDeleting, setIsDeleting] = useState(false); 

//     const [myRentProperties, setMyRentProperties] = useState([]);
//     const [isRentLoading, setIsRentLoading] = useState(true);
//     const [rentError, setRentError] = useState(null);

//     const [mySaleProperties, setMySaleProperties] = useState([]); 
//     const [isSaleLoading, setIsSaleLoading] = useState(true);
//     const [saleError, setSaleError] = useState(null);

//     const [myBookings, setMyBookings] = useState([]); 
//     const [isBookingLoading, setIsBookingLoading] = useState(true);
//     const [bookingError, setBookingError] = useState(null);
    
//     const { user, isLoadingAuth, logout } = useAuth(); 
//     const authToken = localStorage.getItem('token');

//     // --- Fetch Rent & Sale Properties ---
//     useEffect(() => {
//         const fetchData = async () => {
//             if (!authToken) return;

//             try {
//                 const rentRes = await axios.get(`${API_BASE_URL}/api/rent/getuserrent`, {
//                     headers: { Authorization: `Bearer ${authToken}` },
//                 });
//                 const saleRes = await axios.get(`${API_BASE_URL}/api/sale/getusersale`, {
//                     headers: { Authorization: `Bearer ${authToken}` },
//                 });
//                 setMyRentProperties(rentRes.data.properties || []);
//                 setMySaleProperties(saleRes.data.properties || []);
//             } catch (err) {
//                 console.error("Fetch error:", err);
//                 setRentError("Failed to fetch rent properties.");
//                 setSaleError("Failed to fetch sale properties.");
//             } finally {
//                 setIsRentLoading(false);
//                 setIsSaleLoading(false);
//             }
//         };
//         fetchData();
//     }, [authToken]);

//     // --- Fetch Bookings & Map Property Details ---
//     useEffect(() => {
//         const fetchBookings = async () => {
//             if (!authToken) return;
//             setIsBookingLoading(true);
//             try {
//                 const propRes = await axios.get(`${API_BASE_URL}/api/user/rentandsale`, {
//                     headers: { Authorization: `Bearer ${authToken}` },
//                 });
//                 const bookRes = await axios.get(`${API_BASE_URL}/api/user/booking`, {
//                     headers: { Authorization: `Bearer ${authToken}` },
//                 });
                
//                 const allProperties = propRes.data.properties || [];
//                 const propMap = new Map(allProperties.map(p => {
//                     const propertyId = p._id?.$oid || p._id?.toString(); 
//                     return [propertyId, p];
//                 }));

//                 const combined = bookRes.data.bookings.map(b => {
//                     const bookingPropertyId = b.propertyId?.$oid || b.propertyId?.toString();
//                     return {
//                         ...b,
//                         propertyDetails: propMap.get(bookingPropertyId) || null,
//                     };
//                 });

//                 setMyBookings(combined);
//             } catch (err) {
//                 console.error("Booking Fetch Error:", err);
//                 setBookingError("Failed to fetch applications.");
//             } finally {
//                 setIsBookingLoading(false);
//             }
//         };
//         fetchBookings();
//     }, [authToken]);

//     // --- Delete Account ---
//     const handleDeleteAccount = async () => {
//         setIsDeleting(true);
//         const userId = user?._id?.$oid || user?._id || user?.id; 

//         if (!userId) {
//             toast.error("User ID missing. Cannot proceed.");
//             setIsDeleting(false);
//             setIsDeleteConfirmOpen(false);
//             return;
//         }

//         try {
//             await axios.delete(`${API_BASE_URL}/api/user/delete/${userId}`, {
//                 headers: { Authorization: `Bearer ${authToken}` },
//             });

//             toast.success("Account deleted successfully. We're sad to see you go! 👋");
            
//             setTimeout(() => {
//                 logout(); 
//             }, 1500);

//         } catch (err) {
//             console.error("Delete error:", err);
//             toast.error(err.response?.data?.message || "Failed to delete account. Please try again.");
//         } finally {
//             setIsDeleting(false);
//             setIsDeleteConfirmOpen(false);
//         }
//     };

//     const renderList = (props, loading, error, label) => {
//         if (loading) return <div className="text-center py-6"><Loader2 className="animate-spin inline mr-2 text-indigo-600" /> Loading {label}...</div>;
//         if (error) return <div className="text-center text-red-500">{error}</div>;
//         if (props.length === 0) return <div className="text-center text-gray-500 py-8">No {label} yet.</div>;
//         return (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {props.map(p => <PropertyCard key={p._id?.$oid || p._id} property={p} />)}
//             </div>
//         );
//     };

//     if (isLoadingAuth || isDeleting) 
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//                 <Loader2 className="animate-spin w-8 h-8 text-indigo-600" /> 
//                 <p className="mt-4 text-gray-700">{isDeleting ? "Deleting Account..." : "Loading user..."}</p>
//             </div>
//         );

//     if (!user)
//         return <div className="text-center mt-20 text-red-500 text-lg">Please login to view your dashboard.</div>;

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Toaster position="top-right" />
            
//             <DashboardHeader 
//                 onEditClick={() => setIsEditOpen(true)}
//                 onDeleteClick={() => setIsDeleteConfirmOpen(true)}
//             />

//             <main className="max-w-7xl mx-auto p-6">
//                 <div className="flex border-b border-gray-300 mb-6 space-x-2" role="tablist">
//                     <button 
//                         onClick={() => setActiveTab('rent')} 
//                         className={`py-3 px-6 font-semibold cursor-pointer ${activeTab === 'rent' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
//                         role="tab"
//                         aria-selected={activeTab === 'rent'}
//                     >
//                         <Home className="w-4 h-4 inline mr-2" /> My Rent Properties
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('sale')} 
//                         className={`py-3 px-6 font-semibold cursor-pointer ${activeTab === 'sale' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
//                         role="tab"
//                         aria-selected={activeTab === 'sale'}
//                     >
//                         <Home className="w-4 h-4 inline mr-2" /> My Sale Properties
//                     </button>
//                     <button 
//                         onClick={() => setActiveTab('bookings')} 
//                         className={`py-3 px-6 font-semibold cursor-pointer ${activeTab === 'bookings' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
//                         role="tab"
//                         aria-selected={activeTab === 'bookings'}
//                     >
//                         <Receipt className="w-4 h-4 inline mr-2" /> Applications
//                     </button>
//                 </div>

//                 <div className="bg-white p-6 rounded-xl shadow-md">
//                     {activeTab === 'rent' && renderList(myRentProperties, isRentLoading, rentError, 'Rent Listings')}
//                     {activeTab === 'sale' && renderList(mySaleProperties, isSaleLoading, saleError, 'Sale Listings')}
//                     {activeTab === 'bookings' && (
//                         isBookingLoading
//                             ? <div className="text-center py-6"><Loader2 className="animate-spin inline mr-2 text-indigo-600" /> Loading applications...</div>
//                             : bookingError
//                                 ? <div className="text-center text-red-500">{bookingError}</div>
//                                 : myBookings.length > 0
//                                     ? myBookings.map(b => <BookingItem key={b._id?.$oid || b._id} booking={b} />)
//                                     : <div className="text-center text-gray-500 py-8">No applications yet.</div>
//                     )}
//                 </div>
//             </main>

//             <EditProfileModel
//                 isOpen={isEditOpen}
//                 onClose={() => setIsEditOpen(false)}
//                 user={user} 
//             />
            
//             <DeleteConfirmationModal
//                 isOpen={isDeleteConfirmOpen}
//                 onClose={() => setIsDeleteConfirmOpen(false)}
//                 onConfirm={handleDeleteAccount}
//                 isDeleting={isDeleting} 
//             />
//         </div>
//     );
// };

// export default DashboardPage;

import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/Propertycard';
import { User, Settings, Edit, Loader2, Home, Receipt, Trash2, X } from 'lucide-react'; 
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import EditProfileModel from '../components/EditProfileModel';
import { toast, Toaster } from 'react-hot-toast'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ---------------- DeleteConfirmationModal ----------------
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, isDeleting }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-sm mx-4 rounded-xl shadow-lg p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    disabled={isDeleting}
                >
                    <X className="w-5 h-5 cursor-pointer" />
                </button>

                <div className="text-center">
                    <Trash2 className="w-10 h-10 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Are you absolutely sure?</h3>
                    <p className="text-sm text-gray-600 mb-6">
                        This action <strong>cannot be undone</strong>. All your profile data, listings, and applications will be permanently deleted.
                    </p>
                    
                    <div className="flex justify-around space-x-4">
                        <button
                            onClick={onClose}
                            className="w-full py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition cursor-pointer flex justify-center items-center"
                            disabled={isDeleting}
                        >
                            {isDeleting ? <Loader2 className="animate-spin w-5 h-5 mr-2"/> : null}
                            Yes, Delete My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ---------------- DashboardHeader ----------------
// const DashboardHeader = ({ onEditClick, onDeleteClick }) => {
//     const { user } = useAuth();
//     const userName = user?.fullname || "John Doe"; 
//     const userEmail = user?.email || "john.doe@example.com";

//     return (
//         <header className="relative bg-gray-800 text-white p-4 sm:p-6 shadow-md">
//             <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
//                 <div className="flex items-center space-x-3">
//                     <div className="bg-indigo-500 p-2 rounded-full">
//                         <User className="w-6 h-6" />
//                     </div>
//                     <div>
//                         <h1 className="text-lg sm:text-xl font-bold">Hello, {userName}</h1>
//                         <p className="text-sm text-gray-400">{userEmail}</p>
//                     </div>
//                 </div>

//                 <div className="flex items-center space-x-3 mt-3 sm:mt-0">
//                     <button
//                         onClick={onEditClick}
//                         className="flex items-center bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-150 text-sm cursor-pointer"
//                     >
//                         <Edit className="w-4 h-4 mr-2" />
//                         Edit Profile
//                     </button>
//                 </div>

//                 {/* Delete icon fixed top-right */}
//                 <button
//                     onClick={onDeleteClick} 
//                     className="absolute top-3 right-3 p-2 rounded-lg text-white hover:text-red-500 transition duration-150 cursor-pointer"
//                     title="Delete Account"
//                 >
//                     <Trash2 className="w-6 h-6" />
//                 </button>
//             </div>
//         </header>
//     );
// };
const DashboardHeader = ({ onEditClick, onDeleteClick }) => {
    const { user } = useAuth();
    const userName = user?.fullname || "John Doe"; 
    const userEmail = user?.email || "john.doe@example.com";

    return (
        <header className="relative bg-gray-800 text-white p-4 sm:p-6 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500 p-2 rounded-full">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-lg sm:text-xl font-bold">Hello, {userName}</h1>
                        <p className="text-sm text-gray-400">{userEmail}</p>
                    </div>
                </div>

               <div className="flex items-center mt-3 sm:mt-0">
    <button
        onClick={onEditClick}
        className="flex items-center bg-yellow-400 text-gray-900 font-semibold py-1 px-3 sm:py-2 sm:px-4 rounded-lg hover:bg-yellow-500 transition duration-150 text-xs sm:text-sm ml-2 sm:ml-0"
    >
        <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Edit Profile
    </button>
</div>


                {/* Delete icon fixed top-right */}
                <button
                    onClick={onDeleteClick} 
                    className="absolute top-3 right-3 p-2 rounded-lg text-white hover:text-red-500 transition duration-150 cursor-pointer"
                    title="Delete Account"
                >
                    <Trash2 className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
};


// ---------------- BookingItem ----------------
const BookingItem = ({ booking }) => {
    const basicDetails = booking.basicDetails || {};
    const location = booking.location || {};

    const title = basicDetails.title || `Property ID: ${booking.propertyId || booking._id}`;
    const fullAddress = location.fullAddress || "Unknown address";
    const city = location.city || "Unknown city";

    const createdAt = new Date(booking.createdAt || Date.now());
    const date = createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const time = createdAt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    const type = booking.propertyDetails?.listingType || booking.listingType || 'N/A';

    return (
        <div className="bg-[#f3f3f3] rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex flex-col gap-2 w-full sm:w-auto">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">{title}</h3>

                <div className="flex items-center text-sm text-gray-700 gap-1 flex-wrap">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <span>{fullAddress}, {city}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-700 flex-wrap">
                    <div className="flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaClock className="text-gray-500" />
                        <span>{time}</span>
                    </div>
                </div>
            </div>

            <div className="mt-3 sm:mt-0">
                <span className="bg-[#ff7043] text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Applied ({type})
                </span>
            </div>
        </div>
    );
};

// ---------------- DashboardPage ----------------
const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('rent');
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); 
    const [isDeleting, setIsDeleting] = useState(false); 

    const [myRentProperties, setMyRentProperties] = useState([]);
    const [isRentLoading, setIsRentLoading] = useState(true);
    const [rentError, setRentError] = useState(null);

    const [mySaleProperties, setMySaleProperties] = useState([]); 
    const [isSaleLoading, setIsSaleLoading] = useState(true);
    const [saleError, setSaleError] = useState(null);

    const [myBookings, setMyBookings] = useState([]); 
    const [isBookingLoading, setIsBookingLoading] = useState(true);
    const [bookingError, setBookingError] = useState(null);
    
    const { user, isLoadingAuth, logout } = useAuth(); 
    const authToken = localStorage.getItem('token');

    // --- Fetch Rent & Sale Properties ---
    useEffect(() => {
        const fetchData = async () => {
            if (!authToken) return;

            try {
                const rentRes = await axios.get(`${API_BASE_URL}/api/rent/getuserrent`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                const saleRes = await axios.get(`${API_BASE_URL}/api/sale/getusersale`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setMyRentProperties(rentRes.data.properties || []);
                setMySaleProperties(saleRes.data.properties || []);
            } catch (err) {
                console.error("Fetch error:", err);
                setRentError("Failed to fetch rent properties.");
                setSaleError("Failed to fetch sale properties.");
            } finally {
                setIsRentLoading(false);
                setIsSaleLoading(false);
            }
        };
        fetchData();
    }, [authToken]);
 useEffect(() => {
        const fetchBookings = async () => {
            if (!authToken) return;
            setIsBookingLoading(true);
            try {
                const propRes = await axios.get(`${API_BASE_URL}/api/user/rentandsale`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                const bookRes = await axios.get(`${API_BASE_URL}/api/user/booking`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                
                const allProperties = propRes.data.properties || [];
                const propMap = new Map(allProperties.map(p => {
                    const propertyId = p._id?.$oid || p._id?.toString(); 
                    return [propertyId, p];
                }));

                const combined = bookRes.data.bookings.map(b => {
                    const bookingPropertyId = b.propertyId?.$oid || b.propertyId?.toString();
                    return {
                        ...b,
                        propertyDetails: propMap.get(bookingPropertyId) || null,
                    };
                });

                setMyBookings(combined);
            } catch (err) {
                console.error("Booking Fetch Error:", err);
                setBookingError("Failed to fetch applications.");
            } finally {
                setIsBookingLoading(false);
            }
        };
        fetchBookings();
    }, [authToken]);


    // --- Delete Account ---
    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        const userId = user?._id?.$oid || user?._id || user?.id; 

        if (!userId) {
            toast.error("User ID missing. Cannot proceed.");
            setIsDeleting(false);
            setIsDeleteConfirmOpen(false);
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/api/user/delete/${userId}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            toast.success("Account deleted successfully. We're sad to see you go! 👋");
            
            setTimeout(() => {
                logout(); 
            }, 1500);

        } catch (err) {
            console.error("Delete error:", err);
            toast.error(err.response?.data?.message || "Failed to delete account. Please try again.");
        } finally {
            setIsDeleting(false);
            setIsDeleteConfirmOpen(false);
        }
    };

    const renderList = (props, loading, error, label) => {
        if (loading) return <div className="text-center py-6"><Loader2 className="animate-spin inline mr-2 text-indigo-600" /> Loading {label}...</div>;
        if (error) return <div className="text-center text-red-500">{error}</div>;
        if (props.length === 0) return <div className="text-center text-gray-500 py-8">No {label} yet.</div>;
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {props.map(p => <PropertyCard key={p._id?.$oid || p._id} property={p} />)}
            </div>
        );
    };

    if (isLoadingAuth || isDeleting) 
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="animate-spin w-8 h-8 text-indigo-600" /> 
                <p className="mt-4 text-gray-700">{isDeleting ? "Deleting Account..." : "Loading user..."}</p>
            </div>
        );

    if (!user)
        return <div className="text-center mt-20 text-red-500 text-lg">Please login to view your dashboard.</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            
            <DashboardHeader 
                onEditClick={() => setIsEditOpen(true)}
                onDeleteClick={() => setIsDeleteConfirmOpen(true)}
            />

            <main className="max-w-7xl mx-auto p-4 sm:p-6">
                <div className="flex border-b border-gray-300 mb-6 space-x-2 overflow-x-auto no-scrollbar">
                    <button 
                        onClick={() => setActiveTab('rent')} 
                        className={`py-3 px-4 sm:px-6 font-semibold cursor-pointer ${activeTab === 'rent' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                    >
                        <Home className="w-4 h-4 inline mr-2" />Rent
                    </button>
                    <button 
                        onClick={() => setActiveTab('sale')} 
                        className={`py-3 px-4 sm:px-6 font-semibold cursor-pointer ${activeTab === 'sale' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                    >
                        <Home className="w-4 h-4 inline mr-2" />Sale
                    </button>
                    <button 
                        onClick={() => setActiveTab('bookings')} 
                        className={`py-3 px-4 sm:px-6 font-semibold cursor-pointer ${activeTab === 'bookings' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
                    >
                        <Receipt className="w-4 h-4 inline mr-2" />Applications
                    </button>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
                    {activeTab === 'rent' && renderList(myRentProperties, isRentLoading, rentError, 'Rent Listings')}
                    {activeTab === 'sale' && renderList(mySaleProperties, isSaleLoading, saleError, 'Sale Listings')}
                    {activeTab === 'bookings' && (
                        isBookingLoading
                            ? <div className="text-center py-6"><Loader2 className="animate-spin inline mr-2 text-indigo-600" /> Loading applications...</div>
                            : bookingError
                                ? <div className="text-center text-red-500">{bookingError}</div>
                                : myBookings.length > 0
                                    ? myBookings.map(b => <BookingItem key={b._id?.$oid || b._id} booking={b} />)
                                    : <div className="text-center text-gray-500 py-8">No applications yet.</div>
                    )}
                </div>
            </main>

            <EditProfileModel
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                user={user} 
            />
            
            <DeleteConfirmationModal
                isOpen={isDeleteConfirmOpen}
                onClose={() => setIsDeleteConfirmOpen(false)}
                onConfirm={handleDeleteAccount}
                isDeleting={isDeleting} 
            />
        </div>
    );
};

export default DashboardPage;



