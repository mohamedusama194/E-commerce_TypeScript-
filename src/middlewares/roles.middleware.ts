import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";

export const restrictTo = (...roles: string[]) => {
  return (req: any, _res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
