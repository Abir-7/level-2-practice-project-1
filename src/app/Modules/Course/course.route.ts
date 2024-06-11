import express from 'express';
import validationMiddleware from '../../middleware/validateReq';
import { courseZodValidation } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validationMiddleware(courseZodValidation.courseZodValidationSchema),
  courseController.createCourse,
);

router.get('/getAllCourse', courseController.getAllCourse);

router.get('/getCourse/:id', courseController.getSingleCourse);

router.patch(
  '/updateCourse/:id',
  validationMiddleware(courseZodValidation.courseUpdateZodValidationSchema),
  courseController.updateSingleCourse,
);

router.put(
  '/:courseId/assignFaculty',
  validationMiddleware(courseZodValidation.facultiesWithCourseValidationSchema),
  courseController.assignFacultiestoCourse,
);

router.delete('/deleteCourse/:id', courseController.deleteCourse);

router.delete(
  '/:courseId/removeFaculties',
  validationMiddleware(courseZodValidation.facultiesWithCourseValidationSchema),
  courseController.removeFacultiesFromCourse,
);

export const CourseRouter = router;
