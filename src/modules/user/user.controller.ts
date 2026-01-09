import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";



export const getUsersController = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ status: "success", results: users.length, data: users });
  } catch (e) {
    next(e);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.status(200).json({ status: "success", data: user });
  } catch (e) {
    next(e);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.status(200).json({ status: "success", data: user });
  } catch (e) {
    next(e);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export const deleteMeController = async (req: any,
  res: Response,
  next: NextFunction) => {
  try {
    await userService.deleteMe(req.user.id);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

export const updateMeController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await userService.updateMe(req.user.id, req.body);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};
