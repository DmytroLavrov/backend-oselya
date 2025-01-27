import express from 'express';

import { loginValidation, registerValidation } from '../validations/auth.js';
import handleValidationErrors from '../validations/handleValidationErrors.js';

import checkAuth from '../middleware/checkAuth.js';
import * as UserController from '../controllers/UserController.js';

const router = express.Router();

router.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
router.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);
router.post(
  '/auth/admin',
  loginValidation,
  handleValidationErrors,
  UserController.adminLogin
);
router.get('/auth/me', checkAuth, UserController.getMe);

export default router;
