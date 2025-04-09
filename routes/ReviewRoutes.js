import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
  createReview,
  getProductReviews,
} from '../controllers/ReviewController.js';

const router = express.Router();

router.post('/', checkAuth, createReview);
router.get('/product/:productId', getProductReviews);

export default router;
