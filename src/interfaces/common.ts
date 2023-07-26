import iGenericErrorMessage from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type iGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: iGenericErrorMessage[];
};
