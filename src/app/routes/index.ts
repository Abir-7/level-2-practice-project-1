import { Router } from 'express';
import { StudentRoutes } from '../Modules/students/student.route';
import { userRoutes } from '../Modules/users/user.route';
import { AcademicSemesterRoutes } from '../Modules/academicSemester/academicSemester.route';
import { AcademicFacultyRouter } from '../Modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRouter } from '../Modules/academicDepartment/academicDepartment.router';
import { FacultyRouter } from '../Modules/Faculty/faculty.route';
import { AdminRouter } from '../Modules/Admin/admin.route';
import { CourseRouter } from '../Modules/Course/course.route';
import { semesterRegistrationRoutes } from '../Modules/semesterRegistration/semesterRegistration.route';
import { offeredCourseRoutes } from '../Modules/offeredCourse/OfferedCourse.route';
import { AuthRoutes } from '../Modules/Auth/auth.route';

const router = Router();

const moduleRoutes = [
  { path: '/users', route: userRoutes },
  { path: '/students', route: StudentRoutes },
  { path: '/academicSemester', route: AcademicSemesterRoutes },
  { path: '/academicFaculty', route: AcademicFacultyRouter },
  { path: '/academicDepartment', route: AcademicDepartmentRouter },
  { path: '/faculty', route: FacultyRouter },
  { path: '/admins', route: AdminRouter },
  { path: '/course', route: CourseRouter },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
