import express from 'express';
import { academicDepartmentValidation } from './academicDepartment.validation';
import validationMiddleware from '../../middleware/validateReq';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-Department',
  validationMiddleware(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get(
  '/getAllDepartment',
  AcademicDepartmentController.getAllAcademicDepartment,
);

router.get(
  '/getDepartment/:id',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

router.patch(
  '/updateDepartment/:id',
  validationMiddleware(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRouter = router;
