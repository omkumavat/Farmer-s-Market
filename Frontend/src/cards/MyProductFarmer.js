import React ,{useState} from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "../CSS/pcard.css";
import PasswordModal from "../Components/PasswordModal";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
const FarmerProduct = ({ _id, productName, pricePerUnit, images,quantity  , unit }) => {
//   console.log(_id, title, price, images, largerSizes, smallerSizes, size, sizeUnit);
const [isModalOpen, setIsModalOpen] = useState(false);
const {currentUser}=useAuth();
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProducts = async() => {
    const response = await axios.delete(`http://localhost:4000/server/farmer/deleteproduct/${_id}`);
    if(response.data.success){
        alert("Product Deleted Successfuly");
        setIsModalOpen(false);
    }else{
        alert("Failed to Delete Product");
    }
  }
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
      <div className="btnd">
       <div className="btns">
       <button>Edit</button>
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
      <div className="wishlist-icon">❤️</div>
    </div>
  );
};

export default FarmerProduct;
