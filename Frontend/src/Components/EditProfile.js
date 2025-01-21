import React, { useState, useEffect } from "react";
import PasswordModal from "./PasswordModal"; // Import the modal component
import "../CSS/editprofile.css"; // Import your CSS for EditProfile
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const { currentUser, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthReady, setisAuthReady] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileno: "",
    password: "",
    confirmpassword: "",
    profilePicture: "",
  });
  const [oldPassword, setOldPassword] = useState("");


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://farmer-dealer-user.vercel.app/server/user/getuserbyid/${currentUser._id}`); // Replace with your API endpoint
        const data = response.data;
        // console.log(data);
        setUserData({
          name: data.name || "",
          email: data.email || "",
          mobileno: data.mobileno || "",
          password: "", 
          confirmpassword: "", 
          profilePicture: data.profilePicture || "",
        });
        setisAuthReady(false);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    setUserData({
      ...userData,
      profilePicture: e.target.files[0], // Store the file object
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handlePasswordVerified = async (verifiedPassword) => {
    setisAuthReady(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("mobileno", userData.mobileno);
  
      // Add password if it is updated
      if (userData.password) {
        formData.append("password", userData.password);
      }
  
      if (userData.profilePicture) {
        formData.append("profilePicture", userData.profilePicture);
      }
  
      const response = await axios.put(
        `https://farmer-dealer-user.vercel.app/server/user/updateprofile/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        const loginPassword = userData.password || verifiedPassword; // Use new password if updated, else old password
        await new Promise((resolve) => setTimeout(resolve, 4000));
        await logout();
  
        const res = await axios.post("https://farmer-dealer-user.vercel.app/server/login", {
          email: formData.get("email"),
          password: loginPassword,
        });
  
        const data = res.data;
  
        login(data.user);
        navigate("/dashboard", { replace: true });
        window.location.reload();
      } else {
        alert(`Failed to update profile: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setisAuthReady(false);
      setIsModalOpen(false);
    }
  };
  
  if (isAuthReady) {
    return <Loader />;
  }

  return (
    <div className="edit-profile-container">
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={isAuthReady}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={isAuthReady}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileno">Mobile Number</label>
          <input
            type="text"
            id="mobileno"
            name="mobileno"
            value={userData.mobileno}
            onChange={handleChange}
            disabled={isAuthReady}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            disabled={isAuthReady}
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            value={userData.confirmpassword}
            onChange={handleChange}
            disabled={isAuthReady}
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleProfilePictureChange}
            disabled={isAuthReady}
          />
          {userData.profilePicture && (
            <div className="profile-pic-preview">
              <img
                src={
                  typeof userData.profilePicture === "string"
                    ? userData.profilePicture // Existing image URL
                    : URL.createObjectURL(userData.profilePicture) // New file preview
                }
                alt="Profile Preview"
                width="100"
                height="100"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            </div>
          )}

        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Password Modal */}
      <PasswordModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        userId={currentUser._id}
        setOldPassword={setOldPassword}
        oldPassword={oldPassword}
        onPasswordVerified={handlePasswordVerified}
      />
    </div>
  );
};

export default EditProfile;
