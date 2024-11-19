import express from 'express';
const router = express.Router();

import { uploadMiddleware,createProduct, validateProduct,getProductById,getAllProducts,
    getProducts
 } from '../Controller/DealerProduct.js';

router.post("/dealer/addproduct",uploadMiddleware.array('images',3), validateProduct, createProduct);
router.get('/dealer/getallproducts/:query',getAllProducts);
router.get('/dealer/getproductid',getProductById);
router.get('/dealer/getproductbyquery',getProducts);
export default router;