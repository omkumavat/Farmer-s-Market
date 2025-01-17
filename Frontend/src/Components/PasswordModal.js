import React, { useState } from "react";
import axios from "axios";
import "../CSS/PasswordModal.css"; // Assuming the CSS file is named Modal.css

const PasswordModal = ({ isOpen, closeModal, setOldPassword,oldPassword, userId, onPasswordVerified }) => {
  // const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message
  
    try {
      const response = await axios.post(`https://farmer-s-market-theta.vercel.app/server/user/verifypassword`, {
        userId,
        oldPassword,
      });
  
      if (response.data.success) {
        onPasswordVerified(oldPassword); // Pass oldPassword to the parent callback
        closeModal();
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Verify Your Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              // value={oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error">Password does not match. Try again later</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Submit"}
          </button>
        </form>
        <button className="close-button" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default PasswordModal;
