import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

import { studentValidationSchema } from '../students/student.validation';
import validationMiddleware from '../../middleware/validateReq';
import { facultyValidations } from '../Faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validationMiddleware(studentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validationMiddleware(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validationMiddleware(adminValidations.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
