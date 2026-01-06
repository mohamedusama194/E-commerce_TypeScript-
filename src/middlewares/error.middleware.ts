import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  statusCode?: number;
  status?: string;
}

const sendErrorForDev = (err: AppError, res: Response) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || "error",
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err: AppError, res: Response) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
  });
};

const globalError = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

export default globalError;
