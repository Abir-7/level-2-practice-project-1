import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { Student: studentData } = req.body;
    const result = await StudentServices.createSudentIntoDB(studentData);
    res.status(200).send({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentDataFromDB();
    res.status(200).send({
      success: true,
      message: 'Students data is fetch successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await StudentServices.getSingleStudentDataFromDB(studentID);
    res.status(200).send({
      success: true,
      message: 'Student data is fetch successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getStudents,
  getSingleStudents,
};
