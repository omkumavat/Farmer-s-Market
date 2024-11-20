import React from "react";
import "../CSS/pcard.css";

const DealerPCard = ({  title, price,images, largerSizes,smallerSizes,size }) => {
  console.log("title",images)
  return (
    <div className="product-card">
      <div className="discount-badge">10% OFF</div>
      <img src={images[0]} alt={title} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        {/* <p className="product-brand">{brand}</p> */}
        <p className="product-price">
          {/* ₹{price} <span className="old-price">₹{oldPrice}</span> */}
        </p>
        <p className="product-save">Save ₹100</p>
        <label htmlFor="size" className="size-label">Size</label>
        <select className="size-select">
          {
          largerSizes.map((option, index) => (
            <option key={index} value={option}>
              {option.size}
            </option>
          )) &&
          smallerSizes.map((option, index) => (
            <option key={index} value={option}>
              {`${option.size} ${option.unit}`}
            </option>
          ))
          }
        </select>
      </div>
      <div className="wishlist-icon">❤️</div>
    </div>
  );
};

export default DealerPCard;
