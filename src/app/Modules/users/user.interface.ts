import { Model } from 'mongoose';
import { UserRole } from './user.const';

export interface TUser {
  id: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  needPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  //myStaticMethod(): number;
  isPasswordMatch(
    plainTextPass: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangeTimeStamp: Date,
    jwtissuedTimeStamp: number,
  ): Promise<boolean>;
  isUserExistsByCustomId(id: string): Promise<TUser>;
}

export type T_UserRole = keyof typeof UserRole;
