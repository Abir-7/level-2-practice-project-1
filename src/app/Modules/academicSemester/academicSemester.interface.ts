export type T_Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type T_AcademicName = 'Autumn' | 'Summmer' | 'Fall';
export type T_AcademicCode = '01' | '02' | '03';

export type AcademicSemesterNameCode = {
  [key: string]: string;
};

export interface T_AcademicSemester {
  name: T_AcademicName;
  code: T_AcademicCode;
  year: string;
  startMonth: T_Month;
  endMonth: T_Month;
}
