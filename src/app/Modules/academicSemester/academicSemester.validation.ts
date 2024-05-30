import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterName] as [string, ...string[]], {
      required_error: 'Academic Name is Required',
      invalid_type_error: "'Autumn', 'Summmer', 'Fall' are accepted",
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'Academic Code is Required',
      invalid_type_error: "'01', '02', '03' are accepted",
    }),
    year: z.string({
      required_error: 'Academic Year is Required',
      invalid_type_error: 'Invalid Academic Year ',
    }),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'Academic Year is Required',
      invalid_type_error: 'Invalid Academic Year ',
    }),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'Academic Year is Required',
      invalid_type_error: 'Invalid Academic Year ',
    }),
  }),
});
