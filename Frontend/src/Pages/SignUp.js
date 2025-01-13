import React, { useState } from "react";
import "../CSS/signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import Footer from '../Components/Footer';
import axios from 'axios'; // Import axios
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const navi = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileNumber] = useState("");
  const [role, setRole] = useState("other");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(""); // For storing error messages
  const [isAuthReady, setIsAuthReady] = useState(false);
  if (isAuthReady) {
    return <Loader />;
  }
  const handleSubmit = async (e) => {
    setIsAuthReady(true);
    e.preventDefault();

    // Validation (you can add more checks here)
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name,
      email,
      mobileno,
      role,
      password,
    };

    try {
      const data = {
        subject: "Thank You for Joining with US !!",
        caseType: 1,
        email: userData.email,
        name:userData.name
      }
      const responses = await axios.post("http://localhost:4000/server/sendmail", data);
      const response = await axios.post("http://localhost:4000/server/signup", { userData });

      if (response) {
        toast.success("SignUp Successful");
        localStorage.setItem("Users", JSON.stringify(response.data.users));
        navi('/login');
        window.location.reload();
      } else {
        setError(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      // Handle error
      setError(error.response?.data?.message || "Error during signup. Please try again.");
    }
    setIsAuthReady(false);
  };

  return (
    <>
      <NavBar />
      <ToastContainer/>
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

          {/* Display error message if there's any */}
          {error && <div className="error-message">{error}</div>}

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
              value={mobileno}
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
                value={confirmpassword}
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
