export interface TUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admn' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
