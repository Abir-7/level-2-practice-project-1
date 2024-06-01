import { Router } from 'express';
import { StudentRoutes } from '../Modules/students/student.route';
import { userRoutes } from '../Modules/users/user.route';
import { AcademicSemesterRoutes } from '../Modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../Modules/academicFaculty/academicFaculty.router';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/students', route: StudentRoutes },
  { path: '/academicSemester', route: AcademicSemesterRoutes },
  { path: '/academicFaculty', route: AcademicFacultyRouter },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
