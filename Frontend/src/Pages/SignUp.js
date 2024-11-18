import React, { useState } from "react";
import "../CSS/signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import Footer from '../Components/Footer';

const Signup = () => {
  // State hooks for form data and password visibility
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("other");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation (you can add more checks here)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare the data to be sent to the backend
    const userData = {
      name,
      email,
      mobileNumber,
      role,
      password,
    };

    try {
      // Send data to the backend (adjust the URL to your actual backend API)
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      // Check the response from the server
      if (response.ok) {
        alert("Signup successful!");
        // Redirect or handle successful signup (e.g., navigate to login page)
      } else {
        alert(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      alert("Error during signup: " + error.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <div className="left-side">
          <div className="text-overlay">
            <h1>Empowering Farmers, Digitally</h1>
            <p>"Grow your future, trade with trust, and harvest opportunities all in one place!"</p>
          </div>
        </div>
        <div className="signup-form">
          <h2>Join Us!</h2>
          <p>Sign up to start exploring Farmer's Market</p>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Name" 
              required
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              type="email" 
              placeholder="Email" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="number" 
              placeholder="Mobile Number" 
              required
              value={mobileNumber} 
              onChange={(e) => setMobileNumber(e.target.value)} 
            />
            <label htmlFor="role">Choose a role:</label>
            <select 
              name="role" 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="other">Other</option>
              <option value="dealer">Dealer</option>
              <option value="farmer">Farmer</option>
            </select>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-icon"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
