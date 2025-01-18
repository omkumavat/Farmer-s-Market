import React from "react";
import ReactDOM from "react-dom/client"; // Import the ReactDOM client module
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
);
