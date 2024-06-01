import { NextFunction, Request, RequestHandler, Response } from 'express';
import { userService } from './user.service';

import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, Student: studentData } = req.body;

  const result = await userService.createSudentIntoDB(password, studentData);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
  });
});

export const userController = {
  createStudent,
};
