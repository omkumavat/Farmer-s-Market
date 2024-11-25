import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { useAuth } from "../Context/AuthContext";
import VerificationForm from "./VerificationForm";
import axios from "axios"; // Or your preferred HTTP library
import FarmerProductForm from "./FarmerProductForm";
import Loader from "./Loader";

const AddProduct = () => {
    const { currentUser } = useAuth();
    const [isVerificationSubmitted, setIsVerificationSubmitted] = useState(false);
    const [isStatus, isSetStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/server/dealer/getverificationstatus/${currentUser._id}`);
                setIsVerificationSubmitted(response.data.isSubmitted);
                isSetStatus(response.data.status);
            } catch (error) {
                console.error("Failed to fetch verification status:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStatus();
    }, [currentUser._id]);


    return (
        <>
            {isLoading && <div><Loader/></div>}
            {!isLoading && (
                <>
                    {currentUser.role !== "other" && currentUser.role==="dealer" && currentUser.verified && <ProductForm />}
                    {currentUser.role !== "other" && currentUser.role==="farmer" && <FarmerProductForm />}
                    {!currentUser.verified && currentUser.role !== "other" &&currentUser.role==="dealer" && !isVerificationSubmitted && (
                        <VerificationForm  />
                    )}
                    {isVerificationSubmitted && isStatus === "Pending" &&  <div>Status: Pending</div>}
                </>
            )}
        </>
    );
};

export default AddProduct;
