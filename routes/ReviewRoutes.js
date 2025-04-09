import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import {
  createReview,
  getProductReviews,
  deleteReview,
  getUserReviews,
} from '../controllers/ReviewController.js';

const router = express.Router();

router.post('/', checkAuth, createReview);
router.get('/product/:productId', getProductReviews);
router.get('/user', checkAuth, getUserReviews);
router.delete('/:id', checkAuth, deleteReview);

export default router;
