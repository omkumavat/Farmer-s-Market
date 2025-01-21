import React, { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { useAuth } from "../Context/AuthContext";
import VerificationForm from "./VerificationForm";
import axios from "axios";
import FarmerProductForm from "./FarmerProductForm";
import Loader from "./Loader";

const AddProduct = () => {
    const { currentUser } = useAuth();
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser || !currentUser._id) return;

        const fetchStatus = async () => {
            try {
                const response = await axios.get(
                    `https://farmer-s-market-theta.vercel.app/server/dealer/getverificationstatus/${currentUser._id}`
                );
                setIsVerified(response.data.isSubmitted);
                console.log(isVerified)
            } catch (error) {
                console.error("Failed to fetch verification status:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStatus();
    }, [currentUser]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            {/* {isVerified===false && currentUser?.role === "dealer" &&  <div>Status: Pending</div>} */}
            {currentUser?.role === "dealer" && (
                <>
                    {isVerified === true ? <ProductForm /> : <VerificationForm />}
                </>
            )}
            {currentUser?.role === "farmer" && <FarmerProductForm />}
        </>
    );
};

export default AddProduct;
