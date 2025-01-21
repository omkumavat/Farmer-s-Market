import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DealerPCard from "../Components/DealerPCard";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../CSS/productcategory.css";
import Loader from "../Components/Loader";

const ProductCategoryPage = () => {
    const { category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loadingCategory, setLoadingCategory] = useState(true);
    const [loadingSimilar, setLoadingSimilar] = useState(true);

    useEffect(() => {
        if (category) {
            setLoadingCategory(true);
            axios
                .get(`https://farmer-dealer-user.vercel.app/server/dealer/getproductbycategory/all?category=${category}`)
                .then((response) => {
                    // // console.log("Fetched Category Products:", response.data.data);
                    setCategoryProducts(response.data.data);
                    setLoadingCategory(false);
                })
                .catch((error) => {
                    console.error("Error fetching products by category:", error);
                    setError("Failed to load products. Please try again later.");
                    setLoadingCategory(false);
                });
        }
    }, [category]);

    useEffect(() => {
        setLoadingSimilar(true);
        axios
            .get(`https://farmer-dealer-user.vercel.app/server/dealer/getsimilarproducts`)
            .then((response) => {
                const filteredProducts = response.data.data.filter((product) => product.category !== category);
                setSimilarProducts(filteredProducts);
                setLoadingSimilar(false);
            })
            .catch((error) => {
                console.error("Error fetching similar products:", error);
                setError("Failed to load similar products. Please try again later.");
                setLoadingSimilar(false);
            });
    }, [category]);

    return (
        <>
            <NavBar />
            <div className="product-display-page">
                {category && <h1>Products in Category: {category}</h1>}
                {error && <p className="error-message">{error}</p>}

                {/* Category Products Section */}
                <div className="product-section">
                    <h2>Category Products</h2>
                    {loadingCategory ? (
                        <Loader />
                    ) : categoryProducts.length > 0 ? (
                        <div className="product-grid">
                            {categoryProducts.map((product, index) => (
                                <div key={index} className="product-card">
                                    <DealerPCard {...product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-products-message">No products available in this category.</p>
                    )}
                </div>

                {/* Similar Products Section */}
                <div className="product-section">
                    <h2>Similar Products</h2>
                    {loadingSimilar ? (
                        <Loader />
                    ) : similarProducts.length > 0 ? (
                        <div className="product-grid">
                            {similarProducts.map((product, index) => (
                                <div key={index} className="product-card">
                                    <DealerPCard {...product} />
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
