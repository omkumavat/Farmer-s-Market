import React, { useState, useEffect } from "react";
import DealerPCard from "./DealerPCard";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import FarmerProduct from "./FarmerProduct";
import "../DashboardCSS/mycart.css"
import MyCartDealer from "../cards/MyCartDealer";
import MyCartFarmer from "../cards/MyCartFarmer";
const MyCart = () => {
    const [farmercart, setFarmerCart] = useState([]);
    const [dealercart, setDealerCart] = useState([]);
    const { currentUser } = useAuth();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser && currentUser._id) {
            axios.get(`http://localhost:4000/server/dealer/getcart/${currentUser._id}`)
                .then(response => {
                    setFarmerCart(response.data.farmercart);
                    setDealerCart(response.data.dealercart);
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                    setError('Failed to load cart');
                });
        }
    }, []);
    return (
        <>
            <div className="mycart1">
                {error && <p>{error}</p>}
                <ul>
                    <><h2 className="hh1">Your WishList</h2>
                        {
                            <div className="productlist1">
                                {dealercart.map((product, index) => (
                                    <div key={index}>
                                        {<MyCartDealer {...product} setDealerCart={setDealerCart} />}
                                        
                                    </div>
                                ))}
                            </div>
                        }
                        {
                            <div className="productlist1">
                                {farmercart.map((product, index) => (
                                    <div key={index}>
                                        {<MyCartFarmer {...product} setFarmerCart={setFarmerCart}/>}
                                    </div>
                                ))}
                            </div>
                        }
                    </>
                </ul>
            </div>
        </>
    );
}

export default MyCart;