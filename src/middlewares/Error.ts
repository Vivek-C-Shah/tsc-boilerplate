import { Request, Response, NextFunction } from "express";
class CustomError extends Error {
  statusCode?: number;

  constructor(message?: string, statusCode?: number) {
    super(message); // Pass the message to the Error constructor
    this.statusCode = statusCode;
  }
}

const ErrorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  console.error(err);
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
