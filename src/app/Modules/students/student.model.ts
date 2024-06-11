import { Schema, model } from 'mongoose';
import validator from 'validator';

import {
  TLocalGuardian,
  TStudent,
  TStudentGaurdian,
  // StudentMethod,
  StudentModel,
  TUserName,
} from './student.interface';
import config from '../../config';

const userNameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name Required'],
      maxlength: [10, 'name musbe between 20 char'],
      validate: {
        validator: function (fName: string) {
          const cWord =
            fName.charAt(0).toUpperCase() + fName.slice(1).toLowerCase();
          return fName === cWord;
        },
        message: "Please write name like 'Jhon' ",
      },
    },
    middleName: { type: String },
    lastName: {
      type: String,
      required: [true, 'Last Name Required'],
      validate: {
        validator: function (value: string) {
          return validator.isAlpha(value);
        },
        message: '{VALUE} is not Valid',
      },
    },
  },
  { _id: false },
);

const gaurdianSchema = new Schema<TStudentGaurdian>(
  {
    fatherName: { type: String, required: [true, 'Father Name Required'] },
    fatherOccupation: {
      type: String,
      required: [true, 'Father Occupation Required'],
    },
    fatherContactNo: {
      type: String,
      required: [true, 'Father Contact Required'],
    },
    motherName: { type: String, required: [true, 'Mother Name Required'] },
    motherOccupation: {
      type: String,
      required: [true, 'Mother Occupation Required'],
    },
    motherContactNo: {
      type: String,
      required: [true, 'Mother Contact Required'],
    },
  },
  { _id: false },
);

const localGaurdianSchema = new Schema<TLocalGuardian>(
  {
    name: { type: String, required: [true, 'Local Gaurdian  name Required'] },
    occupation: {
      type: String,
      required: [true, 'Local Gaurdian Occupation Required'],
    },
    contactNo: {
      type: String,
      required: [true, 'Local Gaurdian contact Required'],
    },
    address: { type: String, required: true },
  },
  { _id: false },
);

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id must be given'],
      unique: true,
      ref: 'User',
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is Required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['female', 'male', 'other'],
        message: 'only support femail,male & other',
      },
      required: [true, 'Gander Required'],
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      validate: {
        validator: function (email: string) {
          return validator.isEmail(email);
        },
        message: 'Email not valid',
      },
      unique: true,
    },
    dateOfBrith: { type: String },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanent address Required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'present address Required'],
    },
    guardian: { type: gaurdianSchema, required: [true, 'Gaurdian Required'] },
    localGuardian: {
      type: localGaurdianSchema,
      required: [true, 'local gaurdinan details de'],
    },
    profileImg: { type: String },
    academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, timestamps: true },
);

studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

studentSchema.pre('find', async function (next) {
  //console.log(this, 'pre hook: we will save the data');
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('find', async function (next) {
  //console.log(this, 'pre hook: we will save the data');
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  //console.log(this, 'pre hook: we will save the data');
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', async function (next) {
  //console.log(this, 'pre hook: we will save the data');
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
//creating a custom static method
studentSchema.statics.isUserExixst = async function (id: string) {
  const exisxtingUser = await Student.findOne({ id });
  return exisxtingUser;
};

//crating a custom instance methods
// studentSchema.methods.isUserExixst = async function (id: string) {
//   const exisxtingUser = await Student.findOne({ id });
//   return exisxtingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
