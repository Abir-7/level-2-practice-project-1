import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validationMiddleware from '../../middleware/validateReq';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validationMiddleware(
    academicFacultyValidation.academicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/getAllfaculty', AcademicFacultyController.getAllAcademicFaculty);

router.get(
  '/getfaculty/:id',
  AcademicFacultyController.getSingleAcademicFaculty,
);

router.patch(
  '/updatefaculty/:id',
  validationMiddleware(
    academicFacultyValidation.academicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRouter = router;
