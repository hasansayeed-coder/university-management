import { ZodError, ZodIssue } from 'zod';
import { iGenericErrorResponse } from '../interfaces/common';
import iGenericErrorMessage from '../interfaces/error';

const handleZodError = (error: ZodError): iGenericErrorResponse => {
  const statusCode = 400;

  // console.log(error.issues.map((issue)=> issue.path) , ' This is Zod Error') ;

  const errors: iGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
