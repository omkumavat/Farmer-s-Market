import React from 'react';
import '../CSS/navbar.css'; 
import '../Images/logo.jpg';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Images/logo.jpg" alt="l" className="logo-image" />
        <span className="website-name">Verdica</span>
      </div>
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
              <div className="style-line"></div>
            </div>
          </div>
        </li>
        <li className="nav-item"><a href="/blogs">Solutions</a></li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Our Services</button>
            <div className="dropdown-content">
              <a href="/about">Market Insights</a>
              <div className="style-line"></div>
              <a href="/contact">Weather Analysis</a>
              <div className="style-line"></div>
              <a href="/team">Farm Produce</a>
              <div className="style-line"></div>
              <a href="/team">Agricultural Products</a>
              <div className="style-line"></div>
            </div>
          </div>
        </li>
        <li className="nav-item"><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
