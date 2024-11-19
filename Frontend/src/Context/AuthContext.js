// import { createContext, useContext, useState } from 'react';

// // Create Auth Context
// const AuthContext = createContext();

// // Provide Auth Context
// export const AuthProvider = ({ children }) => {
//   const [authUser, setAuthUser] = useState(null); // `null` means no user is logged in

//   const login = (user) => {
//     setAuthUser(user); // Save user data (e.g., username or token)
//     localStorage.setItem('authUser', JSON.stringify(user)); // Persist login state
//   };

//   const logout = () => {
//     setAuthUser(null); // Clear user data
//     localStorage.removeItem('authUser'); // Clear login state
//   };

//   return (
//     <AuthContext.Provider value={{ authUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Use Auth Context
// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Users"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("Users", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("Users");
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
