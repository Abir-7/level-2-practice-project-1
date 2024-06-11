import express from 'express';
import validationMiddleware from '../../middleware/validateReq';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();

router.post(
  '/login',
  validationMiddleware(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
