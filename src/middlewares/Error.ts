import type { Request, Response, NextFunction } from "express";
import type ErrorHandler from "../utils/errorHandler";

const ErrorMiddleware = (
  err: ErrorHandler,
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
