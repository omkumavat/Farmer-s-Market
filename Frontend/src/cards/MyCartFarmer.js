import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "../CSS/pcard.css";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Spinner from "../Components/Spinner"
const MyCartFarmer = ({ _id, productName, pricePerUnit, images,quantity  , unit,setFarmerCart }) => {
    const [isAuthReady,setIsAuthReady]=useState(false);

    const {currentUser}=useAuth();
    const handleDeleteWish = async()=>{
        setIsAuthReady(true);
        try {
            const userId=currentUser._id;
            const cartId=_id;
            const response = await axios.delete(
              `https://farmer-s-market-theta.vercel.app/server/dealer/delete-wish/${userId}/${cartId}` // Adjust API endpoint
            );
            setIsAuthReady(false);
            console.log(response.data.message); // Success message
            setFarmerCart((prevCartItems) =>
                prevCartItems.filter((item) => item._id !== cartId)
              );
          } catch (error) {
            console.error('Error removing cart item:', error);
          }
    }
    
  return (
   <>
   {isAuthReady ? (
    <Spinner/>
   ) : (
    <div className="product-card">
      {/* Wrap the entire card in a Link for redirect */}
      <Link
        to={`/farmer/${_id}/product`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="discount-badge">10% OFF</div>
        {/* Product Image */}
        <img src={images?.[0]} alt={productName || "Product Image"} className="product-image" />
        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-title">{productName}</h3>
          <p className="product-price">
            ₹{pricePerUnit} <span className="old-price">₹{pricePerUnit * 1.1}</span>
          </p>
          <p className="product-save">Save ₹{(pricePerUnit * 0.1).toFixed(2)}</p>
          <p className="">Quantity : {quantity} &nbsp;{unit}</p>
        </div>
      </Link>
      <div className="wishlist-icon">❤️</div>
      <button className="deletewish" onClick={handleDeleteWish}>Remove from Wishlist</button>
    </div>
   )}
   </>
  );
};

export default MyCartFarmer;
