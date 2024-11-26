import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "../CSS/dealereditform.css";

const DealerEditForm = ({ isOpen, onClose, product, onSubmit }) => {

  const [title, setTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [sizeUnit, setSizeUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState("");
  const [largerSizeAvailable, setLargerSizeAvailable] = useState("");
  
  // Preset data for categories (you can replace this with real data)
  const categoryData = {
    "Electronics": ["Repair", "Service"],
    "Furniture": ["Cleaning", "Assembly"],
    // Add more categories as needed
  };


  const handleTitle = (e) => setTitle(e.target.value);
  const handleIndustry = (e) => setIndustry(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  const handleSizeUnit = (e) => setSizeUnit(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleServiceType = (e) => setServiceType(e.target.value);
  const handleImagesChange = (e) => setImages([...e.target.files].map(file => URL.createObjectURL(file)));
  const handleDescriptionChange = (value) => setDesc(value);
  const handleLargerSizeChange = (e) => setLargerSizeAvailable(e.target.value);

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      title,
      industry,
      price,
      size,
      sizeUnit,
      quantity,
      category,
      serviceType,
      images,
      desc,
      largerSizeAvailable
    };
    onSubmit(updatedProduct);
    onClose(); // Close modal after submit
  };

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setIndustry(product.industry);
      setPrice(product.price);
      setSize(product.size);
      setSizeUnit(product.sizeUnit);
      setQuantity(product.quantity);
      setCategory(product.category);
      setServiceType(product.serviceType);
      setImages(product.images || []);
      setDesc(product.desc || "");
      setLargerSizeAvailable(product.largerSizeAvailable || "");
    }
  }, [product]);
  if (!isOpen) return null;

  return (
    <div className="product-edit-modal">
      <div className="product-edit-form-wrapper">
        <form onSubmit={handleSubmit}>
          <h2 className="product-edit-form-title">Edit Product</h2>
            <div className="modal">
          {/* Title Field */}
          <div className="efirst">
          <div className="formgroup1">
            <label htmlFor="title" className="form-label">Product Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={handleTitle}
              className="form-input"
              required
              placeholder="Enter product title"
            />
          </div>

          {/* Industry Name Field */}
          <div className="formgroup1">
            <label htmlFor="industry" className="form-label">Industry Name</label>
            <input
              id="industry"
              name="industry"
              type="text"
              value={industry}
              onChange={handleIndustry}
              className="form-input"
              required
              placeholder="Enter Industry Name"
            />
          </div>
          <div className="formgroup1">
            <label htmlFor="price" className="form-label">Product Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={price}
              onChange={handlePrice}
              className="form-input"
              required
              placeholder="Enter product price"
            />
          </div>
          </div>

          {/* Price Field */}
        

          {/* Size Field */}
          <div className="form-group size-unit-field">
            <label htmlFor="size" className="form-label">Product Size</label>
            <input
              id="size"
              name="size"
              type="number"
              value={size}
              onChange={handleSize}
              className="form-input"
              required
              placeholder="Enter product size"
            />
            <select
              id="size-unit"
              name="sizeUnit"
              value={sizeUnit}
              onChange={handleSizeUnit}
              className="form-select"
              required
            >
              <option value="">Select Unit</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="m">m</option>
            </select>
          </div>

          {/* Quantity Field */}
          <div className="form-group">
            <label htmlFor="quantity" className="form-label">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={quantity}
              onChange={handleQuantity}
              className="form-input"
              required
              placeholder="Enter product quantity"
            />
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategory}
              className="form-select"
              required
            >
              <option value="">Select a Category</option>
              {Object.keys(categoryData).map((categoryKey) => (
                <option key={categoryKey} value={categoryKey}>
                  {categoryKey}
                </option>
              ))}
            </select>
          </div>

          {/* Service Type Selection */}
          {category && (
            <div className="form-group">
              <label htmlFor="service" className="form-label">Service Type</label>
              <select
                id="service"
                name="service"
                value={serviceType}
                onChange={handleServiceType}
                className="form-select"
                required
              >
                <option value="">Select a Service Type</option>
                {categoryData[category]?.map((service, index) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="images" className="form-label">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImagesChange}
              className="form-input-file"
              accept="image/*"
            />
            <div className="image-previews">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Preview ${index + 1}`} className="image-preview" />
              ))}
            </div>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="desc" className="form-label">Description</label>
            <ReactQuill
              id="desc"
              value={desc}
              theme="snow"
              onChange={handleDescriptionChange}
              className="quill-editor"
            />
          </div>

          {/* Larger Size Option */}
          <div className="form-group">
            <label>Larger Sizes Available?</label>
            <input
              type="radio"
              id="largerYes"
              name="largerSize"
              value="yes"
              checked={largerSizeAvailable === 'yes'}
              onChange={handleLargerSizeChange}
              className="form-radio"
            />
            <label htmlFor="largerYes">Yes</label>
            <input
              type="radio"
              id="largerNo"
              name="largerSize"
              value="no"
              checked={largerSizeAvailable === 'no'}
              onChange={handleLargerSizeChange}
              className="form-radio"
            />
            <label htmlFor="largerNo">No</label>
          </div>

          {/* Cancel and Submit Buttons */}
          <div className="form-buttons">
            <button type="button" onClick={handleCancel} className="form-button-cancel">
              Cancel
            </button>
            <button type="submit" className="form-button-submit">
              Submit
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DealerEditForm;
