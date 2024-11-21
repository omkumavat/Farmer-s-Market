import React from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "../CSS/pcard.css";

const DealerPCard = ({ _id, title, price, images, largerSizes, smallerSizes, size, sizeUnit }) => {
  console.log(_id,title, price, images, largerSizes, smallerSizes, size,sizeUnit);

  return (
    <div className="product-card">
      {/* Wrap the entire card in a Link for redirect */}
      <Link
        to={`/dealer/${_id}/product`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="discount-badge">10% OFF</div>
        {/* Product Image */}
        <img src={images?.[0]} alt={title || "Product Image"} className="product-image" />
        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-title">{title}</h3>
          <p className="product-price">
            ₹{price} <span className="old-price">₹{price * 1.1}</span>
          </p>
          <p className="product-save">Save ₹{(price * 0.1).toFixed(2)}</p>
        </div>
      </Link>
      {/* Size Dropdown */}
      <label htmlFor="size" className="size-label">
        Size
      </label>
      <select className="size-select">
        {largerSizes?.map((option, index) => (
          <option key={`larger-${index}`}>
            {`${option.size} ${option.unit}`}
          </option>
        ))}
        {smallerSizes?.map((option, index) => (
          <option key={`smaller-${index}`}>
            {`${option.size} ${option.unit}`}
          </option>
        ))}
        {size && sizeUnit && <option>{`${size} ${sizeUnit}`}</option>}
      </select>
      {/* Wishlist Icon */}
      <div className="wishlist-icon">❤️</div>
    </div>
  );
};

export default DealerPCard;
