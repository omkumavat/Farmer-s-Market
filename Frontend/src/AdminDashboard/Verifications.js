import React, { useEffect, useState } from "react";
import "../AdminDashboardCSS/verifications.css"; // Add styles here
import axios from "axios";

const Verifications = () => {
  const [verifications, setVerifications] = useState([]);
  const [filter, setFilter] = useState("pending");

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response = await axios.get("http://localhost:4000/server/dealer/getallverification");
      setVerifications(response.data);
    } catch (error) {
      console.error("Error fetching verifications", error);
    }
  };

  const approveVerification = async (id) => {
    try {
      await axios.patch(`http://localhost:4000/verifications/${id}`);
      fetchVerifications(); // Refresh the list after approval
    } catch (error) {
      console.error("Error approving verification", error);
    }
  };

  const filteredVerifications = verifications.filter(
    (v) => (filter === "pending" ? !v.verified : v.verified)
  );

  return (
    <div className="verification-container">
      <h1>Verifications</h1>
      <div className="filter-buttons">
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
        <button
          className={filter === "verified" ? "active" : ""}
          onClick={() => setFilter("verified")}
        >
          Verified
        </button>
      </div>
      <div className="verification-list">
        {filteredVerifications.map((verification) => (
          <div className="verification-card" key={verification._id}>
            <h2>{verification.name}</h2>
            <p>Email: {verification.email}</p>
            <p>Mobile No .: {verification.mobileno}</p>
            <p>Location .: {verification.location}</p>
            <img
              src={verification.licenseImage}
              alt={`${verification.name}'s license`}
              className="license-image"
            />
            {!verification.verified && (
              <button
                className="approve-btn"
                onClick={() => approveVerification(verification._id)}
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Verifications;
