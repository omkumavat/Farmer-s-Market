import dealerProduct from '../Models/dealerProducts.js';
import { User } from '../Models/User.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { upload, uploadToCloudinary } from '../Database/Cloudinary.js';
import multer from 'multer';
dotenv.config();

export const validateProduct = (req, res, next) => {
  console.log(req.body);
  const {
    dealerid,
    title,
    price,
    category,
    serviceType,
    desc,
    images,
    quantity,
    size,
    largerSizeAvailable,
    smallerSizeAvailable,
    largerSizes,
    smallerSizes
  } = req.body;

  const errors = [];

  // if (!dealerid || !title || typeof title !== "string") errors.push("Title is required and must be a string.");
  // if (!price || typeof price !== "number" || !quantity) errors.push("Price is required and must be a number.");
  // if (!category || typeof category !== "string") errors.push("Category is required and must be a string.");
  // if (!serviceType || typeof serviceType !== "string") errors.push("Service Type is required and must be a string.");
  // if (!desc || typeof desc !== "string") errors.push("Description is required and must be a string.");
  // if (!Array.isArray(images) || images.length === 0) errors.push("Images must be an array with at least one image.");
  // if (!size || typeof size.value !== "number" || !size.unit) {
  //     errors.push("Size must be an object with a numeric value and a valid unit.");
  // }
  // if (typeof largerSizeAvailable !== "boolean") errors.push("Larger Size Available must be a boolean.");
  // if (typeof smallerSizeAvailable !== "boolean") errors.push("Smaller Size Available must be a boolean.");
  // if (largerSizeAvailable && !Array.isArray(largerSizes)) {
  //     errors.push("Larger Sizes must be an array if larger sizes are available.");
  // }
  // if (smallerSizeAvailable && !Array.isArray(smallerSizes)) {
  //     errors.push("Smaller Sizes must be an array if smaller sizes are available.");
  // }

  if (errors.length > 0) return res.status(400).json({ success: false, errors });

  next();
};

export const createProduct = async (req, res) => {
  try {
    const {
      dealerid,
      title,
      name,
      price,
      category,
      serviceType,
      desc,
      quantity,
      size,
      sizeUnit,
      largerSizeAvailable,
      smallerSizeAvailable,
      largerSizes,
      smallerSizes,
      images
    } = req.body;

    const imageUrls = [];

    for (let image of images) {
      const base64Image = image.split(';base64,').pop(); // Extract base64 string

      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
        folder: 'DealerProduct_images', // Optional: Cloudinary folder name
        use_filename: true, // Optional: Use original file name
        unique_filename: true, // Optional: Ensure a unique file name
      });

      // Save the image URL for reference
      imageUrls.push(uploadResponse.secure_url);
    }
    const newProduct = new dealerProduct({
      dealerid,
      title,
      name,
      price,
      category,
      serviceType,
      desc,
      sizeUnit,
      images: imageUrls, // Store Cloudinary URLs
      quantity,
      size,
      largerSizeAvailable,
      smallerSizeAvailable,
      largerSizes,
      smallerSizes,
    });

    const savedProduct = await newProduct.save();

    // Update dealer's product list
    const dealer = await User.findById(dealerid);
    if (!dealer) {
      return res.status(404).json({ success: false, message: 'Dealer not found' });
    }

    dealer.dealerProducts.push(savedProduct._id);
    await dealer.save();

    res.status(201).json({
      success: true,
      message: 'Product saved successfully',
      data: savedProduct,
    });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while saving the product',
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const filters = req.query; 
    const products = await dealerProduct.find(filters).populate("dealerid", "name email"); // Populate dealer details (name, email)
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products. Please try again." });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await dealerProduct.findById(id).populate("dealerid");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Failed to fetch product. Please try again." });
  }
};





export const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1000;
    console.log(limit)

    const products = await dealerProduct.find().limit(limit);

    return res.status(201).json({
      success: true,
      message: 'Product fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const  category  = req.query.category; 
    console.log(category);
    const products = await dealerProduct.find({ category }); 
    console.log(products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products by category" });
  }
};
