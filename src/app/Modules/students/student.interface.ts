import { Model, Types } from 'mongoose';

export type TStudentGaurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBrith?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TStudentGaurdian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  academicSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

//for creating instance
export interface StudentModel extends Model<TStudent> {
  isUserExixst(id: string): Promise<TStudent | null>;
}

//for creating instance

// export type StudentMethod = {
//   isUserExixst(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<TStudent, {}, StudentMethod>;
