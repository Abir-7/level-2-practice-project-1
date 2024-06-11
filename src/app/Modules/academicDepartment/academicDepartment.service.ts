import { T_AcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (
  payload: T_AcademicDepartment,
) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartment.find().populate('academicfaculty');
  return result;
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicfaculty');
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: Partial<T_AcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDb,
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  updateAcademicDepartmentIntoDb,
};
