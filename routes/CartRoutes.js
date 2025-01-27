import express from 'express';

import {
  addToCart,
  getUserCart,
  updateCart,
  removeFromCart,
} from '../controllers/CartController.js';

import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/cart/add', checkAuth, addToCart);

router.get('/cart/get', checkAuth, getUserCart);
router.post('/cart/update', checkAuth, updateCart);
// router.delete('/cart/delete', checkAuth, removeFromCart);
router.post('/cart/delete', checkAuth, removeFromCart);

export default router;
