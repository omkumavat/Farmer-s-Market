import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/pcard.css";

const FarmerProduct = ({ _id, productName, pricePerUnit, images,totalQuantitySold, quantity, unit }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/farmer/${_id}/product`);
    window.location.reload();
  };

  return (
    <div className="product-card" onClick={handleNavigation} style={{ cursor: "pointer" }}>
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
        <p className="">Quantity: {quantity} {totalQuantitySold} &nbsp;{unit}</p>
      </div>
      <div className="wishlist-icon">❤️</div>
    </div>
  );
};

export default FarmerProduct;
