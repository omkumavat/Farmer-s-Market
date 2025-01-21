import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { useAuth } from "../Context/AuthContext";
import VerificationForm from "./VerificationForm";
import axios from "axios";
import FarmerProductForm from "./FarmerProductForm";
import Loader from "./Loader";

const AddProduct = () => {
    const { currentUser } = useAuth();
    const [isVerified, setIsVerified] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [Component, setComponent] = useState(null); // Dynamic Component

    useEffect(() => {
        if (!currentUser || !currentUser._id) return;

        const fetchStatus = async () => {
            try {
                const response = await axios.get(
                    `https://farmer-dealer-user.vercel.app/server/dealer/getverificationstatus/${currentUser._id}`
                );
                setIsVerified(response.data.status);
                setIsSubmit(response.data.isSubmitted);
                // // console.log(response.data);
            } catch (error) {
                console.error("Failed to fetch verification status:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStatus();
    }, [currentUser,isVerified,isSubmit]);

    useEffect(() => {
        if (!currentUser || isLoading) return;

        const determineComponent = () => {
            switch (currentUser.role) {
                case "dealer":
                    if (isVerified === 'Pending' && isSubmit) {
                        return <div>Verification Pending</div>;
                    }
                    if (isVerified === "Approved" && isSubmit) {
                        return <ProductForm />;
                    }
                    return <VerificationForm />;

                case "farmer":
                    return <FarmerProductForm />;

                default:
                    return <div>Unauthorized Access</div>;
            }
        };

        setComponent(determineComponent());
    }, [currentUser,isLoading,isSubmit,isVerified]);

    if (isLoading) {
        return <Loader />;
    }

    return <>{Component}</>;
};

export default AddProduct;
