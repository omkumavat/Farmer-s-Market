import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileuPload from 'express-fileupload';
import connectDB from "./Database/database.js";
import {User} from "./Models/User.js";
import cors from 'cors';
import payment from "./Routes/payment.js"
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import geocodeRoutes from './Routes/geocodeRoutes.js';
import soilDataRoutes from './Routes/soilDataRoutes.js';
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

import verificationroute from './Routes/verificationroute.js';
app.use('/server',verificationroute);

import cart from './Routes/cart.js';
app.use('/server',cart);

import farmeroute from './Routes/farmeroute.js';
app.use('/server',farmeroute);


app.use(fileuPload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  limits: { fileSize: 100 * 1024 * 1024 } 
}));

import cloudinaryConnect from "./Database/Cloudinary.js";
cloudinaryConnect();

app.use('/api/payment', payment);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Define the templates directory
// const templatesDir = path.join(__dirname, "Templates");
// app.engine(
//   "hbs",
//   exphbs({
//     extname: ".hbs", // Set the file extension for Handlebars files
//     defaultLayout: "layout", // Set the default layout file
//     layoutsDir: path.join(__dirname, "Templates", "layouts"), // Path to layouts directory
//     partialsDir: path.join(__dirname, "Templates", "partials"), // Path to partials directory (optional)
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "Templates"));
app.get("/s", (req, res) => {
  res.render("Signup", { name: "OM" });
});

app.use('/api', geocodeRoutes);
app.use('/api', soilDataRoutes);

app.listen(4000, () => {
  console.log("app is listening on port 4000");
});
