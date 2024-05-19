import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createSudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getStudentDataFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentDataFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createSudentIntoDB,
  getStudentDataFromDB,
  getSingleStudentDataFromDB,
};
