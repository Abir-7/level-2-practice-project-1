import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);
router.get('/get-students', StudentController.getStudents);
router.get(
  '/get-singleStudent/:studentID',
  StudentController.getSingleStudents,
);

export const StudentRoute = router;
