import express from 'express';
const router = express.Router();

import { createProduct,getAllProducts,getProductById ,getProductsByCategory,deleteProduct,updateProduct} from '../Controller/FarmerProduct.js';
router.post('/farmer/addproduct',createProduct);
router.get('/farmer/getallproducts/:query',getAllProducts);
router.get('/farmer/getproductbyid/:id',getProductById);
router.get('/farmer/getproductbycategory/:query',getProductsByCategory);
router.delete('/farmer/deleteproduct/:id',deleteProduct);
router.put('/farmer/updateproduct/:id',updateProduct);
export default router;