import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FarmerProduct from "../Components/FarmerProduct";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../CSS/farmerproductcategorypage.css";
import Loader from "../Components/Loader";

const ProductCategoryPage = () => {
    const { category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loadingCategory, setLoadingCategory] = useState(true); // Loading state for category products
    const [loadingSimilar, setLoadingSimilar] = useState(true); // Loading state for similar products

    // Fetch products based on the category
    useEffect(() => {
        if (category) {
            setLoadingCategory(true); // Start loading
            axios
                .get(`https://farmer-dealer-user.vercel.app/server/farmer/getproductbycategory/all?category=${category}`)
                .then((response) => {
                    // // console.log("Fetched Category Products:", response.data.data);
                    setCategoryProducts(response.data.data);
                    setLoadingCategory(false); // Stop loading
                })
                .catch((error) => {
                    console.error("Error fetching products by category:", error);
                    setError("Failed to load products. Please try again later.");
                    setLoadingCategory(false); // Stop loading on error
                });
        }
    }, [category]);

    // Fetch similar products
    useEffect(() => {
        setLoadingSimilar(true); // Start loading
        axios
            .get("https://farmer-dealer-user.vercel.app/server/farmer/getsimilarproducts")
            .then((response) => {
                // Filter out products that belong to the current category
                const filteredProducts = response.data.data.filter((product) => product.category !== category);
                setSimilarProducts(filteredProducts);
                setLoadingSimilar(false); // Stop loading
            })
            .catch((error) => {
                console.error("Error fetching similar products:", error);
                setError("Failed to load similar products. Please try again later.");
                setLoadingSimilar(false); // Stop loading on error
            });
    }, [category]);

    return (
        <>
            <NavBar />
            <div>
                {/* Category Products */}
                <div className="categoryproducts">
                    {category && <h1>Products in Category: {category}</h1>}
                    <h2>Category Products</h2>

                    {/* Loader for Category Products */}
                    {loadingCategory ? (
                        <Loader />
                    ) : categoryProducts.length > 0 ? (
                        <div className="productgrid">
                            {categoryProducts.map((product, index) => (
                                <div key={index} className="product-card">
                                    <FarmerProduct {...product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-products-message">No products available in this category.</p>
                    )}
                </div>

                {/* Similar Products */}
                <div className="similar-products">
                    <h2>Similar Products</h2>

                    {/* Loader for Similar Products */}
                    {loadingSimilar ? (
                        <Loader />
                    ) : similarProducts.length > 0 ? (
                        <div className="productgrid">
                            {similarProducts.map((product, index) => (
                                <div key={index} className="product-card">
                                    <FarmerProduct {...product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-products-message">No similar products available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductCategoryPage;
