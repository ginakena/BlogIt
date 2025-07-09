import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import verifyUserInformation from "../middleware/verifyUserInformation";
import verifyPasswordStrength from "../middleware/verifyPasswordStrength";
const router = Router();

router.post(
  "/register",
  verifyUserInformation,
  verifyPasswordStrength,
  registerUser
);

router.post("/login", loginUser);

export default router;

