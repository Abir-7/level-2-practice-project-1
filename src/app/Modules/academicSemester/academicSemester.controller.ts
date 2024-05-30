import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(data);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
  });
});

export const AcademicSemesterController = { createAcademicSemester };
