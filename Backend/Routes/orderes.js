import express from 'express';
const router = express.Router();

import { createOrder, getit, getOrders } from '../Controller/Orderes.js';
router.post('/orders/create-order',createOrder);
router.get('/orders/get-order/:id',getit);

export default router;