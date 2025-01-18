import React from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "../CARDCSS/pcard.css";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import Spinner from "../Components/Spinner";

const MyCartDealer = ({ _id, title, price, images, largerSizes, smallerSizes, size, sizeUnit, setDealerCart }) => {
    const [isAuthReady, setIsAuthReady] = useState(false);

    const { currentUser } = useAuth();
    const handleDeleteWish = async () => {
        setIsAuthReady(true);
        try {
            const userId = currentUser._id;
            const cartId = _id;
            const response = await axios.delete(
                `https://farmer-s-market-theta.vercel.app/server/dealer/delete-wish/${userId}/${cartId}` // Adjust API endpoint
            );
            setIsAuthReady(false);
            console.log(response.data.message); // Success message
            setDealerCart((prevCartItems) =>
                prevCartItems.filter((item) => item._id !== cartId)
            );
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    }


    return (
        <>
            {
                isAuthReady ? (
                    <Spinner />
                ) : (
                    <div className="product-card">
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
                        <div className="wishlist-icon">❤️</div>
                        <button className="deletewish" onClick={handleDeleteWish}>Remove from Wishlist</button>
                    </div>
                )
            }
        </>
    );
};

export default MyCartDealer;
