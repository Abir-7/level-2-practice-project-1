import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getStudents: RequestHandler = catchAsync(async (req, res) => {
  const result = await StudentServices.getStudentDataFromDB();
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data is fetch successfully',
  });
});

const getSingleStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentID } = req.params;
  const result = await StudentServices.getSingleStudentDataFromDB(studentID);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data is fetch successfully',
  });
});

const deleteStudents: RequestHandler = catchAsync(async (req, res) => {
  const { studentID } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentID);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data is deleted successfully',
  });
});

export const StudentController = {
  getStudents,
  getSingleStudents,
  deleteStudents,
};
