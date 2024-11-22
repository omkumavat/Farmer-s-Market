import React, { useState, useEffect } from "react";
import "../CARDCSS/product.css";
import pmethodImage from "../Images/pmethod.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const Product = ({ id }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [Desc, setDesc] = useState("");

  const handleAddToCart = async() => {
    console.log(currentUser);
    console.log(product);
    try {
      if(currentUser){
        const response = await axios.post('http://localhost:4000/server/dealer/addtocart', {
          userId:currentUser._id,
          productId:product._id,
        });
        alert(response.data.message);
      }else{
        alert("Login First");
      }
    } catch (error) {
      alert(error.response ? error.response.data.message : 'Error adding to cart');
    }
  }

  useEffect(() => {
    const arr = [];
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/server/dealer/getproductbyid/${id}`
        );
        const data = response.data;

        setProduct(data);
        console.log(data);
        setMainImage(data.images[0]);

        arr.push(data.size);
        arr.push(data.sizeUnit);
        arr.push(data.price);
        const combinedVariants = [
          ...data.largerSizes.map((size) => ({ ...size, type: "Larger" })),
          ...data.smallerSizes.map((size) => ({ ...size, type: "Smaller" })),
          // ...arr
        ];
        setVariants(combinedVariants);
        console.log(variants);
        const cleanText = data.desc
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
        if (combinedVariants.length > 0) {
          setSelectedVariant(combinedVariants[0]);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id, setMainImage, setSelectedVariant, setMainImage]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="product-container">
      {/* Image Section */}
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
        <h2>{product.name}</h2>
        <p className="brand-name">{product.title || "Unknown Brand"}</p>
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
          <span className="current-price">₹{product.price}</span>
          <span className="original-price">₹{product.price * 1.1}</span><br />
          <span className="discount">Save : ₹{(product.price * 0.1).toFixed(2)}</span>
          {/* <span className="discount">Extra ₹{(product.price * 0.1).toFixed(2)} off on Online payments</span> */}
        </div>

        {/* Price Section */}
        <div className="price-section">
          {selectedVariant && (
            <>
              <span className="current-price">₹{selectedVariant.price}</span>
              <span className="original-price">
                ₹{(selectedVariant.price * 1.1).toFixed(2)}
              </span>
              <span className="discount">
                ₹{(selectedVariant.price * 0.1).toFixed(2)}
              </span>
            </>
          )}
        </div>
        <p className="extra-discount">
          Extra ₹{selectedVariant && (selectedVariant.price * 0.1).toFixed(2)}{" "}
          off on Online payments
        </p>

        {/* Variants Section */}
        <div className="variant-section">
          <h4>Variants</h4>
          <div className="variants">
            {variants.map((variant, index) => (
              <div
                key={index}
                className={`variant ${selectedVariant?.size === variant.size ? "active" : ""
                  }`}
                onClick={() => handleVariantClick(variant)}
              >
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;{variant.size}{variant.unit}&nbsp;&nbsp;&nbsp;&nbsp;
                </p>
                <p>₹{variant.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Information */}
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
