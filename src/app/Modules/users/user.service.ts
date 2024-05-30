import { z } from 'zod';
import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { studentValidationSchema } from '../students/student.validation';

const createSudentIntoDB = async (password: string, studentData: TStudent) => {
  //create new user object
  const userData: Partial<TUser> = {};

  //if pass not given
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';
  //set ID
  userData.id = studentData.id;
  //create a user
  const newUser = await User.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    //const studentDataZod = studentValidationSchema.parse(studentData);

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userService = {
  createSudentIntoDB,
};
