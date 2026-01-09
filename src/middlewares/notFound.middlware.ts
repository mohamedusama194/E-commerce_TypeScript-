import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(`Route ${req.originalUrl} not found`, 404));
};

export default notFound;
