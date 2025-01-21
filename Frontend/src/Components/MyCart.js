import React, { useState, useEffect } from "react";
import DealerPCard from "./DealerPCard";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import FarmerProduct from "./FarmerProduct";
import "../DashboardCSS/mycart.css";
import MyCartDealer from "../cards/MyCartDealer";
import MyCartFarmer from "../cards/MyCartFarmer";
// import Dealer from '../Services/Dealer'
import { Navigate, useNavigate } from "react-router-dom";
const MyCart = () => {
  const [farmercart, setFarmerCart] = useState([]);
  const [dealercart, setDealerCart] = useState([]);
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const navigate=useNavigate();

    useEffect(() => {
        if (currentUser && currentUser._id) {
            axios.get(`https://farmer-dealer-user.vercel.app/server/dealer/getcart/${currentUser._id}`)
                .then(response => {
                    setFarmerCart(response.data.farmercart);
                    setDealerCart(response.data.dealercart);
                })
                .catch(error => {
                    console.error('Error fetching cart:', error);
                    setError('Failed to load cart');
                });
        }
    }, [currentUser]);

  return (
    <div className="mycart1">
      {error && <p>{error}</p>}
      <ul>
        {dealercart.length === 0 && farmercart.length === 0 && (
          <div className="empty-wishlist">
            <h2>No products added to wishlist</h2>
            <button
              className="continue-shopping"
              onClick={() => navigate("/dealer")}
            >
              Continue Shopping
            </button>
          </div>
        )}

        {dealercart.length > 0 && (
          <>
            <h2 className="hh1">Your WishList Containing Dealer Products</h2>
            <div className="productlist1">
              {dealercart.map((product, index) => (
                <div key={index}>
                  <MyCartDealer {...product} setDealerCart={setDealerCart} />
                </div>
              ))}
            </div>
          </>
        )}

        {farmercart.length > 0 && (
          <>
            <h2 className="hh1">Your WishList Containing Farmer Products</h2>
            <div className="productlist1">
              {farmercart.map((product, index) => (
                <div key={index}>
                  <MyCartFarmer {...product} setFarmerCart={setFarmerCart} />
                </div>
              ))}
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default MyCart;
