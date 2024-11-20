import dealerProduct from '../Models/dealerProducts.js';
import User from '../Models/User.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import { upload } from '../Database/Cloudinary.js';
import multer from 'multer';
dotenv.config();

const storage = multer.memoryStorage(); // Store files in memory as buffers
export const uploadMiddleware = multer({ storage });

async function uploadToCloudinary(fileBuffer, folder, quality, width, height) {
  const options = {
    folder,
    resource_type: 'auto',
    transformation: [
      {
        width: width || undefined,
        height: height || undefined,
        crop: 'limit',
      },
    ],
    quality,
  };

  try {
    const result = await cloudinary.uploader.upload_stream(options);
    return new Promise((resolve, reject) => {
      const stream = cloudinary.v2.uploader.upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
      stream.end(fileBuffer); // Send file buffer to Cloudinary
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
}

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
      price,
      category,
      serviceType,
      desc,
      quantity,
      size,
      largerSizeAvailable,
      smallerSizeAvailable,
      largerSizes,
      smallerSizes,
      images
    } = req.body;

    const imageBuffers = req.body.images.map((file) => file.buffer);

    // Upload images to Cloudinary
    const uploadPromises = imageBuffers.map((fileBuffer) =>
      uploadToCloudinary(fileBuffer, 'FileFolder', 30, 500, 500)
    );
    const uploadResults = await Promise.all(uploadPromises);
    const uploadedUrls = uploadResults.map((result) => result.secure_url);
    console.log(uploadedUrls);

    // Create new product with uploaded image URLs
    const newProduct = new dealerProduct({
      dealerid,
      title,
      price,
      category,
      serviceType,
      desc,
      images: uploadedUrls, // Store Cloudinary URLs
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
    const filters = req.query; // Extract filters from query parameters
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
    const product = await dealerProduct.findById(id).populate("dealerid", "name email");
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
    // Get the limit from the query parameter (default to 6 if not provided)
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