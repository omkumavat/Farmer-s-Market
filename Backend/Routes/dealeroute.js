import express from 'express';
const router = express.Router();

import { createProduct, validateProduct,getProductById,getAllProducts,
    getProducts,getProductsByCategory,
    deleteProduct
 } from '../Controller/DealerProduct.js';

router.post("/dealer/addproduct", validateProduct, createProduct);
router.get('/dealer/getallproducts/:query',getAllProducts);
router.get('/dealer/getproductbyid/:id',getProductById);
router.get('/dealer/getproductbyquery',getProducts);
router.get('/dealer/getproductbycategory/:query',getProductsByCategory);
router.delete('/dealer/deleteProduct/:id',deleteProduct);
export default router;