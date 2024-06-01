import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validationMiddleware from '../../middleware/validateReq';
import {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
} from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validationMiddleware(createAcademicSemesterValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

router.get(
  '/get-academic-semester',
  AcademicSemesterController.getAcademicSemester,
);
router.get(
  '/get-academic-semester/:id',
  AcademicSemesterController.getSingleAcademicSemester,
);
router.patch(
  '/update-academic-semester/:id',
  validationMiddleware(updateAcademicSemesterValidationSchema),
  AcademicSemesterController.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
