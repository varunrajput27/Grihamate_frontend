// // src/context/AuthContext.jsx

// import React, { createContext, useState, useContext } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     // 1. State ko localStorage se load karein, taki refresh par login rahe
//     const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
//     const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null); 

//     // 2. Login function: token aur user data (jismein name, phone, email ho) store karein
//     const login = (token, userData) => {
//         localStorage.setItem('token', token);
//         localStorage.setItem('user', JSON.stringify(userData)); 
//         setIsLoggedIn(true);
//         setUser(userData); 
//     };

//     // 3. Logout function: data clear karein
//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user'); 
//         setIsLoggedIn(false);
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
// src/context/AuthContext.jsx

// src/context/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null); 

    const login = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData)); 
        setIsLoggedIn(true);
        setUser(userData); 
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        setIsLoggedIn(false);
        setUser(null);
        // ❌ navigate() yahan nahi hona chahiye
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
