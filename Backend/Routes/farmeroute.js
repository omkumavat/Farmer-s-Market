import express from 'express';
const router = express.Router();

import { createProduct, getAllProducts, getProductById, getProductsByCategory,getFarmerSearch,getComments, postComment,deleteProduct, updateProduct, getSimilarProducts } from '../Controller/FarmerProduct.js';
router.post('/farmer/addproduct', createProduct);
router.get('/farmer/getallproducts/:query', getAllProducts);
router.get('/farmer/getproductbyid/:id', getProductById);
router.get('/farmer/getproductbycategory/:query', getProductsByCategory);
router.delete('/farmer/deleteproduct/:id', deleteProduct);
router.put('/farmer/updateproduct/:id', updateProduct);
router.get('/farmer/getsimilarproducts', getSimilarProducts)
router.get('/farmersearch',getFarmerSearch)
router.post('/farmer/post-comment/:id',postComment)
router.get('/farmer/get-comment/:id',getComments)
export default router;