import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller";

import { protect } from "../../middlewares/auth.middleware";
import { restrictTo } from "../../middlewares/roles.middleware";

const router = Router();

router
  .route("/")
  .get(getCategories)
  .post(protect, restrictTo("admin"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .patch(protect, restrictTo("admin"), updateCategory)
  .delete(protect, restrictTo("admin"), deleteCategory);

export default router;
