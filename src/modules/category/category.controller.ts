import { Request, Response, NextFunction } from "express";
import * as categoryService from "./category.service";

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.createCategory(req.body.name);
    res.status(201).json({ status: "success", data: category });
  } catch (e) {
    next(e);
  }
};

export const getCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: categories,
    });
  } catch (e) {
    next(e);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.getCategoryById(
      Number(req.params.id)
    );
    res.status(200).json({ status: "success", data: category });
  } catch (e) {
    next(e);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.updateCategory(
      Number(req.params.id),
      req.body.name
    );
    res.status(200).json({ status: "success", data: category });
  } catch (e) {
    next(e);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await categoryService.deleteCategory(Number(req.params.id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
