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

const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesterFromDB();

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Semester is fetched successfully',
  });
});
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Semester is fetched successfully',
    });
  },
);

const updateSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const result =
      await AcademicSemesterServices.updateSingleAcademicSemesterFromDB(
        id,
        data,
      );

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is updated successfully',
    });
  },
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
