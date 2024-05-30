import mongoose from 'mongoose';
import { Student } from './student.model';

const getStudentDataFromDB = async () => {
  //
  const result = await Student.find();
  return result;
};

const getSingleStudentDataFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  console.log(id);
  const result = await Student.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ _id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getStudentDataFromDB,
  getSingleStudentDataFromDB,
  deleteStudentFromDB,
};
