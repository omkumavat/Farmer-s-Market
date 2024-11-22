import express from 'express';
import { getSoilData } from '../Controller/soilController.js';

const router = express.Router();

router.get('/soil-data', getSoilData);

export default router;
