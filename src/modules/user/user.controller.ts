import { Request, Response, NextFunction } from "express";

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Public
 */
export const getUsers = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(200).json({
    status: "success",
    data: {
      users: [],
    },
  });
};
