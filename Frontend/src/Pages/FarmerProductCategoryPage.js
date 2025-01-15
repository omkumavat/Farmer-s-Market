import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FarmerProduct from "../Components/FarmerProduct";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import "../CSS/farmerproductcategorypage.css"

const ProductCategoryPage = () => {
    const { category } = useParams();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [error, setError] = useState(null);

    // Fetch products based on the category
    useEffect(() => {
        if (category) {
            axios
                .get(`http://localhost:4000/server/farmer/getproductbycategory/all?category=${category}`)
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
            .get(`http://localhost:4000/server/farmer/getsimilarproducts`)
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

    return (
        <>
            <NavBar />
            <div>
                {/* Category Products */}
                <div className="categoryproducts">
                    {category && <h1>{category} Products</h1>}
                    <div className="productgrid">
                        {categoryProducts.map((product, index) => (
                            <div key={index} className="product-card">
                                <FarmerProduct {...product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Similar Products */}
                <div className="similar-products">
                    <h1>Similar Products</h1>
                    <div className="productgrid">
                        {similarProducts.map((product, index) => (
                            <div key={index} className="product-card">
                                <FarmerProduct {...product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductCategoryPage;
