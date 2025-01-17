import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../DashboardCSS/productform.css";
import { useAuth } from "../Context/AuthContext";
import axios from 'axios';

const ProductForm = () => {
    const { currentUser } = useAuth();
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(null);
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState("");
    const [sizeUnit, setSizeUnit] = useState("");
    const [largerSizeAvailable, setLargerSizeAvailable] = useState(false);
    const [smallerSizeAvailable, setSmallerSizeAvailable] = useState(false);
    const [largerSizes, setLargerSizes] = useState([]);
    const [smallerSizes, setSmallerSizes] = useState([]);
    const [images, setImages] = useState([]);

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

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleLargerSizeQuantityChange = (index, field, value) => {
        const updatedSizes = [...largerSizes];
        updatedSizes[index][field] = value;
        setLargerSizes(updatedSizes);
    };

    const handleSmallerSizeQuantityChange = (index, field, value) => {
        const updatedSizes = [...smallerSizes];
        updatedSizes[index][field] = value;
        setSmallerSizes(updatedSizes);
    };

    const addLargerSize = () => {
        const newSize = { quantity: "", price: "", size: "", unit: "" };
        setLargerSizes((prev) => [...prev, newSize]);
    };

    const addSmallerSize = () => {
        const newSize = { quantity: "", price: "", size: "", unit: "" };
        setSmallerSizes((prev) => [...prev, newSize]);
    };

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const removeLargerSize = (index) => {
        const updatedSizes = largerSizes.filter((_, i) => i !== index);
        setLargerSizes(updatedSizes);
    };

    const removeSmallerSize = (index) => {
        const updatedSizes = smallerSizes.filter((_, i) => i !== index);
        setSmallerSizes(updatedSizes);
    };

    const handleImages = async (event) => {
        const files = event.target.files;

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

        setImages((prev) => [...prev, ...imageArray].slice(0, 3)); // Only allow 3 images
    };

    const handleQuillChange = (value) => {
        setDesc(value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setServiceType("");
    };

    const handleSizeChange = (event) => {
        setSize(event.target.value);
    };

    const handleServiceType = (event) => {
        setServiceType(event.target.value);
    };

    const handleSizeUnitChange = (event) => {
        setSizeUnit(event.target.value);
    };

    const handleLargerSizeChange = (event) => {
        setLargerSizeAvailable(event.target.value === "yes");
    };

    const handleSmallerSizeChange = (event) => {
        setSmallerSizeAvailable(event.target.value === "yes");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            title,
            name,
            category,
            serviceType,
            size,
            quantity,
            sizeUnit,
            desc,
            price,
            images,
            largerSizeAvailable,
            smallerSizeAvailable,
            largerSizes,
            smallerSizes,
            dealerid: currentUser._id,
        };
        console.log(payload);

        try {
            const response = await axios.post(
                "https://farmer-s-market-theta.vercel.app/server/dealer/addproduct",
                payload,
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
    };


    return (
        <>
            <div className="formContainer">
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <h2 className="formTitle">Add New Product</h2>

                        {/* Title Field */}
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" onChange={handleTitle} required placeholder="Enter product title" />
                        </div>

                        <div>
                            <label htmlFor="name">Industry Name</label>
                            <input id="name" name="name" type="text" onChange={handleName} required placeholder="Enter Industry Name" />
                        </div>

                        {/* Price Field */}
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" onChange={handlePrice} required placeholder="Enter product price" />
                        </div>

                        <div className="item">
                            <label htmlFor="size">Size</label>
                            <input
                                id="size"
                                name="size"
                                type="number"
                                value={size}
                                onChange={handleSizeChange}
                                required
                                placeholder="Enter product size"
                            />
                            <select id="sizeUnit" value={sizeUnit} onChange={handleSizeUnitChange} required>
                                <option value="">Select Unit</option>
                                <option value="kgs">kg</option>
                                <option value="gms">g</option>
                                <option value="mls">ml</option>
                                <option value="Ltrs">l</option>
                                <option value="mm">mm</option>
                                <option value="cm">cm</option>
                                <option value="m">m</option>
                            </select>
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                // value={}
                                onChange={handleQuantityChange}
                                required
                                placeholder="Enter product Quantity"
                            />
                        </div>

                        {/* Category Selection */}
                        <div className="item">
                            <label htmlFor="category">Category</label>
                            <select id="category" value={category} onChange={handleCategoryChange} required>
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
                            <div className="item">
                                <label htmlFor="service">Service Type</label>
                                <select
                                    id="service"
                                    value={serviceType}
                                    onChange={handleServiceType}
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

                        <div className="item">
                            <label htmlFor="images">Images</label>
                            <input type="file" id="images" name="images" multiple onChange={handleImages} accept="image/*" />
                            <div className="imagePreviews">
                                {images.map((img, index) => (
                                    <img key={index} src={img} alt={`Uploaded preview ${index + 1}`} className="imagePreview" />
                                ))}
                            </div>
                        </div>

                        {/* Size Field */}

                        {/* Larger Sizes */}
                        <div className="item">
                            <label>Larger Sizes Available?</label>
                            <input
                                type="radio"
                                id="largerYes"
                                name="largerSize"
                                value="yes"
                                onChange={handleLargerSizeChange}
                            />
                            <label htmlFor="largerYes">Yes</label>
                            <input
                                type="radio"
                                id="largerNo"
                                name="largerSize"
                                value="no"
                                onChange={handleLargerSizeChange}
                            />
                            <label htmlFor="largerNo">No</label>
                        </div>

                        {largerSizeAvailable &&
                            largerSizes.map((size, index) => (
                                <div key={index} className="item">
                                    <input
                                        type="number"
                                        value={size.quantity}
                                        onChange={(e) =>
                                            handleLargerSizeQuantityChange(index, "quantity", e.target.value)
                                        }
                                        placeholder="Quantity"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={size.price}
                                        onChange={(e) =>
                                            handleLargerSizeQuantityChange(index, "price", e.target.value)
                                        }
                                        placeholder="Price"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={size.size}
                                        onChange={(e) =>
                                            handleLargerSizeQuantityChange(index, "size", e.target.value)
                                        }
                                        placeholder="Size"
                                        required
                                    />
                                    <select
                                        value={size.unit}
                                        onChange={(e) =>
                                            handleLargerSizeQuantityChange(index, "unit", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="Kgs">kg</option>
                                        <option value="Gms">g</option>
                                        <option value="Mls">ml</option>
                                        <option value="Ltrs">l</option>
                                        <option value="mm">mm</option>
                                        <option value="cm">cm</option>
                                        <option value="m">m</option>
                                    </select>
                                    <button type="button" onClick={() => removeLargerSize(index)}>
                                        Cancel
                                    </button>
                                </div>
                            ))
                        }
                        {largerSizeAvailable && (
                            <button type="button" onClick={addLargerSize}>
                                Add More Larger Sizes
                            </button>
                        )}

                        {/* Larger Sizes */}
                        <div className="item">
                            <label>Smaller Sizes Available?</label>
                            <input
                                type="radio"
                                id="smallerNo"
                                name="smallerSize"
                                value="yes"
                                onChange={handleSmallerSizeChange}
                            />
                            <label htmlFor="largerYes">Yes</label>
                            <input
                                type="radio"
                                id="smallerNo"
                                name="smallerSize"
                                value="no"
                                onChange={handleSmallerSizeChange}
                            />
                            <label htmlFor="largerNo">No</label>
                        </div>

                        {smallerSizeAvailable &&
                            smallerSizes.map((size, index) => (
                                <div key={index} className="item">
                                    <input
                                        type="number"
                                        value={size.quantity}
                                        onChange={(e) =>
                                            handleSmallerSizeQuantityChange(index, "quantity", e.target.value)
                                        }
                                        placeholder="Quantity"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={size.price}
                                        onChange={(e) =>
                                            handleSmallerSizeQuantityChange(index, "price", e.target.value)
                                        }
                                        placeholder="Price"
                                        required
                                    />
                                    <input
                                        type="number"
                                        value={size.size}
                                        onChange={(e) =>
                                            handleSmallerSizeQuantityChange(index, "size", e.target.value)
                                        }
                                        placeholder="Size"
                                        required
                                    />
                                    <select
                                        value={size.unit}
                                        onChange={(e) =>
                                            handleSmallerSizeQuantityChange(index, "unit", e.target.value)
                                        }
                                        required
                                    >
                                        <option value="Kg">kg</option>
                                        <option value="Gms">g</option>
                                        <option value="Mls">ml</option>
                                        <option value="Ltrs">l</option>
                                        <option value="mm">mm</option>
                                        <option value="cm">cm</option>
                                        <option value="m">m</option>
                                    </select>
                                    <button type="button" onClick={() => removeSmallerSize(index)}>
                                        Cancel
                                    </button>
                                </div>
                            ))
                        }

                        {smallerSizeAvailable && (
                            <button type="button" onClick={addSmallerSize}>
                                Add More Smaller Sizes
                            </button>
                        )}

                        {/* Description Field */}
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill id="desc" value={desc} theme="snow" onChange={handleQuillChange} />
                        </div>

                        {/* Submit Button */}
                        <button className="sendButton" type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ProductForm;
