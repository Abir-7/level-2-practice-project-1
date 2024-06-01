import { Schema } from 'mongoose';
import { T_AcademicDepartment } from './academicDepartment.interface';

export const academicDepartmentSchema = new Schema<T_AcademicDepartment>({
  name: {
    type: String,
    required: [true, 'academicDepartment Name is required'],
    unique: true,
  },
  academicfaculty: {
    type: Schema.Types.ObjectId,
    required: [true, 'academic faculty is required for academic department'],
  },
});
