import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "../CSS/dealereditform.css";
import { boolean } from "yup";
import axios from "axios";
const DealerEditForm = ({ isOpen, onClose, product, onSubmit }) => {
  // console.log(product);
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
  const [smallerSizeAvailable, setSmallerSizeAvailable] = useState("");
  const [smallerSizes, setSmallerSizes] = useState([]);
  const [largerSizes, setLargerSizes] = useState([]);

  const handleSizeFieldChange = (arraySetter, index, field, value) => {
    arraySetter((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Add new size object to larger or smaller sizes
  const handleAddSize = (arraySetter) => {
    arraySetter((prev) => [
      ...prev,
      { price: "", quantity: "", unit: "", size: "" },
    ]);
  };

  // Remove a specific size object from larger or smaller sizes
  const handleRemoveSize = (arraySetter, index) => {
    arraySetter((prev) => prev.filter((_, i) => i !== index));
  };

  // Preset data for categories (you can replace this with real data)
  const categoryData = {
    "Seeds": ["Hybrid Seeds", "Organic Seeds", "Vegetable Seeds", "Fruit Seeds", "Cereal and Grain Seeds", "Pulses and Legume Seeds", "Oilseed Crops"],
    "Fertilizers": ["Organic Fertilizers", "Chemical Fertilizers", "Micronutrient Fertilizers", "Bio-Fertilizers"],
    "Pesticides and Herbicides": ["Insecticides", "Fungicides", "Herbicides", "Biological Control Agents"],
    "Agricultural Machinery and Tools": ["Tractors", "Power Tillers", "Harvesters", "Seed Drills", "Ploughs", "Cultivators", "Rotavators", "Sprayers", "Irrigation Systems"],
    "Livestock and Animal Farming Products": ["Farm Animals", "Animal Feed and Supplements", "Milking Machines", "Veterinary Equipment", "Animal Shelters"],
    "Post-Harvest Equipment": ["Threshers", "Storage Bins", "Grain Dryers", "Packing Machines", "Cold Storage Units"],
    "Farm Infrastructure": ["Greenhouse Kits", "Polyhouse Materials", "Shade Nets", "Fencing Materials", "Water Tanks", "Solar Panels for Farms"],
    "Irrigation Equipment": ["Pipes and Tubes", "Pumps", "Water Sprinklers", "Rain Guns", "Drip Tape and Emitters"],
    "Farm Produce Enhancement Products": ["Plant Growth Regulators", "Soil Conditioners", "Mulching Sheets", "Bio-Stimulants"],
    "Organic Farming Supplies": ["Natural Compost", "Organic Pest Control Solutions", "Organic Plant Nutrition Products"],
    "Dairy and Allied Products": ["Milk Chillers", "Pasteurizers", "Butter Churners", "Cheese Making Kits"],
    "Miscellaneous Products": ["Agricultural Drones", "Soil Testing Kits", "Weather Monitoring Equipment", "Farm Safety Gear", "Farm Software or IoT Devices"]
  };


  const handleTitle = (e) => setTitle(e.target.value);
  const handleIndustry = (e) => setIndustry(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleSize = (e) => setSize(e.target.value);
  const handleSizeUnit = (e) => setSizeUnit(e.target.value);
  const handleQuantity = (e) => setQuantity(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleServiceType = (e) => setServiceType(e.target.value);
  const handleImagesChange = async (event) => {
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
    }
  };
  const handleDescriptionChange = (value) => setDesc(value);
  const handleLargerSizeChange = (e) => setLargerSizeAvailable(e.target.value);
  const handleSmallerSizeChange = (e) => setSmallerSizeAvailable(e.target.value);

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
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
      largerSizeAvailable,
      smallerSizeAvailable,
      smallerSizes,
      largerSizes
    };
    const res = await axios.put(`https://farmer-dealer-user.vercel.app/server/dealer/updateproduct/${product._id}`,updatedProduct);
    // console.log(res.data);
    onClose();
  };

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setIndustry(product.name);
      setPrice(product.price);
      setSize(product.size);
      setSizeUnit(product.sizeUnit);
      setQuantity(product.quantity);
      setCategory(product.category);
      setServiceType(product.serviceType);
      setImages(product.images || []);
      setDesc(product.desc || "");
      setLargerSizeAvailable(product.largerSizeAvailable);
      setSmallerSizeAvailable(product.smallerSizeAvailable);
      setLargerSizes(product.largerSizes || []);
      setSmallerSizes(product.smallerSizes || []);
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
                <option value="kgs">kg</option>
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
                checked={largerSizeAvailable === true || largerSizeAvailable === "yes"}
                onChange={handleLargerSizeChange}
                className="form-radio"
              />
              <label htmlFor="largerYes">Yes</label>
              <input
                type="radio"
                id="largerNo"
                name="largerSize"
                value="no"
                checked={largerSizeAvailable === false || largerSizeAvailable === "no"}
                onChange={handleLargerSizeChange}
                className="form-radio"
              />
              <label htmlFor="largerNo">No</label>
            </div>

            <div className="form-group">
              <label>Smaller Sizes Available?</label>
              <input
                type="radio"
                id="smallerYes"
                name="smallerSize"
                value="yes"
                checked={smallerSizeAvailable === true || smallerSizeAvailable === "yes"}
                onChange={handleSmallerSizeChange}
                className="form-radio"
              />
              <label htmlFor="smallerYes">Yes</label>
              <input
                type="radio"
                id="smallerNo"
                name="smallerSize"
                value="no"
                checked={smallerSizeAvailable === false || smallerSizeAvailable === "no"}
                onChange={handleSmallerSizeChange}
                className="form-radio"
              />
              <label htmlFor="smallerNo">No</label>
            </div>
            <div className="size-section">
              <h3>Larger Sizes</h3>
              {largerSizes.map((sizeObj, index) => (
                <div key={index} className="size-item">
                  <input
                    type="number"
                    placeholder="Price"
                    value={sizeObj.price}
                    onChange={(e) =>
                      handleSizeFieldChange(setLargerSizes, index, "price", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={sizeObj.quantity}
                    onChange={(e) =>
                      handleSizeFieldChange(setLargerSizes, index, "quantity", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Size"
                    value={sizeObj.size}
                    onChange={(e) =>
                      handleSizeFieldChange(setLargerSizes, index, "size", e.target.value)
                    }
                  />
                  <select
                    id="size-unit"
                    name="sizeUnit"
                    value={sizeObj.unit}
                    onChange={(e) =>
                      handleSizeFieldChange(setLargerSizes, index, "unit", e.target.value)
                    }
                    className="form-select"
                    required
                  >
                    <option value="">Select Unit</option>
                    <option value="kgs">kg</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(setLargerSizes, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddSize(setLargerSizes)}
              >
                Add Larger Size
              </button>
            </div>

            {/* Smaller Sizes */}
            <div className="size-section">
              <h3>Smaller Sizes</h3>
              {smallerSizes.map((sizeObj, index) => (
                <div key={index} className="size-item">
                  <input
                    type="number"
                    placeholder="Price"
                    value={sizeObj.price}
                    onChange={(e) =>
                      handleSizeFieldChange(setSmallerSizes, index, "price", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={sizeObj.quantity}
                    onChange={(e) =>
                      handleSizeFieldChange(setSmallerSizes, index, "quantity", e.target.value)
                    }
                  />

                  <input
                    type="text"
                    placeholder="Size"
                    value={sizeObj.size}
                    onChange={(e) =>
                      handleSizeFieldChange(setSmallerSizes, index, "size", e.target.value)
                    }
                  />
                  <select
                    id="size-unit"
                    name="sizeUnit"
                    value={sizeObj.unit}
                    onChange={(e) =>
                      handleSizeFieldChange(setSmallerSizes, index, "unit", e.target.value)
                    }
                    className="form-select"
                    required
                  >
                    <option value="">Select Unit</option>
                    <option value="kgs">kg</option>
                    <option value="g">g</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(setSmallerSizes, index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddSize(setSmallerSizes)}
              >
                Add Smaller Size
              </button>
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
