import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError";
import { AppDataSource } from "../config/database";
import { User } from "../modules/user/user.model";

export const protect = async (
  req: any,
  _res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError("Not logged in", 401));
  }

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { id: decoded.id } });

  if (!user) {
    return next(new ApiError("User no longer exists", 401));
  }

  req.user = user;
  next();
};
