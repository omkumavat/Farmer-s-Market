
import React, { useState } from "react";
import "../CARDCSS/product.css";
import pmethodImage from '../Images/pmethod.jpg';




const Product = () => {
  const [selectedVariant, setSelectedVariant] = useState("250 gms");
  const [rating, setRating] = useState(5); // Default rating is 5
  const [isOriginChecked, setIsOriginChecked] = useState(true);
  const [isPaymentsChecked, setIsPaymentsChecked] = useState(true);
  const [isStockChecked, setIsStockChecked] = useState(true);

  const variants = [
    { size: "250 gms", price: "₹330" },
    { size: "500 gms", price: "₹460" },
  ];

  const handleVariantClick = (size) => {
    setSelectedVariant(size);
  };

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };



  const toggleCheckbox = (setter) => {
    setter((prevState) => !prevState);
  };

  const [mainImage, setMainImage] = useState("../Images/dealer13.jpg");

  const productImages = [
    "../Images/dealer13.jpg", // Add real image paths
    "../Images/logo.jpg",
    "../Images/dealer13.jpg",
    "../Images/dealer13.jpg",
  ];

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <>
    <div className="product-container">
     <div className="image-section">
        <div className="main-image">
          <img src={mainImage} alt="Selected product" />
        </div>
        <div className="thumbnail-images">
          {productImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${
                mainImage === image ? "selected-thumbnail" : ""
              }`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>
      <div className="product-details">
        <h2>JANATHA AGRO SEAMAN GROWTH PROMOTER</h2>
        <p className="brand-name">JANATHA AGRO PRODUCTS</p>
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
          <span className="current-price">₹330</span>
          <span className="original-price">₹350</span>
          <span className="discount">6% OFF</span>
        </div>
        <p className="extra-discount">Extra 2% off on Online payments</p>
        <div className="variant-section">
          <h4>Variants</h4>
          <div className="variants">
            {variants.map((variant) => (
              <div
                key={variant.size}
                className={`variant ${
                  selectedVariant === variant.size ? "active" : ""
                }`}
                onClick={() => handleVariantClick(variant.size)}
              >
                <p>{variant.size}</p>
                <p>{variant.price}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="extra-info">
          <p>✅ Country of Origin: India</p>
          <p>✅ Secure Payments</p>
          <p>✅ In stock, Ready to Ship</p>
        </div> */}
        <div className="extra-info">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="origin"
            checked={isOriginChecked}
            onChange={() => toggleCheckbox(setIsOriginChecked)}
          />
          <label htmlFor="origin">Country of Origin: India</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="payments"
            checked={isPaymentsChecked}
            onChange={() => toggleCheckbox(setIsPaymentsChecked)}
          />
          <label htmlFor="payments">Secure Payments</label>
        </div>
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="stock"
            checked={isStockChecked}
            onChange={() => toggleCheckbox(setIsStockChecked)}
          />
          <label htmlFor="stock">In stock, Ready to Ship</label>
        </div>
      </div>
        <div className="button-section">
          <button className="add-to-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
      <div className="product-description">
     <h3>Product Description</h3>

     <div className="product-specifications">
       <h4>SPECIFICATIONS:</h4>
       <p>
         Seacup is a copper fish amino acid powder which is essential to the growth of plants. Among other things, it plays a part in several enzyme processes and is key to the formation of chlorophyll. Seacup provides a highly essential component to healthy plant growth. Among other things, it plays a part in several enzyme processes and is key to the formation of chlorophyll.
       </p>
     </div>

     <div className="product-benefits">
       <h4>BENEFITS</h4>
       <ul>
         <li>Activates some enzymes which involves in synthesis of lignin</li>
         <li>Essential in plant respiration</li>
         <li>Assists in plant metabolism of carbohydrates and proteins</li>
         <li>Serves to intensify flavor and color in vegetables and color in flowers</li>
       </ul>
     </div>

     <div className="product-application">
       <h4>METHOD OF APPLICATION:</h4>
       <p>Foliar Spray and Drip irrigation.</p>
     </div>

     <div className="product-dosage">
       <h4>DOSAGE:</h4>
       <p>For Foliar spray: apply 500-1000gm per Hectare (1-2gm per Litre of water).</p>
       <p>For Drip irrigation: apply 1-2Kg per hectare. Frequency or number of sprays to be decided on the severity of deficiency. To be applied at the time from flowering to fruit maturation.</p>
     </div>

     <div className="product-expiry">
       <h4>EXPIRY:</h4>
       <p>3yrs from the date of manufacturing.</p>
     </div>
   </div>
   <div className="product-image-container">
   <img src={pmethodImage} alt="Product Image" />
        </div>
    </div>
   </>
  );
};

export default Product;
