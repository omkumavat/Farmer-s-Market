import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Check if 'Users' exists in localStorage before attempting to parse it
  const initialUser = (() => {
    const storedUser = localStorage.getItem("Users");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);  // Only parse if storedUser is not null or undefined
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        return null;
      }
    }
    return null;
  })();

  const [currentUser, setCurrentUser] = useState(initialUser);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("Users", JSON.stringify(user));  // Save user to localStorage
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("Users");  // Remove user data from localStorage
  };

  const updateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("Users", JSON.stringify(updatedUser));
  };

  const value = {
    updateProfile,
    currentUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
