import { z } from 'zod';
import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { studentValidationSchema } from '../students/student.validation';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user,utils';
import { T_AcademicSemester } from '../academicSemester/academicSemester.interface';
import mongoose from 'mongoose';

const createSudentIntoDB = async (password: string, studentData: TStudent) => {
  //create new user object
  const userData: Partial<TUser> = {};

  //if pass not given
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';

  //find semester

  const semester = await AcademicSemester.findById({
    _id: studentData.academicSemester,
  });

  console.log(semester);
  //set ID

  userData.id = await generateStudentId(semester as T_AcademicSemester);

  //create a user
  const newUser = await User.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createSudentIntoDB,
};
