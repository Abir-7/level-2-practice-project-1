import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationMiddleware from '../../middleware/validateReq';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validationMiddleware(createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
