import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileuPload from 'express-fileupload';
import connectDB from "./Database/database.js";
import User from "./Models/User.js";
import cors from 'cors';

const app=express();
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();
app.use(cors({
  origin: 'http://localhost:3000',  // You can replace this with the actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing these methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.get('/',(req,res) => {
  res.send('Hello World')
})

import user from './Routes/useroute.js';
app.use('/server',user)

import dealeroute from './Routes/dealeroute.js';
app.use('/server',dealeroute)

app.use(fileuPload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  limits: { fileSize: 100 * 1024 * 1024 } 
}));

import cloudinaryConnect from "./Database/Cloudinary.js";
cloudinaryConnect();


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
