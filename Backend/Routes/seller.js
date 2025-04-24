import express from 'express';
const router = express.Router();

import { getSellerFarmerProductSales, getSellerProductSales } from '../Controller/Seller.js';
router.get('/sales/get-sale/:id',getSellerProductSales);
router.get('/sales/get-sale-farmer/:id',getSellerFarmerProductSales);
export default router;