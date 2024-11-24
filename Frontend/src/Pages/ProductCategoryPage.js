import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DealerPCard from "../Components/DealerPCard";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../CSS/productcategory.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Arrow icons for buttons

const ProductCategoryPage = () => {
    const { category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [error, setError] = useState(null);
    const [activeCategorySlide, setActiveCategorySlide] = useState(0);
    const [activeSimilarSlide, setActiveSimilarSlide] = useState(0);
    const productsPerPage = 5; // Show 5 images per slide
    
    // Fetch products based on the category
    useEffect(() => {
        if (category) {
            axios
                .get(`http://localhost:4000/server/dealer/getproductbycategory/all?category=${category}`)
                .then((response) => {
                    console.log("Fetched Category Products:", response.data.data);
                    setCategoryProducts(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching products by category:", error);
                    setError("Failed to load products. Please try again later.");
                });
        }
    }, [category]);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/server/dealer/getallproducts/all?limit=${1000}`)
            .then((response) => {
                // Filter out products that belong to the current category
                const filteredProducts = response.data.data.filter((product) => product.category !== category);
                setSimilarProducts(filteredProducts);
            })
            .catch((error) => {
                console.error("Error fetching similar products:", error);
                setError("Failed to load similar products. Please try again later.");
            });
    }, [category]);

    const handleCategoryPrev = () => {
        setActiveCategorySlide((prev) => (prev === 0 ? Math.floor(categoryProducts.length / productsPerPage) : prev - 1));
    };

    const handleCategoryNext = () => {
        setActiveCategorySlide((prev) => (prev === Math.floor(categoryProducts.length / productsPerPage) ? 0 : prev + 1));
    };

    const handleSimilarPrev = () => {
        setActiveSimilarSlide((prev) => (prev === 0 ? Math.floor(similarProducts.length / productsPerPage) : prev - 1));
    };

    const handleSimilarNext = () => {
        setActiveSimilarSlide((prev) => (prev === Math.floor(similarProducts.length / productsPerPage) ? 0 : prev + 1));
    };

    return (
        <>
            <NavBar />
            <div className="product-display-page">
                {category && <h1>Products in Category: {category}</h1>}

                {error && <p className="error-message">{error}</p>}

                {/* Category Products Row */}
                <div className="slider-container category-slider">
                    <button className="prev-btn" onClick={handleCategoryPrev}>
                        <FaArrowLeft />
                    </button>
                    <div className="slider">
                        <div
                            className="slider-row"
                            style={{
                                transform: `translateX(-${activeCategorySlide * (100 / productsPerPage)}%)`,
                                width: `${(categoryProducts.length * 100) / productsPerPage}%`,
                                transition: "transform 0.5s ease-in-out",
                            }}
                        >
                            {categoryProducts.map((product, index) => (
                                <div key={index} className="slider-item">
                                    <DealerPCard {...product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="next-btn" onClick={handleCategoryNext}>
                        <FaArrowRight />
                    </button>
                </div>

                {/* Similar Products Row */}
                <div className="slider-container similar-slider">
                    <button className="prev-btn" onClick={handleSimilarPrev}>
                        <FaArrowLeft />
                    </button>
                    <div className="slider">
                        <div
                            className="slider-row"
                            style={{
                                transform: `translateX(-${activeSimilarSlide * (100 / productsPerPage)}%)`,
                                width: `${(similarProducts.length * 100) / productsPerPage}%`,
                                transition: "transform 0.5s ease-in-out",
                            }}
                        >
                            {similarProducts.map((product, index) => (
                                <div key={index} className="slider-item">
                                    <DealerPCard {...product} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="next-btn" onClick={handleSimilarNext}>
                        <FaArrowRight />
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductCategoryPage;
