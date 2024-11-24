import express from 'express';
const router = express.Router();
import { upload } from '../Database/Cloudinary.js';
import {login, signup,getUserById,verifyPassword,updateProfile} from '../Controller/AuthUser.js';
import { sendEmail } from '../Controller/EmailService.js';

router.post("/signup", signup);
router.post("/login", login);
router.post('/sendmail', sendEmail);
router.get('/user/getuserbyid/:id', getUserById);
router.post('/user/verifypassword',verifyPassword);
router.put('/user/updateprofile/:id',upload.single("profilePicture"),updateProfile);

import {fetchMyProducts} from '../Controller/DashBoard.js'
router.get('/fetchmyproducts/:id', fetchMyProducts);
export default router;