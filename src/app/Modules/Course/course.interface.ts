import { Types } from 'mongoose';

export type T_PreRequisiteCourses = {
  course: Types.ObjectId;
  isDelete: { type: Boolean; default: false };
};

export type T_Course = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [T_PreRequisiteCourses];
  isDelete: boolean;
};

export type T_CourseFaculty = {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
};
