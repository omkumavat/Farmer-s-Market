import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { useAuth } from "../Context/AuthContext";
import VerificationForm from "./VerificationForm";
import axios from "axios";
import FarmerProductForm from "./FarmerProductForm";
import Loader from "./Loader";

const AddProduct = () => {
    const { currentUser } = useAuth();
    const [isVerificationSubmitted, setIsVerificationSubmitted] = useState(false);
    const [isStatus, setIsStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/server/dealer/getverificationstatus/${currentUser._id}`);
                setIsVerificationSubmitted(response.data.isSubmitted);
                setIsStatus(response.data.isSubmitted);
            } catch (error) {
                console.error("Failed to fetch verification status:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Fetch status initially
        fetchStatus();

        // Set interval to fetch the status every second (1000ms)
        const interval = setInterval(() => {
            fetchStatus();
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);

    }, [currentUser._id]);

    return (
        <>
            {isLoading && <div><Loader/></div>}
            {!isLoading && (
                <>
                    {currentUser.role !== "other" && currentUser.role === "dealer" && isStatus && <ProductForm />}
                    {currentUser.role !== "other" && currentUser.role === "farmer" && <FarmerProductForm />}
                    {!isStatus && currentUser.role !== "other" && currentUser.role === "dealer" && !isVerificationSubmitted && (
                        <VerificationForm />
                    )}
                    {isVerificationSubmitted && !isStatus && <div>Status: Pending</div>}
                </>
            )}
        </>
    );
};

export default AddProduct;
