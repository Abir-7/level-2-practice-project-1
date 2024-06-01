import mongoose, { model, Schema } from 'mongoose';
import { T_AcademicSemester } from './academicSemester.interface';
import {
  academicSemesterCode,
  academicSemesterName,
  months,
} from './academicSemester.constant';

export const academicSemesterSchema = new Schema<T_AcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: [true, 'Academic name is required'],
    },
    code: {
      type: String,
      enum: academicSemesterCode,
      required: [true, 'Academic Code is required'],
    },
    year: { type: String, required: [true, 'Academic Year is required'] },
    startMonth: {
      type: String,
      enum: months,
      required: [true, 'Academic start month is required'],
    },
    endMonth: {
      type: String,
      enum: months,
      required: [true, 'Academic end month is required'],
    },
  },
  { timestamps: true },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExist) {
    throw new Error('Semester is already exist');
  }

  next();
});

export const AcademicSemester = mongoose.model<T_AcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
