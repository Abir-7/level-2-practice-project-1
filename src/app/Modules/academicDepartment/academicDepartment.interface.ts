import { Types } from 'mongoose';

export interface T_AcademicDepartment {
  name: string;
  academicfaculty: Types.ObjectId;
}
