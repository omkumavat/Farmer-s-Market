import express from 'express';
const router = express.Router();

import { getSellerProductSales } from '../Controller/Seller.js';
router.get('/sales/get-sale/:id',getSellerProductSales);
export default router;