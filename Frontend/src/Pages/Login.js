import React, { useState } from "react";
import "../CSS/signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import NavBar from '../Components/NavBar'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <><NavBar /><div className="login-container">
          <div className="left-side">
              <div className="text-overlay">
                  <h1>Empowering Farmers, Digitally</h1>
                  <p>"Grow your future, trade with trust, and harvest opportunities all in one place!"</p>
              </div>
          </div>
          <div className="login-form">
              <h2>Welcome Back!</h2>
              <p>Login to your Farmer's Market account</p>
              <form>
                  <input type="email" placeholder="Email" required />
                  <div className="password-field">
                      <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          required />
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
      </div></>
  );
};

export default Login;
