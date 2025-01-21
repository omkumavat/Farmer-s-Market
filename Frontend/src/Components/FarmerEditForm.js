import React from "react";
import { useAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import ReactQuill from "react-quill";
import axios from "axios";

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

const FarmerEditForm = ({ isOpen, onClose, product, onSubmit }) => {

    const [productName, setproductName] = useState("");
    const [pricePerUnit, setpricePerUnit] = useState("");
    const [size, setSize] = useState("");
    const [unit, setUnit] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setsubCategory] = useState("");
    const [images, setImages] = useState([]);
    const [description, setdescription] = useState("");
    const [farmAddress, setfarmAddress] = useState("");
    const [qualityGrade, setqualityGrade] = useState("");
    const [pincode, setpincode] = useState("");
    const [availableFrom, setAvailableFrom] = useState(null);
    const [availableUntil, setAvailableUntil] = useState(null);
    const [districtState, setdistrictState] = useState("");
    const [errors, setErrors] = useState({});
    const [imagePreviews, setImagePreviews] = useState([]);

    const { currentUser } = useAuth();
    const [isAuthReady, setIsAuthReady] = useState(false);
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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.productName) newErrors.productName = "Product name is required.";
        if (!formData.category) newErrors.category = "Category is required.";
        if (!formData.subCategory) newErrors.subCategory = "Sub-category is required.";
        if (!formData.quantity) newErrors.quantity = "Quantity is required.";
        if (!formData.pricePerUnit) newErrors.pricePerUnit = "Price per unit is required.";
        if (formData.images.length === 0) newErrors.images = "At least one image is required.";
        setErrors(newErrors);
    }

    const handleTitle = (e) => setproductName(e.target.value);
    const handlequality = (e) => setqualityGrade(e.target.value);
    const handlePrice = (e) => setpricePerUnit(e.target.value);
    const handleSize = (e) => setSize(e.target.value);
    const handleSizeUnit = (e) => setUnit(e.target.value);
    const handleQuantity = (e) => setQuantity(e.target.value);
    const handleCategory = (e) => setCategory(e.target.value);
    const handleServiceType = (e) => setsubCategory(e.target.value);
    const handlepincode = (e) => setpincode(e.target.value);
    const handlefarm = (e) => setfarmAddress(e.target.value);
    const handleavaifrom = (e) => setAvailableFrom(e.target.value);
    const handleavaiuntil = (e) => setAvailableUntil(e.target.value);
    const handleDescription = (value) => setdescription(value);
    const handlestate = (e) => setdistrictState(e.target.value);
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

    const handleCancel = () => {
        onClose();
    };

    const handleSubmit = async (e) => {
        setIsAuthReady(false);
        e.preventDefault();
        const cleanText = description
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
        const updatedProduct = {
            productName,
            pricePerUnit,
            size,
            unit,
            quantity,
            category,
            subCategory,
            images,
            description,
            farmAddress,
            availableFrom,
            qualityGrade,
            availableUntil,
            pincode,
            districtState
        };
        console.log(updatedProduct)
            try {
                console.log("rrr", updatedProduct)
                const response = await axios.put(
                    `http://localhost:4000/server/farmer/updateproduct/${product._id}`,
                    updatedProduct,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log("Response:", response.data.updatedProduct);
                alert("Product added successfully!");
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("Failed to add the product. Please try again.");
            }
        setIsAuthReady(true);
    };

    useEffect(() => {
        if (product) {
            setproductName(product.productName);
            setfarmAddress(product.farmAddress);
            setpricePerUnit(product.pricePerUnit);
            setSize(product.size);
            setUnit(product.unit);
            setQuantity(product.quantity);
            setCategory(product.category);
            setsubCategory(product.subCategory);
            setImages(product.images || []);
            const cleanText = product.description
            .replace(/<strong>(.*?)<\/strong>/g, '$1') 
            .replace(/<ul>/g, '') 
            .replace(/<\/ul>/g, '\n') // Replace </ul> with a new line for list
            .replace(/<ol>/g, '') // Remove <ol> tags
            .replace(/<\/ol>/g, '\n') // Replace </ol> with a new line for ordered list
            .replace(/<li>/g, '') // Remove <li> tags
            .replace(/<\/li>/g, '\n- ') // Replace </li> with a new line and bullet point
            .replace(/<h3>/g, '\n\n') // Add line breaks before headers
            .replace(/<\/h3>/g, '\n') // Add line breaks after headers
            .replace(/<br>/g, '\n')
            .replace(/<[^>]+>/g, '');
            setdescription(cleanText || "");
            setpincode(product.pincode);
            setAvailableFrom(product.availableFrom);
            setAvailableUntil(product.availableUntil || []);
            setdistrictState(product.districtState || []);
        }
    }, [product]);

    useEffect(() => {
        if (currentUser !== undefined) {
            setIsAuthReady(true); // Mark as ready once currentUser is loaded
        }
    }, [currentUser]);

    if (!isAuthReady) {
        return <Loader />;
    }
    if (!isOpen) return null;


    return (
        <>
            <div className="product-edit-modal">
                <div className="product-edit-form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="modal">
                            <div className="product-edit-form-title">
                                <h2>Edit Your Product</h2>
                            </div>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    name="productName"
                                    value={productName}
                                    onChange={handleTitle}
                                    placeholder="Enter product name"
                                />
                                {errors.productName && <span className="error">{errors.productName}</span>}
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select name="category" value={category} onChange={handleCategory}>
                                    <option value="">Select Category</option>
                                    {Object.keys(farmProduceCategories).map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <span className="error">{errors.category}</span>}
                            </div>

                            {product && product.category && (
                                <div className="form-group">
                                    <label>Sub-Category</label>
                                    <select name="subCategory" value={subCategory} onChange={handleServiceType}>
                                        <option value="">Select Sub-Category</option>
                                        {farmProduceCategories[category].map((subCat) => (
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
                                    value={quantity}
                                    onChange={handleQuantity}
                                    placeholder="Enter quantity (e.g., 10 kg)"
                                />
                                {errors.quantity && <span className="error">{errors.quantity}</span>}
                            </div>

                            <div className="form-group">
                                <label>Unit of Measurement</label>
                                <select
                                    name="unit"
                                    value={unit || ""}
                                    onChange={handleSizeUnit}
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
                                    value={pricePerUnit}
                                    onChange={handlePrice}
                                    placeholder="Enter price per unit (e.g., ₹50)"
                                />
                                {errors.pricePerUnit && <span className="error">{errors.pricePerUnit}</span>}
                            </div>

                            <div className="form-group">
                                <label>Quality Grade</label>
                                <select
                                    name="qualityGrade"
                                    value={qualityGrade || ""}
                                    onChange={handlequality}
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
                                    value={description || ""}
                                    onChange={handleDescription}
                                    theme="snow"
                                    className="custom-editor"
                                />
                            </div>
                            {errors.description && <span className="error">{errors.description}</span>}

                            <div className="form-group">
                                <label>Upload Images (Max: 3)</label>
                                <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
                                {errors.images && <span className="error">{errors.images}</span>}
                                <div className="image-previews">
                                    {images.map((src, index) => (
                                        <img key={index} src={src} alt={`Preview ${index + 1}`} />
                                    ))}
                                </div>
                            </div>

                            <h3>Farm Details</h3>

                            <div className="form-group">
                                <label>Farm Location - Full Address</label>
                                <textarea
                                    name="farmAddress"
                                    value={farmAddress}
                                    onChange={handlefarm}
                                    placeholder="Enter the full address of your farm"
                                ></textarea>
                                {errors.farmAddress && <span className="error">{errors.farmAddress}</span>}
                            </div>

                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={pincode || ""}
                                    onChange={handlepincode}
                                    placeholder="Enter pincode"
                                />
                                {errors.pincode && <span className="error">{errors.pincode}</span>}
                            </div>

                            <div className="form-group">
                                <label>District/State</label>
                                <input
                                    type="text"
                                    name="districtState"
                                    value={districtState || ""}
                                    onChange={handlestate}
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
                                    value={availableFrom || ""}
                                    onChange={handleavaifrom}
                                />
                                {errors.availableFrom && <span className="error">{errors.availableFrom}</span>}
                            </div>

                            <div className="form-group">
                                <label>Available Until</label>
                                <input
                                    type="date"
                                    name="availableUntil"
                                    value={availableUntil || ""}
                                    onChange={handleavaiuntil}
                                />
                                {errors.availableUntil && <span className="error">{errors.availableUntil}</span>}
                            </div>


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
        </>
    );
};

export default FarmerEditForm;