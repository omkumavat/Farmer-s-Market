import React from 'react';
import '../CSS/navbar.css';
import '../Images/logo.jpg';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Images/logo.jpg" alt="logo" className="logo-image" />
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
              <div className="style-line"></div>
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
              <a href="/team">Farm Produce</a>
              <div className="style-line"></div>
              <a href="/dealer">Agricultural Products</a>
              <div className="style-line"></div>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="dropbtn">Login</button>
            <div className="dropdown-content">
              <a href="/login">As Farmer</a>
              <div className="style-line"></div>
              <a href="/login">As Dealer</a>
              <div className="style-line"></div>
              <a href="/login">As User</a>
              <div className="style-line"></div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
