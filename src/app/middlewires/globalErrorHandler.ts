/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import iGenericErrorMessage from '../../interfaces/error';
import handleValidationError from '../../errors/handleValidationError';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { errorlogger } from '../../shared/logger';
import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  config.env === 'development'
    ? console.log('Global Error Handler ', error)
    : errorlogger.error('globalErrorHandler ', error);

  // res.status(400).json({err : err})

  let statusCode = 500;

  let message = 'Something Went Wrong!';

  let errorMessages: iGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplyfiedError = handleValidationError(error);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorMessages = simplyfiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplyfiedError = handleZodError(error);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorMessages = simplyfiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statuscode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  // next();
};

export default globalErrorHandler;
