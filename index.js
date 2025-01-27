import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import connectCloudinary from './cloudinary.js';

import UserRoutes from './routes/UserRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';
import CartRoutes from './routes/CartRoutes.js';
// import OrderRoutes from './routes/OrderRoutes.js';

dotenv.config();

const port = process.env.PORT || 4444;

// db connection
mongoose
  .connect(process.env.MONGO__URL)
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

// cloudinary
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use(UserRoutes);
app.use(ProductRoutes);
app.use(CartRoutes);
// app.use(OrderRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('server ok');
});
