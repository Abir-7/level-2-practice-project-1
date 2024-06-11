import { model, Schema } from 'mongoose';
import { T_AcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<T_AcademicDepartment>({
  name: {
    type: String,
    required: [true, 'academicDepartment Name is required'],
    unique: true,
  },
  academicfaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'academic faculty is required for academic department'],
    ref: 'AcademicFaculty',
  },
});

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({ name: this.name });
  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${this.name} is already exist`,
      '',
    );
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isExist = await AcademicDepartment.findOne(query);
  if (!isExist) {
    throw new AppError(404, 'Department not found for update', '');
  }
  next();
});

export const AcademicDepartment = model<T_AcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
