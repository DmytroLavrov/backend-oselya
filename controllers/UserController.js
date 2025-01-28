import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';

import UserModel from '../models/User.js';

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      login: req.body.login,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'simpleSecretKey123',
      {
        expiresIn: '30d',
      }
    );

    res.setHeader('Authorization', token);

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Error during registration. Please try again later.' });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found. Please check your email or register.',
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Invalid credentials. Please check your password.',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'simpleSecretKey123',
      {
        expiresIn: '30d',
      }
    );

    res.setHeader('Authorization', token);

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred during login. Please try again later.',
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, 'simpleSecretKey123');
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'An error occurred during admin login. Please try again later.',
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found. Please check your credentials or register.',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Access Denied',
    });
  }
};

export const updateAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const image = req.file ? req.file.path : '';

    let updatedAvatarUrl = '';

    if (req.file) {
      const cloudinaryUpload = await cloudinary.uploader.upload(image);
      updatedAvatarUrl = cloudinaryUpload.url;
    }

    await UserModel.updateOne({ _id: userId }, { avatarUrl: updatedAvatarUrl });

    const updatedUser = await UserModel.findById(userId);

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to change avatar',
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { login, email, password } = req.body;

    // Перевірка, чи існує користувач з вказаною електронною поштою
    if (email) {
      const existingUser = await UserModel.findOne({ email });

      // Якщо знайдено користувача з такою поштою, і це не поточний користувач
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({
          message: 'The email is already in use by another account',
        });
      }
    }

    // Оновлення пароля, якщо він наданий
    let updatedData = {};
    if (login) updatedData.login = login;
    if (email) updatedData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedData.passwordHash = await bcrypt.hash(password, salt);
    }

    // Оновлення користувача в базі даних
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update user details',
    });
  }
};
