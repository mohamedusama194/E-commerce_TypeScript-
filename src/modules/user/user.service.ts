import { AppDataSource } from "../../config/database";
import { User } from "./user.model";
import ApiError from "../../utils/apiError";

const userRepo = AppDataSource.getRepository(User);

export const getAllUsers = async () => {
  return await userRepo.find();
};

export const getUserById = async (id: number) => {
  const user = await userRepo.findOne({ where: { id } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }
  return user;
};

export const updateUser = async (id: number, data: Partial<User>) => {
  const user = await getUserById(id);
  Object.assign(user, data);
  return await userRepo.save(user);
};

export const deleteUser = async (id: number) => {
  const user = await getUserById(id);
  await userRepo.remove(user);
};

export const deleteMe = async (userId: number) => {
  await userRepo.delete(userId);
};

export const updateMe = async (
  userId: number,
  data: { name?: string; phone?: string }
) => {
  await userRepo.update(userId, {
    name: data.name,
    phone: data.phone,
  });

  return await userRepo.findOne({ where: { id: userId } });
};
