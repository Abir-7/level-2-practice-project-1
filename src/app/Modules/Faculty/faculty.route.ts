import express from 'express';

import { FacultyControllers } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import validationMiddleware from '../../middleware/validateReq';
import auth from '../../middleware/auth';
import { UserRole } from '../users/user.const';

const router = express.Router();

router.get('/getSingleFaculty/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/updateFaculty/:id',
  validationMiddleware(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/deleteFaculty/:id', FacultyControllers.deleteFaculty);

router.get(
  '/getAllFaculty',
  auth(UserRole.admin),
  FacultyControllers.getAllFaculties,
);

export const FacultyRouter = router;
