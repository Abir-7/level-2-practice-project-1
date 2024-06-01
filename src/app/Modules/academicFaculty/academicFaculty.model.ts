import { model, Schema } from 'mongoose';
import { T_AcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<T_AcademicFaculty>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Academic Faculty Name is Required'],
    },
  },
  { timestamps: true },
);

export const AcademicFaculty = model<T_AcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
