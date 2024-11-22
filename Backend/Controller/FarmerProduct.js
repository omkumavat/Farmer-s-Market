import FarmerProduct from "../Models/farmerProducts";
import { User } from "../Models/User.js";
import cloudinary from 'cloudinary';
import { upload, uploadToCloudinary } from '../Database/Cloudinary.js';
// Controller to create a new product
const createProduct = async (req, res) => {
    try {
        const {
            productName,
            category,
            subCategory,
            quantity,
            pricePerUnit,
            description,
            qualityGrade,
            unit,
            farmAddress,
            pincode,
            districtState,
            availableFrom,
            availableUntil,
            userId,
        } = req.body;

        // Handle image upload to Cloudinary
        const uploadedImages = [];
        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                const image = req.files[i];
                const uploadedImage = await cloudinary.uploader.upload(image.path);
                uploadedImages.push(uploadedImage.secure_url); // Add the secure URL of the uploaded image
            }
        }

        // Create new product document
        const newProduct = new FarmerProduct({
            productName,
            category,
            subCategory,
            quantity,
            pricePerUnit,
            description,
            images: uploadedImages,
            qualityGrade,
            unit,
            farmAddress,
            pincode,
            districtState,
            availableFrom,
            availableUntil,
            userId,
        });

        const savedProduct = await newProduct.save();
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Dealer not found' });
        }

        user.farmerProducts.push(savedProduct._id);
        await user.save();
        res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { createProduct };
