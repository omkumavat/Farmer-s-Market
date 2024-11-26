import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import Loader from "./Loader";
import axios from "axios";
import DealerPCard from "./DealerPCard";
import FarmerProduct from "./FarmerProduct";
import "../CSS/product.css"

const Products = () => {
    const { currentUser } = useAuth();
    const [myProducts, setMyProducts] = useState([]);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // Check if the `currentUser` is ready
    useEffect(() => {
        if (currentUser) {
            setIsAuthReady(true);
        }
    }, [currentUser]);

    // Fetch products based on user ID
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (currentUser) {
                    const id = currentUser._id
                    const response = await axios.get(`http://localhost:4000/server/fetchmyproducts/${id}`);
                    console.log(response);
                    setMyProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [currentUser, setMyProducts]);

    // Show a loader until `currentUser` is ready
    if (!isAuthReady) {
        return <Loader />;
    }

    return (
        <>
            <div>
                {/* <h2>My Products</h2> */}
                {currentUser && currentUser.role === "dealer" && (
                    <div className="product-list">
                        {
                            myProducts.map((product, index) => (
                                <div className="farm" key={index}>
                                    <DealerPCard {...product} />
                                </div>
                            ))
                        }
                    </div>
                )}
                {currentUser && currentUser.role === "farmer" && (
                    <div className="product-list">
                        {
                            myProducts.map((product, index) => (
                                <div className="farm" key={index}>
                                    <FarmerProduct {...product} />
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </>
    );
};

export default Products;
