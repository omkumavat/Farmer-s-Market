import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/verificationform.css";
import { useAuth } from "../Context/AuthContext";
import Loader from "./Loader";

const VerificationForm = ({ onVerificationSuccess }) => {
    const { currentUser } = useAuth();
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileno: "",
        location: "",
        licenseImage: null,
        userId: currentUser._id,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentUser !== undefined) {
            setIsAuthReady(true); // Mark as ready once currentUser is loaded
        }
    }, [currentUser]);

    if (!isAuthReady) {
        return <Loader/>;
    }

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email.";
        }
        if (!formData.mobileno) {
            newErrors.mobileno = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(formData.mobileno)) {
            newErrors.mobileno = "Enter a valid 10-digit mobile number.";
        }
        if (!formData.location) newErrors.location = "Location is required.";
        if (!formData.licenseImage) newErrors.licenseImage = "License image is required.";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, licenseImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("mobileno", formData.mobileno);
            formDataToSend.append("location", formData.location);
            formDataToSend.append("userId", formData.userId);
            formDataToSend.append("licenseImage", formData.licenseImage);

            try {
                setIsLoading(true); // Start loading
                const response = await axios.post("https://farmer-dealer-user.vercel.app/server/dealer/postverifications", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                // console.log("Form submitted:", response.data);

                // Poll the backend to check for the status
                const intervalId = setInterval(async () => {
                    try {
                        const statusResponse = await axios.get(
                            `https://farmer-dealer-user.vercel.app/server/dealer/getVerificationStatus/${currentUser._id}`
                        );
                        const { status } = statusResponse.data;
                        if (status === "Pending") {
                            clearInterval(intervalId); // Stop polling
                            setIsLoading(false); // Stop loading
                            onVerificationSuccess(); // Trigger parent success
                        }
                    } catch (error) {
                        console.error("Error checking status:", error);
                    }
                }, 3000); // Poll every 3 seconds
            } catch (error) {
                console.error("Error submitting form:", error);
                setIsLoading(false); // Stop loading in case of error
            }
        }
    };

    return (
        <div className="verification-form-container">
            <h2>Verification Form</h2>
            {isLoading ? (
                <div className="loading-spinner">
                    <p>Submitting your verification form...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="formgroup">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="formgroup">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="formgroup">
                        <label htmlFor="mobileno">Mobile Number</label>
                        <input
                            type="text"
                            id="mobileno"
                            name="mobileno"
                            value={formData.mobileno}
                            onChange={handleChange}
                            placeholder="Enter your 10-digit mobile number"
                        />
                        {errors.mobileno && <span className="error">{errors.mobileno}</span>}
                    </div>

                    <div className="formgroup">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter your location"
                        />
                        {errors.location && <span className="error">{errors.location}</span>}
                    </div>

                    <div className="formgroup">
                        <label htmlFor="licenseImage">Upload License Image</label>
                        <input
                            type="file"
                            id="licenseImage"
                            name="licenseImage"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {errors.licenseImage && <span className="error">{errors.licenseImage}</span>}
                    </div>

                    <button className="sub" type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default VerificationForm;
