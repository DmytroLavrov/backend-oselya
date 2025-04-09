import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
  createReview,
  getProductReviews,
  deleteReview,
} from '../controllers/ReviewController.js';

const router = express.Router();

router.post('/', checkAuth, createReview);
router.get('/product/:productId', getProductReviews);
router.delete('/:id', checkAuth, deleteReview);

export default router;
