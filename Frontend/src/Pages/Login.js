import React, { useState } from "react";
import "../CSS/signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import NavBar from '../Components/NavBar';
import Footer from "../Components/Footer";
import axios from 'axios';  // Importing axios
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from "../Context/UserSlice";
import { useNavigate } from "react-router-dom";
const Login = ({ isAuthenticated, setIsAuthenticated }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');  // state for email
    const [password, setPassword] = useState('');  // state for password
    const [error, setError] = useState('');  // state for handling errors
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return dispatch(signInFailure('All fields are required!!!'));
        }
        try {
            dispatch(signInStart());
            const res = await axios.post('http://localhost:4000/server/login', {
                email,
                password
            });
            console.log(res);
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }

            if (res.ok) {
                console.log(isAuthenticated)
                setIsAuthenticated(true)
                console.log(isAuthenticated)
                dispatch(signInSuccess(data));
                navigate('/')
            }
            else {
                dispatch(signInFailure(data));
                navigate('/')
            }
        }
        catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <>
            <NavBar />
            <div className="login-container">
                <div className="left-side">
                    <div className="text-overlay">
                        <h1>Empowering Farmers, Digitally</h1>
                        <p>"Grow your future, trade with trust, and harvest opportunities all in one place!"</p>
                    </div>
                </div>
                <div className="login-form">
                    <h2>Welcome Back!</h2>
                    <p>Login to your Farmer's Market account</p>

                    {/* Show error message if there's any */}
                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}  // bind input to email state
                            onChange={(e) => setEmail(e.target.value)}  // update email state
                            required
                        />
                        <div className="password-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}  // bind input to password state
                                onChange={(e) => setPassword(e.target.value)}  // update password state
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
