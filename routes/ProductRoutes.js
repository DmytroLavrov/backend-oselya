import express from 'express';
// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });

import * as ProductController from '../controllers/ProductController.js';

import adminAuth from '../middleware/adminAuth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// Create a product
router.post(
  '/products',
  adminAuth,
  upload.single('image'),
  ProductController.createProduct
);

// Get all products
router.get('/products', ProductController.getProducts);

// Get a specific product
router.get('/products/:id', ProductController.getProduct);
// router.post('/products/getProduct', ProductController.getProduct);

// Update a product
// router.put(
//   '/products/:id',
//   upload.single('image'),
//   ProductController.updateProduct
// );

// Delete a product
router.delete('/products/delete', adminAuth, ProductController.deleteProduct);

export default router;
