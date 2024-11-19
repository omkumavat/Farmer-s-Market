import React from "react";
import "../CSS/pcard.css";

const DealerPCard = ({ discount, imgSrc, title, brand, price, oldPrice, saved, sizeOptions }) => {
  return (
    <div className="product-card">
      <div className="discount-badge">{discount}% OFF</div>
      <img src={imgSrc} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-brand">{brand}</p>
        <p className="product-price">
          ₹{price} <span className="old-price">₹{oldPrice}</span>
        </p>
        <p className="product-save">Save ₹{saved}</p>
        <label htmlFor="size" className="size-label">Size</label>
        <select className="size-select">
          {sizeOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="wishlist-icon">❤️</div>
    </div>
  );
};

export default DealerPCard;
