import React, { useEffect } from 'react';
import '../CSS/navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Ensure this context provides authentication state
import Loader from './Loader';
import GoogleTranslateWidget from "../Pages/GoogleTranslateWidget";
const NavBar = () => {

  const navigate = useNavigate();
  const[isAuthReady,setIsAuthReady]=useState(true);
  const { currentUser,logout } = useAuth();

  if (!isAuthReady) {
    return <Loader/>;
  }
  const handleLogout = async () => {
    setIsAuthReady(false);
    try {
      await logout();
      localStorage.removeItem("Users");
      setIsAuthReady(true);
      navigate('/', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Images/logo.jpg" alt="Verdica Logo" className="logo-image" />
        <span className="website-name">Verdica</span>
      </div>
      <GoogleTranslateWidget />
      <ul className="nav-links">
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">About</button>
            <div className="dropdown-content">
              <a href="/about">About Us</a>
              <div className="style-line"></div>
              <a href="/contact">Contact Us</a>
              <div className="style-line"></div>
              <a href="/team">Our Team</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Solutions</button>
            <div className="dropdown-content">
              <a href="/Landpreservation">Land Preservation</a>
              <div className="style-line"></div>
              <a href="/WaterManagement">Water Management</a>
              <div className="style-line"></div>
              <a href="/Equipmentinstallation">Equipment Installation</a>
              <div className="style-line"></div>
              <a href="/Farminspection">Farm Inspection</a>
              <div className="style-line"></div>
              <a href="/Soilanalysis">Soil Analysis</a>
              <div className="style-line"></div>
              <a href="/Farmplans">Farm Plans</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Our Services</button>
            <div className="dropdown-content">
              <a href="/market">Market Insights</a>
              <div className="style-line"></div>
              <a href="/weather">Weather Analysis</a>
              <div className="style-line"></div>
              <a href="/farmer">Farm Produce</a>
              <div className="style-line"></div>
              <a href="/dealer">Agricultural Products</a>
              <div className="style-line"></div>
              <a href="/soil">Soil Information</a>
            </div>
          </div>
        </li>
        {
          currentUser && <li className="nav-item"><a href="/dashboard">Dashboard</a></li>
        }
        {currentUser ? (
          <li className="navitem logout" onClick={handleLogout}>Logout</li>
        ) : (
          <li className="nav-item"><a href="/login">Login</a></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
