import tf from '@tensorflow/tfjs-node'; // TensorFlow.js for Node.js
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary'; // Assuming you're uploading to Cloudinary
import cv from 'opencv4nodejs'; // For image processing

const modelPath = path.join(__dirname, '../Models/plant_disease_model.h5'); // Path to your model

// Load the model once when the app starts
let model;

async function loadModel() {
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("Model loaded successfully!");
}

loadModel().catch(error => console.log('Error loading model:', error));

// Function to process image and predict disease
async function predictDisease(req, res) {
    try {
        const imagePath = req.file.path; // Get the image path uploaded by the user

        // Read image using OpenCV
        const image = cv.imread(imagePath);
        const resizedImage = image.resize(224, 224); // Resize to the input size expected by your model (adjust if necessary)
        const tensorImage = tf.browser.fromPixels(resizedImage.getData()); // Convert to tensor

        // Normalize the image
        const normalizedImage = tensorImage.div(tf.scalar(255));

        // Expand dimensions to match the input shape of the model
        const expandedImage = normalizedImage.expandDims(0);

        // Get prediction from the model
        const prediction = await model.predict(expandedImage);
        const predictedClass = prediction.argMax(-1).dataSync()[0]; // Get the index of the highest probability class

        // Send back the prediction result
        res.json({
            message: "Prediction successful",
            predictedClass: predictedClass,
            className: getClassName(predictedClass), // Map class index to class name
        });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ message: 'Error processing image' });
    }
}

// Dummy function to map predicted class index to a class name (adjust as needed)
function getClassName(classIndex) {
    const classes = ['Healthy', 'Disease1', 'Disease2']; // Replace with actual class names
    return classes[classIndex] || 'Unknown';
}

export { predictDisease };
