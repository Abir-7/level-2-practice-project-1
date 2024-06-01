import { T_AcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudent = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: T_AcademicSemester) => {
  let currentId = (0).toString();

  const lastStidentId = await findLastStudent();
  const lastSemesterCode = lastStidentId?.substring(4, 6);
  const lastSemesterYear = lastStidentId?.substring(0, 4);
  const currentSemesterYear = payload.year;
  const currentSemesterCode = payload.code;

  if (
    lastStidentId &&
    lastSemesterCode === currentSemesterCode &&
    lastSemesterYear === currentSemesterYear
  ) {
    currentId = lastStidentId.substring(6);
  }
  let incrementId = (parseInt(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
