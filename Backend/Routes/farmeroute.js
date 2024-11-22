import express from 'express';
const router = express.Router();

import { createProduct } from '../Controller/FarmerProduct.js';
router.post('/farmer/addproduct',createProduct);
export default router;