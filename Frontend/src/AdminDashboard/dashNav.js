import React, { useEffect, useState } from 'react';
import '../CSS/navbar.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Ensure this context provides authentication state
import Loader from "../Components/Loader";
import GoogleTranslateWidget from "../Pages/GoogleTranslateWidget";

const DashNav = () => {
  const navigate = useNavigate();
  const [isAuthReady, setIsAuthReady] = useState(true);
  const { currentUser, logout } = useAuth();

  if (!isAuthReady) {
    return <Loader />;
  }

  const handleLogout = async () => {
    setIsAuthReady(false); // Show a loading state or disable interactions
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Add a delay of 2 seconds
        await logout();
        // localStorage.removeItem("Users");
        navigate('/login', { replace: true }); // Redirect to login after logout
        window.location.reload(); // Optional: force a page reload
    } catch (error) {
        console.error("Error during logout:", error);
    } finally {
        setIsAuthReady(true); // Restore the ready state
    }
};

  const isAdmin = currentUser?.role === 'admin';

  return (
    <nav className="navbar">
      <div className="logo">
        <a href='/'>
          <img src="/Images/logoweb2.png" alt="AgriHaven Logo" className="logo-image" />
        </a>
      </div>
      <GoogleTranslateWidget />
      {currentUser ? (
      
            <div className="dropdown">
              <div className="profile-dropdown">
                <img 
                  src={currentUser.profilePicture || "/Images/logo.png"} 
                  alt="User Profile" 
                  className="profile-pic" 
                />
                <div className="dropdowncontent">
                  <p className="user-role">Role: {currentUser.role || "User"}</p>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              </div>
            </div>
      ) : (
        <ul>
          <li className="nav-item"><a href="/login">Login</a></li>
        </ul>
      )}
    </nav>
  );
};

export default DashNav;


