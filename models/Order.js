import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Order placed',
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Number,
    required: true,
  },
});

// const OrderModel = mongoose.models.order ||  mongoose.model('Order', OrderSchema);

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;
