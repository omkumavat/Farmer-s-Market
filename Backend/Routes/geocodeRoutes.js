import express from 'express';
import { getCoordinates } from '../Controller/geocodeController.js';

const router = express.Router();

router.get('/geocode', getCoordinates);

export default router;
