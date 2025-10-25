// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaUser, FaPlus, FaSignOutAlt, FaUserCircle, FaTachometerAlt } from 'react-icons/fa'; 
// // import logo from "../assets/logo.png";
// import { useAuth } from '../context/AuthContext'; // Auth Context import kiya

// // ===========================================
// // 1. User Dropdown Component
// // ===========================================
// // isko 'user' aur 'onProfileClick' props chahiye
// const UserDropdown = ({ onLogout, closeDropdown, user, onProfileClick }) => (
//     <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
//         <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            
//             {/* ✅ User ka naam display karein (user.name AuthContext से आ रहा है) */}
//             <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100 font-bold truncate">
//                 {user ? user.fullname : 'User Profile'} 
//             </div>

//             {/* ✅ Profile Button (Modal opener) */}
//             <button 
//                 onClick={() => {
//                     closeDropdown();
//                     onProfileClick(); // <-- Layout से आया हुआ Modal opener function call karein
//                 }}
//                 className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" 
//                 role="menuitem"
//             >
//                 <FaUserCircle className="mr-3 h-4 w-4 text-indigo-600" />
//                 Profile
//             </button>
            
//             {/* Dashboard Link */}
//             <Link 
//                 to="/dashboard" 
//                 className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" 
//                 role="menuitem"
//                 onClick={closeDropdown} 
//             >
//                 <FaTachometerAlt className="mr-3 h-4 w-4 text-indigo-600" />
//                 Dashboard
//             </Link>
            
//             {/* Logout Button */}
//             <button 
//                 onClick={onLogout} 
//                 className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer" 
//                 role="menuitem"
//             >
//                 <FaSignOutAlt className="mr-3 h-4 w-4" />
//                 Logout
//             </button>
//         </div>
//     </div>
// );

// // -------------------------------------------
// // 2. Navbar Component
// // -------------------------------------------
// // openProfileModal prop को Layout से receive karein
// const Navbar = ({ onListPropertyClick, openProfileModal }) => { 
//     const location = useLocation(); 
    
//     // Auth Context से state और functions लिया
//     const { isLoggedIn, logout, user } = useAuth(); 
    
//     // Dropdown visibility के लिए local state
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const handleLogout = () => {
//         logout(); 
//         setIsDropdownOpen(false);
//     };

//     const navItems = [
//         { name: 'Home', path: '/' },
//         { name: 'Rent', path: '/rent' },
//         { name: 'Buy', 'path': '/buy' },
//         { name: 'About us', path: '/about' },
//         { name: 'Contact us', path: '/contact' },
//     ];

//     return (
//         <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                
//                 {/* Logo Section */}
//                 <div className="flex-shrink-0 flex items-center">
//                     <Link to="/" className="flex items-center">
//                         <img
//                             src="/images/logo.jfif"
//                             alt="Grihamate Logo"
//                             className="w-10 h-10 mr-2 object-contain"
//                         />
//                         <span className="text-xl font-semibold text-[#3d5a80]">Grihamate</span>
//                     </Link>
//                 </div>
                
//                 {/* Navigation Links Section */}
//                 <div className="hidden lg:flex flex-grow justify-center space-x-8">
//                     {navItems.map((item) => (
//                         <Link
//                             key={item.name}
//                             to={item.path}
//                             className={`text-md font-medium px-1 py-1 transition duration-150 ease-in-out
//                                 ${location.pathname === item.path
//                                     ? 'text-[#3d5a80] border-b-2 border-[#3d5a80]'
//                                     : 'text-gray-600 hover:text-[#3d5a80]'
//                                 }`}
//                         >
//                             {item.name}
//                         </Link>
//                     ))}
//                 </div>

//                 {/* --- Login / List Property / User Controls --- */}
//                 <div className="flex items-center space-x-3">
                    
//                     {/* LIST PROPERTY BUTTON */}
//                     <button
//                         onClick={onListPropertyClick} 
//                         className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-800 bg-yellow-300 hover:bg-yellow-500 transition duration-150 ease-in-out cursor-pointer"
//                     >
//                         <FaPlus className="mr-2 h-3 w-3" />
//                         List Property
//                     </button>

//                     {/* CONDITIONAL RENDERING: LOGIN vs USER ICON */}
//                     {isLoggedIn ? (
//                         // Case 1: User is Logged In -> Show User Icon and Dropdown
//                         <div className="relative">
//                             <button
//                                 type="button"
//                                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                                 className="flex items-center justify-center p-3 border border-gray-400 text-gray-800 rounded-full hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm cursor-pointer focus:outline-none"
//                             >
//                                 <FaUser className="h-4 w-4" />
//                             </button>

//                             {/* Render Dropdown */}
//                             {isDropdownOpen && <UserDropdown 
//                                 onLogout={handleLogout} 
//                                 closeDropdown={() => setIsDropdownOpen(false)} 
//                                 user={user} // <-- User data pass hua
//                                 onProfileClick={openProfileModal} // <-- Modal opener pass hua
//                             />}
//                         </div>
//                     ) : (
//                         // Case 2: User is Logged Out -> Show Login Link
//                         <Link
//                             to="/login"
//                             className="flex items-center justify-center px-4 py-2 border border-gray-400 text-sm font-semibold rounded-md text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
//                         >
//                             <FaUser className="mr-2 h-4 w-4" />
//                             Login
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser, FaPlus, FaSignOutAlt, FaUserCircle, FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 

// ===========================================
// 1. User Dropdown Component
// ===========================================
const UserDropdown = ({ onLogout, closeDropdown, user, onProfileClick }) => (
    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            {/* User Name */}
            <div className="px-4 py-2 text-sm text-gray-900 border-b border-gray-100 font-bold truncate">
                {user ? user.fullname : 'User Profile'} 
            </div>

            {/* Profile */}
            <button 
                onClick={() => {
                    closeDropdown();
                    onProfileClick(); 
                }}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" 
                role="menuitem"
            >
                <FaUserCircle className="mr-3 h-4 w-4 text-indigo-600" />
                Profile
            </button>
            
            {/* Dashboard */}
            <Link 
                to="/dashboard" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" 
                role="menuitem"
                onClick={closeDropdown} 
            >
                <FaTachometerAlt className="mr-3 h-4 w-4 text-indigo-600" />
                Dashboard
            </Link>
            
            {/* Logout */}
            <button 
                onClick={onLogout} 
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer" 
                role="menuitem"
            >
                <FaSignOutAlt className="mr-3 h-4 w-4" />
                Logout
            </button>
        </div>
    </div>
);

// ===========================================
// 2. Mobile Menu Component
// ===========================================
const MobileMenu = ({ navItems, location, isLoggedIn, closeMenu, logout }) => {

    const handleLogout = () => {
        logout();
        closeMenu();
    };

    return (
        <div className="px-4 pt-4 pb-3 space-y-1"> 
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMenu}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out
                        ${location.pathname === item.path
                            ? 'text-white bg-[#3d5a80]'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-[#3d5a80]'
                        }`}
                >
                    {item.name}
                </Link>
            ))}

            <hr className="my-2 border-gray-200" />

            {isLoggedIn ? (
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                    <FaSignOutAlt className="mr-3 h-4 w-4" />
                    Logout
                </button>
            ) : (
                <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-[#3d5a80]"
                >
                    <FaUser className="mr-3 h-4 w-4" />
                    Login
                </Link>
            )}
        </div>
    );
};

// ===========================================
// 3. Main Navbar Component
// ===========================================
const Navbar = ({ onListPropertyClick, openProfileModal }) => { 
    const location = useLocation(); 
    const { isLoggedIn, logout, user } = useAuth(); 
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout(); 
        setIsDropdownOpen(false);
        setIsMenuOpen(false); 
    };

    const closeMenu = () => setIsMenuOpen(false);

    // Close dropdown and mobile menu on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            const isHamburgerClick = event.target.closest('#hamburger-button');
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && !isHamburgerClick) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]); 

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Rent', path: '/rent' },
        { name: 'Buy', path: '/buy' },
        { name: 'About us', path: '/about' },
        { name: 'Contact us', path: '/contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <Link to="/" className="flex items-center" onClick={closeMenu}>
                        <img
                            src="/images/logo.jfif" 
                            alt="Grihamate Logo"
                            className="w-10 h-10 mr-2 object-contain"
                        />
                        <span className="text-xl font-semibold text-[#3d5a80]">Grihamate</span>
                    </Link>
                </div>
                
                {/* Desktop Links */}
                <div className="hidden lg:flex flex-grow justify-center space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-md font-medium px-1 py-1 transition duration-150 ease-in-out
                                ${location.pathname === item.path
                                    ? 'text-[#3d5a80] border-b-2 border-[#3d5a80]'
                                    : 'text-gray-600 hover:text-[#3d5a80]'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-3">
                    
                    {/* List Property */}
                    <button
                        onClick={onListPropertyClick} 
                        className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-gray-800 bg-yellow-300 hover:bg-yellow-500 transition duration-150 ease-in-out cursor-pointer"
                    >
                        <FaPlus className="mr-2 h-3 w-3" />
                        <span className="hidden sm:inline">List Property</span>
                        <span className="sm:hidden">Post</span> 
                    </button>

                    {/* Hamburger */}
                    <button
                        id="hamburger-button"
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-gray-800 hover:bg-gray-100 rounded-md focus:outline-none lg:hidden"
                    >
                        {isMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                    </button>

                    {/* User Icon (Desktop Only) */}
                    <div className="hidden lg:flex relative" ref={dropdownRef}> 
                        {isLoggedIn ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center justify-center p-3 border border-gray-400 text-gray-800 rounded-full hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm cursor-pointer focus:outline-none"
                                >
                                    <FaUser className="h-4 w-4" />
                                </button>

                                {isDropdownOpen && <UserDropdown 
                                    onLogout={handleLogout} 
                                    closeDropdown={() => setIsDropdownOpen(false)} 
                                    user={user} 
                                    onProfileClick={openProfileModal} 
                                />}
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center justify-center px-4 py-2 border border-gray-400 text-sm font-semibold rounded-md text-gray-800 hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
                            >
                                <FaUser className="mr-2 h-4 w-4" />
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                ref={menuRef} 
                className={`lg:hidden fixed top-20 right-0 h-[calc(100vh-80px)] w-3/4 sm:w-1/2 bg-white shadow-xl z-40 transform transition-transform duration-500 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} 
            >
                <MobileMenu
                    navItems={navItems}
                    location={location}
                    isLoggedIn={isLoggedIn}
                    closeMenu={closeMenu}
                    logout={logout}
                />
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                 <div 
                   className="lg:hidden fixed inset-0 bg-transparent backdrop-blur-lg z-30 top-20"
                    onClick={() => setIsMenuOpen(false)} 
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
