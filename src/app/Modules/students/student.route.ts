import express from 'express';
import { StudentController } from './student.controller';
import validationMiddleware from '../../middleware/validateReq';
import { studentValidation } from './student.validation';

const router = express.Router();

router.get('/get-students', StudentController.getStudents);
router.get('/get-singleStudent/:id', StudentController.getSingleStudents);
router.patch(
  '/update-students/:id',
  validationMiddleware(studentValidation.updateStudentValidationSchema),
  StudentController.updateStudents,
);
router.delete('/delete-students/:id', StudentController.deleteStudents);

export const StudentRoutes = router;
