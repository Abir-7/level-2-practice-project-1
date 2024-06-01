import mongoose from 'mongoose';
import { academicSemesterNameCode } from './academicSemester.constant';
import { T_AcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: T_AcademicSemester) => {
  if (academicSemesterNameCode[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  return result;
};

const updateSingleAcademicSemesterFromDB = async (
  id: string,
  data: Partial<T_AcademicSemester>,
) => {
  console.log(id);
  const filter = { _id: id };
  const update = data;

  if (
    data.name &&
    data.code &&
    academicSemesterNameCode[data.name] !== data.code
  ) {
    throw new Error(`Invalid semester code`);
  }
  const result = await AcademicSemester.findByIdAndUpdate(filter, update, {
    new: true,
  });
  if (!result) {
    throw new Error(`AcademicSemester with ID not found`);
  }
  console.log(result);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
