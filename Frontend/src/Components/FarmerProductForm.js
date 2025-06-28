import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Loader from "./Loader";

const farmProduceCategories = {
  "Fresh Produce": ["Fruits", "Vegetables", "Exotic Produce"],
  "Grains and Cereals": ["Wheat", "Rice", "Maize", "Barley", "Millet"],
  "Pulses and Legumes": ["Lentils", "Chickpeas", "Kidney Beans", "Green Gram", "Black Gram"],
  "Dairy and Milk Products": ["Fresh Milk", "Ghee", "Butter", "Cheese", "Yogurt"],
  "Livestock and Animal Products": ["Eggs", "Poultry", "Honey", "Wool", "Meat"],
  "Organic Products": ["Organic Fruits and Vegetables", "Organic Grains", "Organic Fertilizers", "Organic Spices"],
  "Value-Added Products": ["Jams", "Juices", "Ready-to-Cook Products", "Packaged Snacks"],
  "Specialty Crops": ["Spices", "Herbs", "Medicinal Plants"],
  "Fibers and Raw Materials": ["Cotton", "Jute", "Hemp", "Coir"],
  "Other Farm Produce": ["Seeds", "Flowers", "Saplings and Nursery Plants"],
  "By-products": ["Animal Manure", "Crop Residue", "Biogas-related Products"],
};

const FarmerProductForm = () => {
  const { currentUser } = useAuth();
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    userId: currentUser._id,
    productName: "",
    category: "",
    subCategory: "",
    quantity: "",
    pricePerUnit: "",
    description: "",
    images: []
  });

  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (currentUser !== undefined) {
      setIsAuthReady(true); // Mark as ready once currentUser is loaded
    }
  }, [currentUser]);

  if (!isAuthReady) {
    return <Loader />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value, subCategory: "" });
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;

    // Check if files are selected
    if (files.length > 0) {
      // Convert File objects to Base64 for formData
      const imageArray = await Promise.all(
        Array.from(files).map((file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);  // base64 encoded string
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
        )
      );

      // Set image previews using File objects (not base64)
      const imagePreviews = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );

      // Update state with the base64 image data for formData
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...imageArray];
        // Limit to 3 images if necessary
        return updatedImages.slice(0, 3);
      });

      // Update formData with the new images array (base64 encoded)
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...imageArray].slice(0, 3), // Limit to 3
      }));

      // Set the image preview URLs
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...imagePreviews,
      ]);

      // Clear image-related errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        images: "",
      }));
    }
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName) newErrors.productName = "Product name is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.subCategory) newErrors.subCategory = "Sub-category is required.";
    if (!formData.quantity) newErrors.quantity = "Quantity is required.";
    if (!formData.pricePerUnit) newErrors.pricePerUnit = "Price per unit is required.";
    if (formData.images.length === 0) newErrors.images = "At least one image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    setIsAuthReady(false);
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log(formData)
        const response = await axios.post(
          "https://farmer-s-market-theta.vercel.app/server/farmer/addproduct",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        alert("Product added successfully!");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to add the product. Please try again.");
      }
    }
    setIsAuthReady(true);
  };

  return (
    <div className="form-container">
      <div className="farmtitle">
        <h2>List Your Product</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
          />
          {errors.productName && <span className="error">{errors.productName}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {Object.keys(farmProduceCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        {formData.category && (
          <div className="form-group">
            <label>Sub-Category</label>
            <select name="subCategory" value={formData.subCategory} onChange={handleInputChange}>
              <option value="">Select Sub-Category</option>
              {farmProduceCategories[formData.category].map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
            {errors.subCategory && <span className="error">{errors.subCategory}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Enter quantity (e.g., 10 kg)"
          />
          {errors.quantity && <span className="error">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label>Unit of Measurement</label>
          <select
            name="unit"
            value={formData.unit || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Unit</option>
            <option value="Kilograms">Kilograms (kg)</option>
            <option value="Liters">Liters</option>
            <option value="Quintals">Quintals</option>
          </select>
          {errors.unit && <span className="error">{errors.unit}</span>}
        </div>

        <div className="form-group">
          <label>Price per Unit</label>
          <input
            type="text"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleInputChange}
            placeholder="Enter price per unit (e.g., ₹50)"
          />
          {errors.pricePerUnit && <span className="error">{errors.pricePerUnit}</span>}
        </div>

        <div className="form-group">
          <label>Quality Grade</label>
          <select
            name="qualityGrade"
            value={formData.qualityGrade || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Quality Grade</option>
            <option value="Premium">Premium</option>
            <option value="Standard">Standard</option>
            <option value="Organic Certified">Organic Certified</option>
          </select>
          {errors.qualityGrade && <span className="error">{errors.qualityGrade}</span>}
        </div>

        <div className="items descs">
          <label>Description</label>
          <ReactQuill
            id="desc"
            name="description"
            value={formData.description}
            onChange={(value) => handleInputChange({ target: { name: "description", value } })}
            theme="snow"
            className="custom-editor"
          />
        </div>
        {errors.description && <span className="error">{errors.description}</span>}

        <div className="form-group">
          <label>Upload Images (Max: 3)</label>
          <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          {errors.images && <span className="error">{errors.images}</span>}
          <div className="image-previews">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index + 1}`} />
            ))}
          </div>
        </div>

        <h3>Farm Details</h3>

        <div className="form-group">
          <label>Farm Location - Full Address</label>
          <textarea
            name="farmAddress"
            value={formData.farmAddress || ""}
            onChange={handleInputChange}
            placeholder="Enter the full address of your farm"
          ></textarea>
          {errors.farmAddress && <span className="error">{errors.farmAddress}</span>}
        </div>

        <div className="form-group">
          <label>Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode || ""}
            onChange={handleInputChange}
            placeholder="Enter pincode"
          />
          {errors.pincode && <span className="error">{errors.pincode}</span>}
        </div>

        <div className="form-group">
          <label>District/State</label>
          <input
            type="text"
            name="districtState"
            value={formData.districtState || ""}
            onChange={handleInputChange}
            placeholder="Enter district/state"
          />
          {errors.districtState && <span className="error">{errors.districtState}</span>}
        </div>

        <h3>Availability</h3>

        <div className="form-group">
          <label>Available From</label>
          <input
            type="date"
            name="availableFrom"
            value={formData.availableFrom || ""}
            onChange={handleInputChange}
          />
          {errors.availableFrom && <span className="error">{errors.availableFrom}</span>}
        </div>

        <div className="form-group">
          <label>Available Until</label>
          <input
            type="date"
            name="availableUntil"
            value={formData.availableUntil || ""}
            onChange={handleInputChange}
          />
          {errors.availableUntil && <span className="error">{errors.availableUntil}</span>}
        </div>


        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FarmerProductForm;
