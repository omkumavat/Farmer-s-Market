import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.mongo_url;
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    // console.log("Database is connected!!!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
