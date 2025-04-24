import React, { useEffect, useState } from "react";
import "../AdminDashboardCSS/verifications.css";
import axios from "axios";
import AdminModal from "../Components/AdminModal";

const Verifications = () => {
  const [verifications, setVerifications] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchVerifications();
    // // console.log(verifications)
  }, [setVerifications]);

  const fetchVerifications = async () => {
    try {
      const response = await axios.get("https://farmer-s-market-theta.vercel.app/server/dealer/getallverification");
      setVerifications(response.data);
    } catch (error) {
      console.error("Error fetching verifications", error);
    }
  };

  const handleApproveClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleModalClose = () => {
    setSelectedUserId(null);
  };

  const handleApproveSuccess = () => {
    fetchVerifications(); 
  };

  const sortedVerifications = verifications.sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
    return 0;
  });

  const filteredVerifications = sortedVerifications.filter(
    (v) => (filter === "Pending" ? v.status === "Pending" : v.status === "Approved")
  );

  return (
    <div className="verification-container">
      <h1>Verifications</h1>
      <div className="filter-buttons">
        <button
          className={filter === "Pending" ? "active" : ""}
          onClick={() => setFilter("Pending")}
        >
          Pending
        </button>
        <button
          className={filter === "Approved" ? "active" : ""}
          onClick={() => setFilter("Approved")}
        >
          Approved
        </button>
      </div>
      <div className="verification-list">
        {filteredVerifications.map((verification) => (
          <div className="verification-card" key={verification._id}>
            <h2>{verification.name}</h2>
            <p>Email: {verification.email}</p>
            <p>Mobile No.: {verification.mobileno}</p>
            <p>Location: {verification.location}</p>
            <img
              src={verification.licenseImage}
              alt={`${verification.name}'s license`}
              className="license-image"
            />
            {verification.status === "Pending" && (
              <button
                className="approve-btn"
                onClick={() => handleApproveClick(verification.userId)}
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
      {selectedUserId && (
        <AdminModal
          userId={selectedUserId}
          onClose={handleModalClose}
          onApproveSuccess={handleApproveSuccess}
        />
      )}
    </div>
  );
};

export default Verifications;
