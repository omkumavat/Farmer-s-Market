import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Import the useAuth hook

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, render the child components; otherwise, redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
