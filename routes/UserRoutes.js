import express from 'express';

import { loginValidation, registerValidation } from '../validations/auth.js';
import handleValidationErrors from '../validations/handleValidationErrors.js';

import checkAuth from '../middleware/checkAuth.js';
import upload from '../middleware/multer.js';

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
// router.patch('/auth/edit/login/:id', checkAuth, UserController.updateLogin);

router.patch(
  '/auth/edit/avatar/:id',
  checkAuth,
  upload.single('image'),
  UserController.updateAvatar
);

router.patch(
  '/auth/edit/:id',
  checkAuth,
  registerValidation,
  handleValidationErrors,
  UserController.updateUser
);

export default router;
