import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/get-students', StudentController.getStudents);
router.get(
  '/get-singleStudent/:studentID',
  StudentController.getSingleStudents,
);
router.delete('/delete-students/:studentID', StudentController.deleteStudents);

export const StudentRoutes = router;
