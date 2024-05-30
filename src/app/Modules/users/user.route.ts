import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

import { studentValidationSchema } from '../students/student.validation';
import validationMiddleware from '../../middleware/validateReq';

const router = express.Router();

router.post(
  '/create-user',
  validationMiddleware(studentValidationSchema),
  userController.createStudent,
);

export const userRoutes = router;
