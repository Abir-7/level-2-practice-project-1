import express from 'express';
import validationMiddleware from '../../middleware/validateReq';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middleware/auth';
import { UserRole } from '../users/user.const';
const router = express.Router();

router.post(
  '/login',
  validationMiddleware(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/changePassword',
  validationMiddleware(AuthValidation.changePasswordValidationSchema),
  auth(UserRole.admin, UserRole.faculty, UserRole.admin),
  AuthControllers.changePassword,
);

router.post(
  '/refreshToken',
  validationMiddleware(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

router.post(
  '/forget-password',
  validationMiddleware(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
);

router.post(
  '/reset-password',
  auth('admin', 'faculty', 'student'),
  validationMiddleware(AuthValidation.resetPasswordValidationSchema),
  AuthControllers.resetPassword,
);

export const AuthRoutes = router;
