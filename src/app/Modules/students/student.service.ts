import mongoose from 'mongoose';
import { Student } from './student.model';
import { User } from '../users/user.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TStudent } from './student.interface';
import { object } from 'zod';
import { error } from 'console';

import { studentSearchField } from './student.constant';
import QueryBuilder from '../../builder/QueryBuilder';

const getStudentDataFromDB = async (query: Record<string, unknown>) => {
  // console.log(query);
  // let searchTerm = '';
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchTermQuery = Student.find({
  //   $or: studentSearchField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // const queryobject = { ...query };
  // const excludeFiled = ['searchTerm', 'sort', 'limit', 'page', 'field'];
  // excludeFiled.forEach((el) => delete queryobject[el]);
  // console.log(query, queryobject);
  // const filterQuery = searchTermQuery.find(queryobject);

  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }

  // const sortQuery = filterQuery
  //   .populate('academicSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicfaculty',
  //     },
  //   })
  //   .sort(sort);

  // let limit = 1;
  // let page = 1;
  // let skip = page - 1;

  // if (query?.limit) {
  //   limit = Number(query?.limit);
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginationQuery = sortQuery.skip(skip);

  // const limitQuery = paginationQuery.limit(limit);

  // let field = '-__v';
  // if (query?.field) {
  //   field = (query?.field as string).split(',').join(' ');
  //   console.log(field);
  // }
  // const fieldLimitQuery = await limitQuery.select(field);

  // return fieldLimitQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('academicSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicfaculty',
        },
      }),
    query,
  )
    .searchMethod(studentSearchField)
    .filterMethod()
    .sortMethod()
    .paginateMethod()
    .fieldLimitMethod();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentDataFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });

  const result = await Student.findById(id)
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  return result;
};

const updateStudentDataIntoDB = async (id: string, data: Partial<TStudent>) => {
  //const result = await Student.findOne({ id });

  const { name, guardian, localGuardian, ...remainingStudentData } = data;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name))
      modifiedUpdatedData[`name.${key}`] = value;
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian))
      modifiedUpdatedData[`guardian.${key}`] = value;
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian))
      modifiedUpdatedData[`localGuardian.${key}`] = value;
  }
  //console.log(modifiedUpdatedData);
  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  const isExist = await Student.isUserExixst(id);
  if (!isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Faield to delete User. User not found',
      error,
    );
  }

  try {
    session.startTransaction();
    const deleteStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deleteStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Faield to delete Student',
        error,
      );
    }
    const userID = deleteStudent.user;
    const deleteUser = await User.findOneAndUpdate(
      userID,
      { isDeleted: true },
      {
        new: true,
        session,
      },
    );
    if (!deleteUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Faield to delete User',
        error,
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Faield to delete User/Student',
      error,
    );
  }
};

export const StudentServices = {
  getStudentDataFromDB,
  getSingleStudentDataFromDB,
  deleteStudentFromDB,
  updateStudentDataIntoDB,
};
