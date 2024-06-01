import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'academicFaculty name is required.',
      invalid_type_error: 'academicFaculty name mustbe string',
    }),
  }),
});

export const academicFacultyValidation = {
  academicFacultyValidationSchema,
};
