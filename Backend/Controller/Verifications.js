import { User, Verification } from '../Models/User.js';
import { uploadToCloudinary } from '../Database/Cloudinary.js';
// Get all verifications
export const getVerifications = async (req, res) => {
    try {
        const verifications = await Verification.find();
        res.json(verifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getVerificationbyId = async (req, res) => {
    try {
        const verification = await Verification.findById(req.params.id);
        if (!verification) return res.status(404).json({ message: 'Verification not found' });
        await verification.save();
        res.json({ message: 'Verification approved', verification });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const postVerifications = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, mobileno, location, userId } = req.body;


        const fileBuffer = req.file.buffer;
        const folder = 'verification_images';
        const quality = 'auto'; // You can specify quality, like 'auto' or a number
        const width = 500; // Resize width if needed
        const height = 500; // Resize height if needed

        const result = await uploadToCloudinary(fileBuffer, folder, quality, width, height);

        // Store form data (you can save it to a database here)
        const verificationData = new Verification({
            name,
            email,
            mobileno,
            location,
            userId,
            licenseImage: result.secure_url, // Cloudinary URL
        });

        await verificationData.save();

        // You can save this data to your database here

        res.status(200).json({
            message: "Form submitted successfully",
            data: verificationData,
        });
    } catch (error) {
        console.error("Error in verification controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};