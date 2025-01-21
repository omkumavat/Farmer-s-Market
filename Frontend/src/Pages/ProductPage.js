import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import DProduct from "../cards/product";
import Product from "../cards/FarmerProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
import DealerPCard from "../Components/DealerPCard";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Components/Loader";
import Comments from "../Components/Comments";
import FarmerProduct from '../Components/FarmerProduct'

const ProductPage = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingDealer, setIsLoadingDealer] = useState(true);
    const [isLoadingFarmer, setIsLoadingFarmer] = useState(true);

    const [category, setCategory] = useState("");
    const [Products, setProducts] = useState({});
    const [FarmerProducts, setFarmerProducts] = useState({});
    const [CategoryProducts, setCategoryProducts] = useState([]);
    const [sourceType, setSourceType] = useState(""); 
    const [avgRating, setAvgRating] = useState(0);
    const [clickRating, setClickRating] = useState(false);  // State for tracking rating click

    const handleAvgRatingUpdate = (newAvgRating) => {
        setAvgRating(newAvgRating);  
    };

    const handleClickRating = () => {
        setClickRating(true);  
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const dealerResponse = await axios.get(`https://farmer-dealer-user.vercel.app/server/dealer/getproductbyid/${id}`);
                if (dealerResponse.data) {
                    setProducts(dealerResponse.data);
                    setCategory(dealerResponse.data.category);
                    setSourceType("dealer");
                    setIsLoadingDealer(false); 
                    return;
                }
            } catch (error) {
                console.warn("Dealer product not found:", error);
            }

            try {
                const farmerResponse = await axios.get(`https://farmer-dealer-user.vercel.app/server/farmer/getproductbyid/${id}`);
                if (farmerResponse.data) {
                    setFarmerProducts(farmerResponse.data);
                    setCategory(farmerResponse.data.category);
                    setSourceType("farmer");
                    setIsLoadingFarmer(false); 
                    return;
                }
            } catch (error) {
                console.warn("Farmer product not found:", error);
            }
        };

        fetchProducts().finally(() => setIsLoading(false)); 
    }, [id]);

    useEffect(() => {
        if (category) {
            const fetchCategoryProducts = async () => {
                const endpoint =
                    sourceType === "dealer"
                        ? `https://farmer-dealer-user.vercel.app/server/dealer/getproductbycategory/all?category=${category}`
                        : `https://farmer-dealer-user.vercel.app/server/farmer/getproductbycategory/all?category=${category}`;

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
                {isLoading ? (
                    <Loader />
                ) : sourceType === "dealer" ? (
                    <>
                        <DProduct id={id} avgRating={avgRating} clickRate={handleClickRating} />
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
                        <Product id={id} avgRating={avgRating} />
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

                {/* Pass clickRate to Comments component */}
                <Comments id={id} sourceType={sourceType} onAvgRatingUpdate={handleAvgRatingUpdate} clickRate={clickRating} />
            </div>

            <Footer />
        </>
    );
};

export default ProductPage;
