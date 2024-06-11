import { model, Schema } from 'mongoose';
import {
  T_Course,
  T_CourseFaculty,
  T_PreRequisiteCourses,
} from './course.interface';

export const preRequisiteCoursesSchema = new Schema<T_PreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDelete: { type: Boolean, default: false },
});

export const courseSchema = new Schema<T_Course>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Course title is required'],
  },
  code: {
    type: Number,
    required: [true, 'Course Code is Required'],
    trim: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, 'Course prefix is required'],
  },
  credits: {
    type: Number,
    trim: true,
    required: [true, 'Course cradits is required'],
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDelete: { type: Boolean, default: false },
});

export const courseFacultySchema = new Schema<T_CourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', unique: true },
  faculties: [{ type: Schema.Types.ObjectId, ref: 'Faculty' }],
});

export const CourseFaculty = model<T_CourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
export const Course = model<T_Course>('Course', courseSchema);
