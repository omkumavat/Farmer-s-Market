import FarmerProduct from "../Models/farmerProducts.js";
import { User } from '../Models/User.js';
import cloudinary from 'cloudinary';
import { upload, uploadToCloudinary } from '../Database/Cloudinary.js';

export const createProduct = async (req, res) => {
    try {
        console.log(req.body);
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
            images
        } = req.body;

        const imageUrls = [];

        for (let image of images) {
            let base64Image; // Change `const` to `let` to allow reassignment

            if (typeof image === 'string' && image.startsWith('data:image')) {
                // Split the base64 string to extract the image data (after 'data:image/png;base64,')
                base64Image = image.split(',')[1]; // Extract the base64 string from the image
            } else {
                // Handle the case where the image is not a base64 string, assuming it's a file path or URL
                base64Image = image; // If not a base64, you need to upload directly (this is a placeholder for your actual file handling logic)
            }

            try {
                // Upload the image to Cloudinary
                const uploadResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                    folder: 'FarmerProduct_images', // Optional: Cloudinary folder name
                    use_filename: true, // Optional: Use original file name
                    unique_filename: true, // Optional: Ensure a unique file name
                });

                // Save the image URL for reference
                imageUrls.push(uploadResponse.secure_url);
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                // Handle any errors you encounter during the upload
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
            images: imageUrls,
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
