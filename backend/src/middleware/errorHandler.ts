import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.js';

// Extend Express Request type to include user
interface RequestWithUser extends Request {
  user?: any; // Replace 'any' with your user type if available
}

// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  err: Error | ApiError,
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    user: req.user,
    ip: req.ip,
  });

  // If it's an operational error (our custom ApiError)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // For unknown errors, don't leak error details in production
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

  // In development, send the full error
  return res.status(500).json({
    status: 'error',
    message: err.message,
    stack: err.stack,
  });
}; 