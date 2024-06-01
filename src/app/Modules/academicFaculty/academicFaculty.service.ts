import { T_AcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: T_AcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDb = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: Partial<T_AcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyIntoDb,
  getAllAcademicFacultiesFromDb,
  getSingleAcademicFacultyFromDb,
  updateAcademicFacultyIntoDb,
};
