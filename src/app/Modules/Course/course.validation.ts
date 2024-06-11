import { z } from 'zod';
import { Types } from 'mongoose';

const preRequisiteCoursesZodSchema = z.object({
  course: z.string({
    invalid_type_error: 'course id must be string',
    required_error: 'Course id is Required',
  }),
  isDelete: z.boolean().optional(),
});

// Define the schema for T_Course
const courseZodValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'course title must be string',
      required_error: 'Course title is Required',
    }),
    prefix: z.string({
      invalid_type_error: 'course prefix must be string',
      required_error: 'Course prefix is Required',
    }),
    code: z.number({
      invalid_type_error: 'course code must be number',
      required_error: 'Course code is Required',
    }),
    credits: z.number({
      invalid_type_error: 'course credits must be number',
      required_error: 'Course credits is Required',
    }),
    preRequisiteCourses: z.array(preRequisiteCoursesZodSchema).optional(),
    isDelete: z.boolean().optional(),
  }),
});

const courseUpdateZodValidationSchema = preRequisiteCoursesZodSchema.partial();

const facultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseZodValidation = {
  courseZodValidationSchema,
  courseUpdateZodValidationSchema,
  facultiesWithCourseValidationSchema,
};
