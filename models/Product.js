import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  ratingValue: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
});

// const ProductModel = mongoose.models.product ||  mongoose.model('Product', ProductSchema);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
