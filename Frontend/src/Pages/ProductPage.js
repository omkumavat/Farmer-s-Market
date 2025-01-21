import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import DProduct from "../cards/product";
import Product from "../cards/FarmerProduct";
import FarmerProduct from "../Components/FarmerProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
import DealerPCard from "../Components/DealerPCard";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Components/Loader";

const ProductPage = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDealer, setIsLoadingDealer] = useState(true);  // Loading state for dealer products
    const [isLoadingFarmer, setIsLoadingFarmer] = useState(true);  // Loading state for farmer products

    const [category, setCategory] = useState("");
    const [Products, setProducts] = useState({});
    const [FarmerProducts, setFarmerProducts] = useState({});
    const [CategoryProducts, setCategoryProducts] = useState([]);
    const [sourceType, setSourceType] = useState(""); // "dealer" or "farmer"

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Attempt to fetch dealer product
                const dealerResponse = await axios.get(
                    `http://localhost:4000/server/dealer/getproductbyid/${id}`
                );
                if (dealerResponse.data) {
                    setProducts(dealerResponse.data);
                    setCategory(dealerResponse.data.category);
                    setSourceType("dealer");
                    setIsLoadingDealer(false);  // Set loading to false when dealer product is found
                    return;
                }
            } catch (error) {
                console.warn("Dealer product not found:", error);
            }

            try {
                // Attempt to fetch farmer product
                const farmerResponse = await axios.get(
                    `http://localhost:4000/server/farmer/getproductbyid/${id}`
                );
                if (farmerResponse.data) {
                    setFarmerProducts(farmerResponse.data);
                    setCategory(farmerResponse.data.category);
                    setSourceType("farmer");
                    setIsLoadingFarmer(false);  // Set loading to false when farmer product is found
                    return;
                }
            } catch (error) {
                console.warn("Farmer product not found:", error);
            }
        };

        fetchProducts().finally(() => setIsLoading(false)); // Ensure overall loading state is off
    }, [id]);

    useEffect(() => {
        // Fetch category products based on source type and category
        if (category) {
            const fetchCategoryProducts = async () => {
                const endpoint =
                    sourceType === "dealer"
                        ? `http://localhost:4000/server/dealer/getproductbycategory/all?category=${category}`
                        : `http://localhost:4000/server/farmer/getproductbycategory/all?category=${category}`;

                try {
                    const response = await axios.get(endpoint);
                    setCategoryProducts(response.data.data);
                } catch (error) {
                    console.error("Error fetching category products:", error);
                }
            };

            fetchCategoryProducts();
        }
    }, [category, sourceType]);

    return (
        <>
            <NavBar />
            <div>
                {/* Show loader until data is fetched */}
                {isLoading ? (
                    <Loader />
                ) : sourceType === "dealer" ? (
                    <>
                        <DProduct id={id} />
                        <div className="productsec">
                            <h2>Similar Dealer Products</h2>
                            {isLoadingDealer ? (
                                <Loader />
                            ) : (
                                <div className="productgri">
                                    {CategoryProducts.length > 0 ? (
                                        CategoryProducts.map((product, index) => (
                                            <div key={index} className="productcar">
                                                <DealerPCard {...product} />
                                            </div>
                                        ))
                                    ) : (
                                        <div>No similar dealer products found.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                ) : sourceType === "farmer" ? (
                    <>
                        <Product id={id} />
                        <div className="productsec">
                            <h2>Similar Farmer Products</h2>
                            {isLoadingFarmer ? (
                                <Loader />
                            ) : (
                                <div className="productgri">
                                    {CategoryProducts.length > 0 ? (
                                        CategoryProducts.map((product, index) => (
                                            <div key={index} className="productcar">
                                                <FarmerProduct {...product} />
                                            </div>
                                        ))
                                    ) : (
                                        <div>No similar farmer products found.</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div>No product found.</div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProductPage;
