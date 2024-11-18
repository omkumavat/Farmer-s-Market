import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  let parsedAuthUser;

  try {
    parsedAuthUser = initialAuthUser ? JSON.parse(initialAuthUser) : undefined;
  } catch (e) {
    console.error("Error parsing stored user data", e);
    parsedAuthUser = undefined;
  }

  const [authUser, setAuthUser] = useState(parsedAuthUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
