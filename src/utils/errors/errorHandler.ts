import { NextResponse } from 'next/server';
import { AppError } from './AppError';
import { ZodError } from 'zod';
import { MongooseError } from 'mongoose';

interface ErrorResponse {
  status: string;
  message: string;
  error?: any;
  stack?: string;
}

class ErrorHandler {
  private isDevelopment = process.env.NODE_ENV === 'development';

  // Handle known operational errors
  private handleAppError(err: AppError): ErrorResponse {
    return {
      status: err.status,
      message: err.message,
      ...(this.isDevelopment && { stack: err.stack }),
    };
  }

  // Handle Mongoose validation errors
  private handleMongooseValidationError(err: MongooseError): ErrorResponse {
    return {
      status: 'fail',
      message: 'Invalid input data',
      error: err,
      ...(this.isDevelopment && { stack: err.stack }),
    };
  }

  // Handle Mongoose duplicate key errors
  private handleMongooseDuplicateKeyError(err: any): ErrorResponse {
    const field = Object.keys(err.keyValue)[0];
    return {
      status: 'fail',
      message: `Duplicate field value: ${field}. Please use another value`,
      ...(this.isDevelopment && { stack: err.stack }),
    };
  }

  // Handle Zod validation errors
  private handleZodError(err: ZodError): ErrorResponse {
    return {
      status: 'fail',
      message: 'Validation error',
      error: err.errors,
      ...(this.isDevelopment && { stack: err.stack }),
    };
  }

  // Handle JWT errors
  private handleJWTError(): ErrorResponse {
    return {
      status: 'fail',
      message: 'Invalid token. Please log in again',
    };
  }

  private handleJWTExpiredError(): ErrorResponse {
    return {
      status: 'fail',
      message: 'Your token has expired. Please log in again',
    };
  }

  // Main error handler
  public handleError(err: any): NextResponse {
    let errorResponse: ErrorResponse;
    let statusCode: number = 500;

    // Handle different types of errors
    if (err instanceof AppError) {
      errorResponse = this.handleAppError(err);
      statusCode = err.statusCode;
    } else if (err instanceof ZodError) {
      errorResponse = this.handleZodError(err);
      statusCode = 400;
    } else if (err.name === 'ValidationError') {
      errorResponse = this.handleMongooseValidationError(err);
      statusCode = 400;
    } else if (err.code === 11000) {
      errorResponse = this.handleMongooseDuplicateKeyError(err);
      statusCode = 400;
    } else if (err.name === 'JsonWebTokenError') {
      errorResponse = this.handleJWTError();
      statusCode = 401;
    } else if (err.name === 'TokenExpiredError') {
      errorResponse = this.handleJWTExpiredError();
      statusCode = 401;
    } else {
      // Handle unknown errors
      errorResponse = {
        status: 'error',
        message: this.isDevelopment ? err.message : 'Something went wrong',
        ...(this.isDevelopment && { stack: err.stack }),
      };
    }

    return NextResponse.json(errorResponse, { status: statusCode });
  }
}

export const errorHandler = new ErrorHandler(); 