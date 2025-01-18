import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import UserRoutes from './routes/UserRoutes.js';

dotenv.config();

const port = process.env.PORT || 4444;

// db connection
mongoose
  .connect(process.env.MONGO__URL)
  .then(() => console.log('db ok'))
  .catch((err) => console.log('db error', err));

const app = express();

// middleware
app.use(express.json());
// app.use(cors());

// routes
app.use(UserRoutes);

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('server ok');
});
