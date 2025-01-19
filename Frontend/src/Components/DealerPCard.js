import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/pcard.css";
import { FaWindows } from "react-icons/fa";

const DealerPCard = ({ _id, title, price, images, largerSizes, smallerSizes, size, sizeUnit }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/dealer/${_id}/product`);
    window.location.reload();
  };

  return (
    <div className="product-card" onClick={handleNavigation} style={{ cursor: "pointer" }}>
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
      <div className="wishlist-icon">❤️</div>
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
    </div>
  );
};

export default DealerPCard;
