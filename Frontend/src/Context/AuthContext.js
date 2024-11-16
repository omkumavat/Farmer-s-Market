import React, { createContext, useState, useContext } from "react";

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
