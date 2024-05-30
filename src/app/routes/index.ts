import { Router } from 'express';
import { StudentRoutes } from '../Modules/students/student.route';
import { userRoutes } from '../Modules/users/user.route';
import { AcademicSemesterRoutes } from '../Modules/academicSemester/academicSemester.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/students', route: StudentRoutes },
  { path: '/academicSemester', route: AcademicSemesterRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
