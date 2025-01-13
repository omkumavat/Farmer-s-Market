import React from "react";
import { Link } from "react-router-dom";
const MyOrderCard  =({idd,images,title,totalPrice})=>{
    return(
        <div className="product-card">
                <img src={images?.[0]} alt={title || "Product Image"} className="product-image" />
                {/* Product Info */}
                <div className="product-info">
                  <h3 className="product-title">{title}</h3>
                  <p className="product-price">
                    ₹{totalPrice} 
                  </p>
                </div>

              <label htmlFor="size" className="size-label">
                Order Status : Completed
              </label>
              <div className="wishlist-icon">❤️</div>
              <Link
                to={`/dealer/${idd}/product`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                View Product
              </Link>
            </div>
    );
}

export default MyOrderCard;