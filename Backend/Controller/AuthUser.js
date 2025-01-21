import bcrypt from 'bcryptjs';
import { User } from '../Models/User.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Seller from '../Models/Seller.js';
dotenv.config();
import { uploadToCloudinary } from '../Database/Cloudinary.js';
// Sign up route handler
export const signup = async (req, res) => {
    try {
        // get data
        // // // console.log("alll ", req.body);
        const { name, email, mobileno, password, confirmpassword, role } = req.body.userData;
        // // // console.log(name);
        // check if user already exist 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists",
            })
        }

        // Secured password 
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        
        let users = await User.create({
            name, email, mobileno, password: hashedPassword, confirmpassword: hashedPassword, role
        });

        const newSeller = new Seller({
            name: name,
            email: email,
            userId: users._id 
        });

        await newSeller.save();
        // // // console.log(newSeller._id);

        users.sellerId=newSeller._id;
        await users.save();

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            data: users
        });
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "User cannot be register,Please try again later",
        })
    }
}

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully",
            })
        }

        // check for register user 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }

        // Verify password & generate a JWT token

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };


        if (await bcrypt.compare(password, user.password)) {
            // password match
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            });
        }
        else {
            // password not match
            return res.status(403).json({
                success: false,
                message: "Password does not match",
            })
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message: "Login false"
        })
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Failed to fetch product. Please try again." });
    }
};

export const verifyPassword = async (req, res) => {
    // // // console.log(req.body)
    const { userId, oldPassword } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(oldPassword, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        // // // console.log(user.password)
        // // // console.log(oldPassword)
        // // // console.log(isMatch)
        if (isMatch) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying password' });
    }
};


export const updateProfile = async (req, res) => {
    // // // console.log(req.body)
    // // // console.log(req.params);
    const { id } = req.params; // Assuming you're using userId from URL params
    const { name, email, mobileno, password } = req.body; // Form data (excluding file upload)
    try {
        // Find the user by ID
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the user wants to update the password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
            user.confirmpassword = hashedPassword;
        }

        // Update user details (name, email, mobileno)
        if (name) user.name = name;
        if (email) user.email = email;
        if (mobileno) user.mobileno = mobileno;


        
        if (req.file) { // Assuming you use something like multer for file upload
            const fileBuffer = req.file.buffer;
            const folder = 'user_images';
            const quality = 'auto'; // You can specify quality, like 'auto' or a number
            const width = 500; // Resize width if needed
            const height = 500; // Resize height if needed
            const result = await uploadToCloudinary(fileBuffer, folder, quality, width, height);
            user.profilePicture = result.secure_url;
            // // // console.log(result.secure_url)
        }

        // Save the updated user data
        user = await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating profile",
        });
    }
};

