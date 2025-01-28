import OrderModel from '../models/Order.js';
import UserModel from '../models/User.js';

export const placeOrder = async (req, res) => {
  try {
    // const { userId, items, amount, address } = req.body;
    const { items, amount, address } = req.body;

    const userId = req.userId;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: 'COD',
      payment: false,
      date: Date.now(),
    };

    // console.log(orderData);

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    // res.json({ success: true, message: 'Order Placed', orderData });
    res.json({ success: true, message: 'Order Placed', newOrder });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later',
    });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
  } catch (err) {}
};

export const getAllOrders = async (req, res) => {
  try {
  } catch (err) {}
};

export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await OrderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later',
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
  } catch (err) {}
};
