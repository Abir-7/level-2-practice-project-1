import { Model, Types } from 'mongoose';

export type T_Gender = 'male' | 'female' | 'other';
export type T_BloodGroup =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type T_UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type T_Faculty = {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: T_UserName;
  gender: T_Gender;
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: T_BloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};

export interface FacultyModel extends Model<T_Faculty> {
  isUserExists(id: string): Promise<T_Faculty | null>;
}
