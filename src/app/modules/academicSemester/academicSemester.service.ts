import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.const';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginatioHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  //summer !== 02
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }

  const resuit = await AcademicSemester.create(payload);

  return resuit;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters;

  const academicSemesterSearchableFields = ['title', 'code', 'year'];

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // const andConditions = [
  //     {
  //         $or : [
  //             {
  //                 title : {
  //                     $regex:searchTerm,
  //                     $options : 'i' ,
  //                 }
  //             },
  //             {
  //                 code : {
  //                     $regex : searchTerm ,
  //                     $options : 'i' ,
  //                 }
  //             } ,
  //             {
  //                 year : {
  //                     $regex : searchTerm ,
  //                     $options : 'i' ,
  //                 }
  //             }
  //         ]
  //     }

  // ]

  const { page, limit, skip, sortBy, sortOrder } =
    paginatioHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
};