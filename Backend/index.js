import express from "express";
import cors from "cors";
import { farmerRouter } from "./Routes/farmerRouter.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// Farmer routes
app.use("/auth", farmerRouter);

// Token verification middleware
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Invalid Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not authenticated" });
  }
};

// Verify route
app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running");
});
