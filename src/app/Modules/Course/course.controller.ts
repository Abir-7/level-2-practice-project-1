import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { courseServices } from './course.service';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await courseServices.createCourseIntoDb(data);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
  });
});

const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseServices.getAllCoursesFromDb(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'all course are fetched  successfully',
    data: result,
  });
});

const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCoursesFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'course is fetched  successfully',
    data: result,
  });
});

const updateSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await courseServices.updateCoursesFromDb(id, data);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'course is updated successfully',
    data: result,
  });
});

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCoursesFromDb(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'course is deleted successfully',
    data: result,
  });
});

const assignFacultiestoCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.assignCoursetoFaculties(
    courseId,
    faculties,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'faculties added in course successfully',
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed  succesfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateSingleCourse,
  deleteCourse,
  assignFacultiestoCourse,
  removeFacultiesFromCourse,
};
