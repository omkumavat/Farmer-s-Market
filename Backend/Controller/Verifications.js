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

export const getVerificationStatus = async (req, res) => {
    const  userId  = req.params.id;
    // // // console.log(userId);

    try {
        const verification = await Verification.findOne({ userId });

        if (!verification) {
            return res.status(404).json({ isSubmitted:false });
        }

        res.status(200).json({
            status:verification.status,
            isSubmitted: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching verification status', error });
    }
};

export const approveVerifiedUser = async (req, res) => {
    const  userId  = req.params.id;
    // // console.log(userId);

    try {
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { verified: true },
            { new: true }
          );
      
          if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
          }
      
          const updatedVeri = await Verification.findOneAndUpdate(
            { userId: userId }, // Find the verification by userId
            { status: "Approved" }, // Update the status to "Approved"
            { new: true } // Return the updated document
          );
      
          if (!updatedVeri) {
            return res.status(404).json({ message: "Verification not found" });
          }
      

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User verified successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating user verification:", error);
        res.status(500).json({ message: "Internal server error" });
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
        // // console.log(req.body);
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