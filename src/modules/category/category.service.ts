import { AppDataSource } from "../../config/database";
import { Category } from "./category.model";
import ApiError from "../../utils/apiError";

const categoryRepo = AppDataSource.getRepository(Category);

export const createCategory = async (name: string) => {
  if (!name) {
    throw new ApiError("Category name is required", 400);
  }

  const exists = await categoryRepo.findOne({ where: { name } });
  if (exists) {
    throw new ApiError("Category already exists", 400);
  }

  const category = categoryRepo.create({ name });
  return await categoryRepo.save(category);
};

export const getAllCategories = async () => {
  return await categoryRepo.find();
};

export const getCategoryById = async (id: number) => {
  const category = await categoryRepo.findOne({ where: { id } });
  if (!category) {
    throw new ApiError("Category not found", 404);
  }
  return category;
};

export const updateCategory = async (
  id: number,
  name: string
) => {
  const category = await getCategoryById(id);

  category.name = name ?? category.name;
  return await categoryRepo.save(category);
};

export const deleteCategory = async (id: number) => {
  const category = await getCategoryById(id);
  await categoryRepo.remove(category);
};
