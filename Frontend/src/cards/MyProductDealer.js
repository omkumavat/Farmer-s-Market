import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/pcard.css";
import PasswordModal from "../Components/PasswordModal";
import "../CARDCSS/myproductcard.css";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import DealerEditForm from "../Components/DealerEditForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const MyProductDealer = ({ _id, title, quantity,largerSizeAvailable,smallerSizeAvailable,serviceType,category,price, images,name, largerSizes, smallerSizes, desc,size, sizeUnit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { currentUser } = useAuth();

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProducts = async () => {
    const response = await axios.delete(`http://localhost:4000/server/dealer/deleteproduct/${_id}`);
    if (response.data.success) {
      toast.sucess("Product Deleted Successfully");
      setIsModalOpen(false);
      window.location.reload();
    } else {
      toast.error("Failed to Delete Product");
    }
  };

  const handleEditSubmit = (updatedProduct) => {
    console.log("Updated Product:", updatedProduct);
    setIsEditOpen(false);
    // You can also send a PUT request to update the product on the server here
  };

  return (
    <><ToastContainer />
    <div className="product-card">
      <Link to={`/dealer/${_id}/product`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="discount-badge">10% OFF</div>
        <img src={images?.[0]} alt={title || "Product Image"} className="product-image" />
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
          <option key={`larger-${index}`}>{`${option.size} ${option.unit}`}</option>
        ))}
        {smallerSizes?.map((option, index) => (
          <option key={`smaller-${index}`}>{`${option.size} ${option.unit}`}</option>
        ))}
        {size && sizeUnit && <option>{`${size} ${sizeUnit}`}</option>}
      </select>
      <div className="btnd">
        <div className="btns">
          <button onClick={() => setIsEditOpen(true)}>Edit</button>
        </div>
        <div className="btns">
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <PasswordModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        userId={currentUser._id}
        oldPassword={currentUser.password}
        onPasswordVerified={handleDeleteProducts}
      />
      <DealerEditForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={{ _id, title,quantity, price,name,sizeUnit, largerSizeAvailable,smallerSizeAvailable,serviceType,category,images, largerSizes, smallerSizes,desc, size }}
        onSubmit={handleEditSubmit}
      />
      <div className="wishlist-icon">❤️</div>
    </div>
    </>
  );
};

export default MyProductDealer;
