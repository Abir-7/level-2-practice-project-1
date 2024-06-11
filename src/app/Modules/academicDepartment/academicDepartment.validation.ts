import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic Department name must be string',
      required_error: 'academic Department name is required',
    }),
    academicfaculty: z.string({
      invalid_type_error: 'academicfaculty Id must be string for Department',
      required_error: 'academicfaculty is required for Department',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic Department name must be string',
        required_error: 'academic Department name is required',
      })
      .optional(),
    academicfaculty: z
      .string({
        invalid_type_error: 'academicfaculty Id must be string for Department',
        required_error: 'academicfaculty is required for Department',
      })
      .optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
