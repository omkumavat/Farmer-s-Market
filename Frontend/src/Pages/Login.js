import React, { useState } from "react";
import "../CSS/signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for handling errors

  const navigate = useNavigate();
  const { login, } = useAuth(); // Destructure login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!"); // Set error if fields are empty
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/server/login", {
        email,
        password,
      });

      const data = res.data;

      if (data.success === false) {
        setError(data.message); // Display error from backend
        return;
      }

      // If login is successful
      console.log(data.user);
      login(data.user); // Update the auth context
      localStorage.setItem("Users", JSON.stringify(data.user)); // Store user in local storage
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      setError("Login failed. Please try again."); // Catch general errors
      console.error(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="left-side">
          <div className="text-overlay">
            <h1>Empowering Farmers, Digitally</h1>
            <p>
              "Grow your future, trade with trust, and harvest opportunities all
              in one place!"
            </p>
          </div>
        </div>
        <div className="login-form">
          <h2>Welcome Back!</h2>
          <p>Login to your Farmer's Market account</p>

          {/* Display error message */}
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit">Login</button>
          </form>

          <div className="social-login">
            <p>Or Login with</p>
            <div className="social-icons">
              <FaGoogle className="icon" />
              <FaFacebook className="icon" />
              <FaTwitter className="icon" />
            </div>
          </div>

          <p className="signup-link">
            Don’t have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
