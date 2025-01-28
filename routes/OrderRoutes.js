import express from 'express';

import {
  placeOrder,
  placeOrderStripe,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
} from '../controllers/OrderController.js';

import adminAuth from '../middleware/adminAuth.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/orders/get', adminAuth, getAllOrders);
router.post('/orders/status', adminAuth, updateOrderStatus);

router.post('/orders/place', checkAuth, placeOrder);
router.post('/orders/stripe', checkAuth, placeOrderStripe);
router.post('/orders/user', checkAuth, getOrdersByUser);

export default router;
