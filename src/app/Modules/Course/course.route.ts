import express from 'express';
import validationMiddleware from '../../middleware/validateReq';
import { courseZodValidation } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin'),
  validationMiddleware(courseZodValidation.courseZodValidationSchema),
  courseController.createCourse,
);

router.get(
  '/getAllCourse',
  auth('admin', 'faculty', 'student'),
  courseController.getAllCourse,
);

router.get(
  '/getCourse/:id',
  auth('admin', 'faculty', 'student'),
  courseController.getSingleCourse,
);

router.patch(
  '/updateCourse/:id',
  auth('admin'),
  validationMiddleware(courseZodValidation.courseUpdateZodValidationSchema),

  courseController.updateSingleCourse,
);

router.put(
  '/:courseId/assignFaculty',
  auth('admin'),
  validationMiddleware(courseZodValidation.facultiesWithCourseValidationSchema),
  courseController.assignFacultiestoCourse,
);

router.delete(
  '/deleteCourse/:id',
  auth('admin'),
  courseController.deleteCourse,
);

router.delete(
  '/:courseId/removeFaculties',
  auth('admin'),
  validationMiddleware(courseZodValidation.facultiesWithCourseValidationSchema),
  courseController.removeFacultiesFromCourse,
);

export const CourseRouter = router;
