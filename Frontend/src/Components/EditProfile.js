import React, { useState, useEffect } from "react";
import PasswordModal from "./PasswordModal"; // Import the modal component
import "../CSS/editprofile.css"; // Import your CSS for EditProfile
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import Loader from "./Loader";
const EditProfile = () => {
  const {currentUser}=useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthReady,setisAuthReady]=useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobileno: "",
    password: "",
    confirmpassword: "",
    profilePicture: "",
  });
  const [oldPassword, setOldPassword] = useState(""); // Store old password

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/server/user/getuserbyid/${currentUser._id}`); // Replace with your API endpoint
        const data = response.data;
        console.log(data);
        setUserData({
          name: data.name || "",
          email: data.email || "",
          mobileno: data.mobileno || "",
          password: "", // Don't populate for security
          confirmpassword: "", // Don't populate for security
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

  const handlePasswordVerified = async () => {
    // Perform update after password verification
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("mobileno", userData.mobileno);
      formData.append("password", userData.password);
      if (userData.profilePicture) {
        formData.append("profilePicture", userData.profilePicture);
      }
      console.log(formData.profilePicture);
      const response = await axios.put(
        `http://localhost:4000/server/user/updateprofile/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios sets this automatically, but you can specify explicitly
          },
        }
      );
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to update profile: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }

    setIsModalOpen(false); // Close modal after verification
  };

  if(isAuthReady){
    return <Loader/>;
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleProfilePictureChange}
          />
          {userData.profilePicture && (
            <div className="profile-pic-preview">
              <img
                src={
                  userData.profilePicture !== "string"
                    ? userData.profilePicture
                    : URL.createObjectURL(userData.profilePicture)
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
        oldPassword={oldPassword} // Pass old password to modal
        onPasswordVerified={handlePasswordVerified}
      />
    </div>
  );
};

export default EditProfile;
