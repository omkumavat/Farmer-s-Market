import React, { useState } from "react";
import "../CSS/signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for handling errors
  const [isAuthReady, setisAuthReady] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Destructure login function from context

  if (isAuthReady) {
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    setisAuthReady(true);
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      toast.error("All fields are required!"); // Error toast
      setisAuthReady(false);
      return;
    }

    try {
      const res = await axios.post("https://farmer-dealer-user.vercel.app/server/login", {
        email,
        password,
      });

      const data = res.data;

      if (data.success === false) {
        setError(data.message);
        toast.error(data.message); // Error toast from backend
        setisAuthReady(false);
        return;
      }

      // Login is successful
      login(data.user);
      localStorage.setItem("Users", JSON.stringify(data.user));
      toast.success("Login successful !"); 
      if (data.user.role === "admin") {
        navigate("/dash");
      } else {
        navigate("/");
        // toast.success("Login successful !"); 
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      toast.error("Login failed. Please try again."); // General error toast
    }

    setisAuthReady(false);
    toast.success("Login successful!"); 
  };

  return (
    <>
      <NavBar />
      <ToastContainer/>
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

      {/* Toast Container */}
      <ToastContainer autoClose={90000} /> {/* 10 seconds */}

    </>
  );
};

export default Login;
