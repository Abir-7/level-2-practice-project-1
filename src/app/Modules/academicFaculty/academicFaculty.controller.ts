import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const data = req.body;
    console.log(data);
    const result =
      await AcademicFacultyService.createAcademicFacultyIntoDb(data);

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is created successfully',
    });
  },
);

const getAllAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDb();

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties is fetch successfully',
    });
  },
);

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result =
      await AcademicFacultyService.getSingleAcademicFacultyFromDb(id);

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is fetched successfully',
    });
  },
);

const updateAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result = await AcademicFacultyService.updateAcademicFacultyIntoDb(
      id,
      data,
    );

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty is updated successfully',
    });
  },
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
