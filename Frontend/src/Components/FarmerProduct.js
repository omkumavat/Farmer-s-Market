import React from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "../CSS/pcard.css";

const DealerPCard = ({ _id, productName, pricePerUnit, images,quantity  , unit }) => {
//   console.log(_id, title, price, images, largerSizes, smallerSizes, size, sizeUnit);

  return (
    <div className="product-card">
      {/* Wrap the entire card in a Link for redirect */}
      <Link
        to={`/dealer/${_id}/product`}
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
    </div>
  );
};

export default DealerPCard;
