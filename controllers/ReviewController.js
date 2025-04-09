import ReviewModel from '../models/Review.js';
import ProductModel from '../models/Product.js';

const MAX_COMMENT_LENGTH = 500;

const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.userId;

    if (!comment || comment.length > MAX_COMMENT_LENGTH) {
      return res.status(400).json({
        message: `Review comment must be between 1 and ${MAX_COMMENT_LENGTH} characters`,
      });
    }

    const existingReview = await ReviewModel.findOne({ productId, userId });

    if (existingReview) {
      return res.status(400).json({
        message:
          'You have already reviewed this product. You can only leave one review per product.',
      });
    }

    const review = new ReviewModel({
      productId,
      userId,
      rating,
      comment,
    });

    await review.save();

    const populatedReview = await ReviewModel.findById(review._id).populate(
      'userId',
      ['login', 'avatarUrl']
    );

    const productReviews = await ReviewModel.find({ productId });
    const averageRating =
      productReviews.reduce((acc, review) => acc + review.rating, 0) /
      productReviews.length;

    await ProductModel.findByIdAndUpdate(productId, {
      ratingValue: averageRating,
      ratingCount: productReviews.length,
    });

    res.json(populatedReview);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to create review',
    });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await ReviewModel.find({ productId })
      .populate('userId', ['login', 'avatarUrl'])
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get reviews',
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const review = await ReviewModel.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this review' });
    }

    const { productId } = review;

    await ReviewModel.findByIdAndDelete(id);

    const productReviews = await ReviewModel.find({ productId });

    if (productReviews.length > 0) {
      const averageRating =
        productReviews.reduce((acc, review) => acc + review.rating, 0) /
        productReviews.length;

      await ProductModel.findByIdAndUpdate(productId, {
        ratingValue: averageRating,
        ratingCount: productReviews.length,
      });
    } else {
      await ProductModel.findByIdAndUpdate(productId, {
        ratingValue: 0,
        ratingCount: 0,
      });
    }

    res.json({ success: true, reviewId: id, productId });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to delete review',
    });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const userId = req.userId;

    const reviews = await ReviewModel.find({ userId })
      .populate('productId', ['name', 'image', 'price'])
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to get user reviews',
    });
  }
};

export { createReview, getProductReviews, deleteReview, getUserReviews };
