import express from 'express';
import multer from 'multer';
import { predictDisease } from '../Controller/pestDiseaseController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Configure file upload location

// Endpoint for image upload and prediction
router.post('/predict', upload.single('image'), predictDisease);

export default router;
