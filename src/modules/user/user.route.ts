import { Router } from "express";
import {
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
  deleteMeController, 
  updateMeController
} from "./user.controller";
import {restrictTo} from "../../middlewares/roles.middleware";
import {protect} from "../../middlewares/auth.middleware";
const router = Router();
router.use(protect);
router.route("/")
  .get(restrictTo("admin"), getUsersController);

router.route("/:id")
  .get(getUserController)
  .patch(updateUserController)
  .delete(restrictTo("admin"),deleteUserController)
;
router.route("/me").delete(deleteMeController).patch(updateMeController);

export default router;
