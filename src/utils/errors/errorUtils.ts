import { AppError } from './AppError';
import { errorHandler } from './errorHandler';

export const throwError = (message: string, statusCode: number) => {
  throw new AppError(message, statusCode);
};

export const asyncHandler = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      return errorHandler.handleError(error);
    }
  };
};

// Common error messages
export const ErrorMessages = {
  NOT_FOUND: (resource: string) => `${resource} not found`,
  UNAUTHORIZED: 'You are not authorized to perform this action',
  INVALID_CREDENTIALS: 'Invalid email or password',
  VALIDATION_ERROR: 'Invalid input data',
  SERVER_ERROR: 'Something went wrong',
  DUPLICATE_ERROR: (field: string) => `${field} already exists`,
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  INVALID_FORMAT: (field: string) => `Invalid ${field} format`,
} as const;

// HTTP Status codes
export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
} as const; 