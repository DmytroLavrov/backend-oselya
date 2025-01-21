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
    type: String, // type: Array
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
  // ratingValue: {
  //   type: Number,
  //   required: true,
  // },
  // ratingCount: {
  //   type: Number,
  //   required: true,
  // },
});

// const ProductModel = mongoose.models.product ||  mongoose.model('Product', ProductSchema);

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
