import React, { useState, useEffect } from "react";
import "../CARDCSS/product.css";
import pmethodImage from "../Images/pmethod.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Components/Loader";

const Product = ({ id }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [Desc, setDesc] = useState("");

  const handleAddToCart = async () => {
    console.log(currentUser);
    // console.log(product);
    // try {
    //   if(currentUser){
    //     const response = await axios.post('http://localhost:4000/server/dealer/addtocart', {
    //       userId:currentUser._id,
    //       productId:product._id,
    //     });
    //     alert(response.data.message);
    //   }else{
    //     alert("Login First");
    //   }
    // } catch (error) {
    //   alert(error.response ? error.response.data.message : 'Error adding to cart');
    // }
  }

  function handleDates(dateStr) {
    const date = new Date(dateStr);

    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short', // e.g., Thu
      day: '2-digit',   // e.g., 11
      month: 'long',    // e.g., November
      year: 'numeric'   // e.g., 2024
    });
    return formattedDate;
  }

  useEffect(() => {
    const arr = [];
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/server/farmer/getproductbyid/${id}`
        );
        const data = response.data;

        setProduct(data);
        console.log(data);
        setMainImage(data.images[0]);

        const cleanText = data.description
          .replace(/<strong>(.*?)<\/strong>/g, '$1') // Remove <strong> but keep text
          .replace(/<ul>/g, '') // Remove <ul> tags
          .replace(/<\/ul>/g, '\n') // Replace </ul> with a new line for list
          .replace(/<ol>/g, '') // Remove <ol> tags
          .replace(/<\/ol>/g, '\n') // Replace </ol> with a new line for ordered list
          .replace(/<li>/g, '') // Remove <li> tags
          .replace(/<\/li>/g, '\n- ') // Replace </li> with a new line and bullet point
          .replace(/<h3>/g, '\n\n') // Add line breaks before headers
          .replace(/<\/h3>/g, '\n') // Add line breaks after headers
          .replace(/<br>/g, '\n')
          .replace(/<[^>]+>/g, ''); // Remove any remaining HTML tags
        setDesc(cleanText);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id, setMainImage, setProduct]);

  useEffect(() => {
    if (product) {
      const dateStr = product.availableFrom;
      const dateStr2 = product.availableUntil;
      setProduct((prevProduct) => ({
        ...prevProduct,
        availableFrom: handleDates(dateStr),
        availableUntil: handleDates(dateStr2),
      }));
    }
  }, [product]);
  

  if (!product) {
    return <Loader />;
  }


  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="product-container">
      <div className="image-section">
        <div className="main-image">
          <img src={mainImage} alt="Selected product" />
        </div>
        <div className="thumbnail-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${mainImage === image ? "selected-thumbnail" : ""
                }`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>

      <div className="product-details">
        <h2>{product.productName}</h2>
        <p className="brand-name">{product.farmAddress || "Unknown Brand"}</p>
        <p className="brand-name">{product.districtState || "Unknown Brand"}</p>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "selected" : ""}`}
              onClick={() => handleRatingClick(star)}
            >
              ★
            </span>
          ))}
          <span className="rating-text">
            ({rating} {rating === 1 ? "star" : "stars"})
          </span>
        </div>

        <div className="price-section">
          <span className="current-price">₹{product.pricePerUnit}/{product.unit}</span>
          <span className="original-price">₹{product.pricePerUnit * 1.1}</span><br />
          <span className="discount">Save : ₹{(product.pricePerUnit * 0.1).toFixed(2)}</span>
          <br></br>
          <span className="current-price">Total Price : ₹{product.pricePerUnit*product.quantity}</span>
        </div>
        <div>
          <p>Available Quantity : {product.quantity}&nbsp;{product.unit}</p>
          <p>Valid From : {product.availableFrom}</p>
          <p>Valid Till :  {product.availableUntil}</p>
        </div>
        <div className="extra-info">
          <div className="checkbox-item">
            <img src="/Images/pcard1.png"></img><label> Country of Origin: India</label>
          </div>
          <div className="checkbox-item">
            <img src="/Images/pcard2.png"></img> <label>Secure Payments</label>
          </div>
          <div className="checkbox-item">
            <img src="/Images/pcard3.png"></img> <label>In stock, Ready to Ship</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-section">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>

      {/* Product Description */}
      <div className="product-description">
        <h3>Product Description</h3>
        <pre>{Desc || "No description available."}</pre>
      </div>
      <div className="product-image-container">
        <img src={pmethodImage} alt="Payment Method" />
      </div>
    </div>
  );
};

export default Product;
