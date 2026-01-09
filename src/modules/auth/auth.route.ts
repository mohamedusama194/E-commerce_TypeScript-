import { Router } from "express";
import { signupController, loginController , updatePasswordController  } from "./auth.controller";
import { protect } from "../../middlewares/auth.middleware";
const router = Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.patch("/update-password", protect, updatePasswordController);

export default router;
