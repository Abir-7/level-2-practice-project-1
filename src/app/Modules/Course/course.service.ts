import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchFields } from './course.constant';
import { T_Course, T_CourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDb = async (payload: T_Course) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .searchMethod(courseSearchFields)
    .filterMethod()
    .sortMethod()
    .paginateMethod()
    .fieldLimitMethod();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCoursesFromDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCoursesFromDb = async (id: string, payload: Partial<T_Course>) => {
  const { preRequisiteCourses, ...courseRenainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //basic course data update
    const basicCourseUpdate = await Course.findByIdAndUpdate(
      id,
      courseRenainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!basicCourseUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course', '');
    }

    //check i any pre-reuisite available
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter deleted item
      const deletedPrerequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDelete)
        .map((el) => el.course);

      const deletePerequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPrerequisite } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletePerequisiteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update Course',
          '',
        );
      }
      //filter not deleted item
      const newPrerequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDelete,
      );

      const addNewPrereuisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrerequisite } },
        },
        { new: true, runValidators: true, session },
      );

      if (!addNewPrereuisiteCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update Course',
          '',
        );
      }
    }
    session.commitTransaction();
    session.endSession();

    const result = await Course.findById(id);
    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Course', '');
  }
};

const deleteCoursesFromDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDelete: true,
    },
    { new: true },
  );
  return result;
};

const assignCoursetoFaculties = async (
  id: string,
  data: Partial<T_CourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: data } },
    },
    { upsert: true, new: true },
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<T_CourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDb,
  getAllCoursesFromDb,
  getSingleCoursesFromDb,
  updateCoursesFromDb,
  deleteCoursesFromDb,
  assignCoursetoFaculties,
  removeFacultiesFromCourseFromDB,
};
