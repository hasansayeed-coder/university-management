// import { Schema, model, connect } from 'mongoose';

import { Model } from 'mongoose';

type IAcademicSemesterMonths =
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

type IAcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';

type IAcademicSemesterCodes = '01' | '02' | '03';

type IAcademicSemester = {
  title: 'Autumn' | 'Summer' | 'Fall';
  year: string;
  code: '01' | '02' | '03';
  startMonth: IAcademicSemesterMonths;
  endMonth: IAcademicSemesterMonths;
};

type IAcademicSemesterFilters = {
  searchTerm?: string;
};

type AcademicSemesterModel = Model<IAcademicSemester>;

export {
  IAcademicSemester,
  AcademicSemesterModel,
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterFilters,
};
