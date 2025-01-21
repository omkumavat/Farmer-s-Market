import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import Loader from "./Loader";
import axios from "axios";
import DealerPCard from "./DealerPCard";
import FarmerProduct from "./FarmerProduct";
import "../CSS/product.css"
import MyProductDealer from "../cards/MyProductDealer";
import MyProductFarmer from '../cards/MyProductFarmer'

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
                    const response = await axios.get(`https://farmer-dealer-user.vercel.app/server/fetchmyproducts/${id}`);
                    // // console.log(response.data.data);
                    setMyProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [currentUser, setMyProducts]);
    const handleRemoveProduct = (id) => {
        window.location.reload();
        setMyProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      };

    // Show a loader until `currentUser` is ready
    if (!isAuthReady) {
        return <Loader />;
    }

    return (
        <>
            <div className="mypro1"> 
                <h2>My Products</h2>
                {currentUser && currentUser.role === "dealer" && (
                    <div className="product-list1">
                        {
                            myProducts.map((product, index) => (
                                <div className="farm1" key={index}>
                                    <MyProductDealer {...product}
                                    onDelete={handleRemoveProduct} />
                                </div>
                            ))
                        }
                    </div>
                )}
                {currentUser && currentUser.role === "farmer" && (
                    <div className="product-list1">
                        {
                            myProducts.map((product, index) => (
                                <div className="farm1" key={index}>
                                    <MyProductFarmer {...product} />
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
