import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const data = req.body;
    //console.log(data);
    const result =
      await AcademicDepartmentService.createAcademicDepartmentIntoDb(data);

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created successfully',
    });
  },
);

const getAllAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await AcademicDepartmentService.getAllAcademicDepartmentFromDb();

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Departments are fetch successfully',
    });
  },
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result =
      await AcademicDepartmentService.getSingleAcademicDepartmentFromDb(id);

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is fetched successfully',
    });
  },
);

const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const result =
      await AcademicDepartmentService.updateAcademicDepartmentIntoDb(id, data);

    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is updated successfully',
    });
  },
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
