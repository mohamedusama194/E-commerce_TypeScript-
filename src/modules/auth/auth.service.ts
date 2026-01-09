import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../config/database";
import { User } from "../user/user.model";
import ApiError from "../../utils/apiError";

const userRepo = AppDataSource.getRepository(User);

const signToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
};

export const signup = async (data: any) => {
  const { name, email, password, phone } = data;

  if (!name || !email || !password) {
    throw new ApiError("name, email and password are required", 400);
  }

  const exists = await userRepo.findOne({ where: { email } });
  if (exists) {
    throw new ApiError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = userRepo.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  await userRepo.save(user);

  const token = signToken(user.id);

  return { user, token };
};

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new ApiError("Email and password are required", 400);
  }

  const user = await userRepo.findOne({ where: { email } });
  if (!user) {
    throw new ApiError("credentials غلط", 401);
  }

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) {
    throw new ApiError("credentials غلط", 401);
  }

  const token = signToken(user.id);

  return { user, token };
};


export const updatePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  if (!currentPassword || !newPassword) {
    throw new ApiError("currentPassword and newPassword are required", 400);
  }

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isCorrect = await bcrypt.compare(currentPassword, user.password);
  if (!isCorrect) {
    throw new ApiError("credentials غلط", 401);
  }

  user.password = await bcrypt.hash(newPassword, 12);
  await userRepo.save(user);

  return;
};