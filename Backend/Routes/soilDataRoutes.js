import express from 'express';
import { getSoilData } from '../Controller/soilController.js';

const router = express.Router();

// Define the route for fetching soil data
router.get('/soil-data', getSoilData);

export default router;
