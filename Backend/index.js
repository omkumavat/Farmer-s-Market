import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRoutes from '../server/Routes/user.route.js'
// import authRoutes from '../server/Routes/auth.route.js'
// import path from 'path';
// import { fileURLToPath } from 'url';
// import cloudinary from 'cloudinary';
// import fileuPload from 'express-fileupload'
import connectDB from "./Database/database.js";
import User from "./Models/User.js";

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();

app.get('/',(req,res) => {
  res.send('Hello World')
})
app.post('/send', async (req, res) => {
  const { name, email,mobileno, password,confirmpassword,role } = req.body;

  try {
    const newUser = new User({ 
      name, 
      email, 
      mobileno, password,confirmpassword,role 
    });
    await newUser.save();
    res.json({ message: "Sign-up successful!" });
  } catch (err) {
    next(err);
  }
});
//   const cloudinaryConnect = () =>{
//     try {

//         cloudinary.config({
//             cloud_name:'dtobcdrww',
//             api_key:'988281658147778',
//             api_secret:'InjpwEKoNtJtcqOd5Uvf0ZTsD-8'
//         })
        
//     } catch (error) {
//         console.log(error); 
//     }
// }

// cloudinaryConnect();

// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // app.use('/', express.static(path.join(__dirname,'uploads')));
// console.log((path.join(__dirname,'uploads')));
// app.use(express.json());
// app.use(fileuPload({
//   useTempFiles : true,
//   tempFileDir : '/tmp/'
// }));

// app.use('/server/user',userRoutes)
// app.use('/server/auth',authRoutes)


// //middleware for error handling
// app.use((err,req,res,next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'internal server error';
//     res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message
//     })
// })

app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
