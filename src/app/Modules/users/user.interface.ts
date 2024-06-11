import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
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
  isUserExistsByCustomId(id: string): Promise<TUser>;
}
