import express from 'express';
const router = express.Router();

import { createProduct,getAllProducts,getProductById } from '../Controller/FarmerProduct.js';
router.post('/farmer/addproduct',createProduct);
router.get('/farmer/getallproducts/:query',getAllProducts);
router.get('/farmer/getproductbyid/:id',getProductById);
export default router;