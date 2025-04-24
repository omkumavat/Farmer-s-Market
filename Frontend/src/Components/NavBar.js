import React, { useEffect } from 'react';
import '../CSS/navbar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Ensure this context provides authentication state
import Loader from './Loader';
import GoogleTranslateWidget from "../Pages/GoogleTranslateWidget";

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuthReady, setIsAuthReady] = useState(true);
  const { currentUser, logout } = useAuth();

  if (!isAuthReady) {
    return <Loader />;
  }

  const handleLogout = async () => {
    setIsAuthReady(false);
    try {
      await logout();
      localStorage.removeItem("Users");
      navigate('/', { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
    setIsAuthReady(true);
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
            <div className="dropdowncontent">
              <a href="/about">About Us</a>
              <div className="style-line"></div>
              <a href="/contact">Contact Us</a>
              {/* <div className="style-line"></div>
              <a href="/team">Our Team</a> */}
              <div className="style-line"></div>
              <a href="/ticket">FAQs & Query</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Solutions</button>
            <div className="dropdowncontents">
              <a href="/land-preservation">Land Preservation</a>
              <div className="style-line"></div>
              <a href="/water-Management">Water Management</a>
              <div className="style-line"></div>
              <a href="/equipment-installation">Equipment Installation</a>
              <div className="style-line"></div>
              <a href="/farm-inspection">Farm Inspection</a>
              <div className="style-line"></div>
              <a href="/soil-analysis">Soil Analysis</a>
              <div className="style-line"></div>
              <a href="/farm-plans">Farm Plans</a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Our Services</button>
            <div className="dropdowncont">
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
          <>
            <li className="nav-item">
              <div className="dropdown">
                <div className="profile-dropdown">
                  <img 
                    src={currentUser.profilePicture || "/Images/logo.png"} 
                    alt="User Profile" 
                    className="profile-pic" 
                  />
                  <div className="dropdowncontent">
                    <p className="user-role">Role: {currentUser.role || "User"}</p>
                    <div className='editpp'>
                    <a href="/dashboard" className='editp'>Edit Profile</a>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                  </div>
                </div>
              </div>
            </li>
          </>
        ) : (
          <li className="nav-item"><a href="/login">Login</a></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
