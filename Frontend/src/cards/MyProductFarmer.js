import React ,{useState} from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported
import "../CSS/pcard.css";
import PasswordModal from "../Components/PasswordModal";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import FarmerEditForm from '../Components/FarmerEditForm'
const FarmerProduct = ({ _id, productName, pricePerUnit, images,quantity ,availableFrom,availableUntil,category,subCategory,qualityGrade,pincode,districtState,description,farmAddress , unit }) => {
//   console.log(_id, title, price, images, largerSizes, smallerSizes, size, sizeUnit);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isEditOpen, setIsEditOpen] = useState(false);
const {currentUser}=useAuth();
  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleDeleteProducts = async() => {
    const response = await axios.delete(`https://farmer-s-market-theta.vercel.app/server/farmer/deleteproduct/${_id}`);
    console.log("rr",response.data.success)
    if(response.data.success){
        alert("Product Deleted Successfuly");
        setIsModalOpen(false);
    }else{
        alert("Failed to Delete Product");
    }
  }

  const handleEditSubmit = (updatedProduct) => {
    console.log("Updated Product:", updatedProduct);
    setIsEditOpen(false);
    // You can also send a PUT request to update the product on the server here
  };

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
       <FarmerEditForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={{ _id, productName, pricePerUnit, images,quantity ,availableFrom,availableUntil,category,subCategory,qualityGrade,pincode,districtState,description,farmAddress , unit}}
        onSubmit={handleEditSubmit}
      />
      <div className="wishlist-icon">❤️</div>
    </div>
  );
};

export default FarmerProduct;
