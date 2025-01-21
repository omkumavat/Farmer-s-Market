import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fileuPload from 'express-fileupload';
import connectDB from "./Database/database.js";
import { User } from "./Models/User.js";
import cors from 'cors';
import payment from "./Routes/payment.js"
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import soilDataRoutes from './Routes/soilDataRoutes.js';

const app = express();
app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
connectDB();
app.use(cors({
  origin: '*',  // You can replace this with the actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowing these methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use(express.static("uploads"));
import user from './Routes/useroute.js';
app.use('/server', user)

import dealeroute from './Routes/dealeroute.js';
app.use('/server', dealeroute)

import verificationroute from './Routes/verificationroute.js';
app.use('/server', verificationroute);

import cart from './Routes/cart.js';
app.use('/server', cart);

import farmeroute from './Routes/farmeroute.js';
app.use('/server', farmeroute);

import orders from './Routes/orderes.js';
app.use('/server', orders);

import seller from './Routes/seller.js';
app.use('/server', seller);

import Happy from './Routes/Happy.js'
app.use('/server',Happy);

app.use(fileuPload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 100 * 1024 * 1024 }
}));

import cloudinaryConnect from "./Database/Cloudinary.js";
cloudinaryConnect();

app.use('/api/payment', payment);

import dealersearch from './Routes/dealersearch.js';
app.use('/api/products',dealersearch);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'src', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.get("/s", (req, res) => {
  res.render("Ticket", { name: "OM", que: "a", response: "a" });
});


// app.listen(4000, () => {
//   console.log("app is listening on port 4000");
// });

export default app;