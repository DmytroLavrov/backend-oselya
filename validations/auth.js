import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Please provide a valid email address').isEmail(),
  body('password', 'Password must be at least 5 characters long').isLength({
    min: 5,
  }),
  body('login', 'Login must be at least 3 characters long').isLength({
    min: 3,
  }),
  body('avatarUrl', 'Avatar URL must be a valid URL').optional().isURL(),
];

export const loginValidation = [
  body('email', 'Please provide a valid email address.').isEmail(),
  body('password', 'Password must be at least 5 characters long.').isLength({
    min: 5,
  }),
];
