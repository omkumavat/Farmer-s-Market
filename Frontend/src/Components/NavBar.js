import React from 'react';
import '../CSS/navbar.css'; 
import '../Images/logo.jpg'
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/Images/logo.jpg" alt="l" className="logo-image" />
        <span className="website-name">Verdica</span>
      </div>
      <ul className="nav-links">
      <li className="nav-item"><a href="/about">Home</a></li>
        <li className="nav-item2">
          <div className="dropdown">
            <button className="dropbtn">About</button>
            <div className="dropdown-content">
              <a href="/">Sub Home 1</a>
              <a href="/">Sub Home 2</a>
            </div>
          </div>
        </li>
        {/* <li className="nav-item"><a href="/about">About</a></li> */}
        <li className="nav-item"><a href="/blogs">Blogs</a></li>
        <li className="nav-item"><a href="/services">Services</a></li>
        <li className="nav-item"><a href="/login">Login</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
