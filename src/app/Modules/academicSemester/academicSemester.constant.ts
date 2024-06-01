import {
  AcademicSemesterNameCode,
  T_AcademicCode,
  T_AcademicName,
  T_Month,
} from './academicSemester.interface';

export const months: T_Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterName: T_AcademicName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: T_AcademicCode[] = ['01', '02', '03'];

export const academicSemesterNameCode: AcademicSemesterNameCode = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
