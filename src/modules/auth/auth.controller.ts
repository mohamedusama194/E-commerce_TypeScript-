import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authService.signup(req.body);

    res.status(201).json({
      status: "success",
      token: data.token,
      data: data.user,
    });
  } catch (e) {
    next(e);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);

    res.status(200).json({
      status: "success",
      token: data.token,
      data: data.user,
    });
  } catch (e) {
    next(e);
  }
};

export const updatePasswordController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await authService.updatePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (e) {
    next(e);
  }
};
