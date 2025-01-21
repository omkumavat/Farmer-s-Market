import React, { useState } from "react";
import axios from "axios";
import "../CSS/adminmodal.css";
import { useAuth } from "../Context/AuthContext";

const AdminModal = ({ userId, onClose, onApproveSuccess }) => {
    const {currentUser} = useAuth();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleApprove = async () => {
        try {
            console.log("C",currentUser)
            if (currentUser && currentUser.role === "admin" && password === "admin123") {
                const approveResponse = await axios.get(
                    `https://farmer-s-market-theta.vercel.app/server/dealer/approveverifieduser/${userId}`
                );
                alert(approveResponse.data.message);
                onApproveSuccess();
                onClose();
            }
        } catch (error) {
            setError("Invalid password or approval failed.");
            console.error(error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Admin Approval</h2>
                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <div className="modal-actions">
                    <button className="approve-btn" onClick={handleApprove}>
                        Approve
                    </button>
                    <button className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminModal;
