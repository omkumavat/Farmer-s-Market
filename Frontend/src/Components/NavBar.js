import React from 'react';
import '../CSS/navbar.css';
import '../Images/logo.jpg';
import { useSelector,useDispatch,useNavigate } from 'react-redux';
import { useAuth } from "../Context/AuthContext";
import { logoutStart, logoutSuccess } from "../Context/UserSlice";
import { useEffect } from 'react';
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
const NavBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authUser] = useAuth();
  const handleLogout = () => {
    try {
      // Dispatch the logout action to clear the currentUser state in Redux
      dispatch(logoutStart());

      // Remove user information from localStorage
      // localStorage.removeItem("Users");
      dispatch(logoutSuccess());
      localStorage.removeItem("Users");
      // Navigate to the projects page or any other page
      navigate('/', { replace: true });

      // Optionally reload the page to reset the application state
      window.location.reload();

      // Optionally, display a toast notification for success (if you're using a toast library)
      // toast.success("Logout Successfully");
    } catch (error) {
      // Handle errors if any occur during the logout process
      console.error("Error during logout: ", error);

      // Optionally, display a toast notification for error
      // toast.error("Error: " + error);
    }
  };

  useEffect(() => {
    console.log(authUser)
  }, [])

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
              <a href="/about">Market Insights</a>
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
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.Name}</span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item> Profile </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Signout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button gradientDuoTone="purpleToBlue" outline onClick={(() => { navigate('/Login') })}>
            SignIn
          </Button>
        )}
        {/* <li className="nav-item"><a href="/login">Login</a></li> */}
      </ul>
    </nav>
  );
};

export default NavBar;
