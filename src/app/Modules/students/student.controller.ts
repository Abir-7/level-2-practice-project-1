import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getStudents: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await StudentServices.getStudentDataFromDB(query);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data is fetch successfully',
  });
});

const getSingleStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentDataFromDB(id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student data is fetch successfully',
  });
});

const updateStudents: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Student: studentData } = req.body;
  const result = await StudentServices.updateStudentDataIntoDB(id, studentData);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students data is updated successfully',
  });
});

const deleteStudents: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

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
  updateStudents,
  deleteStudents,
};
