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

export { createReview, getProductReviews };
