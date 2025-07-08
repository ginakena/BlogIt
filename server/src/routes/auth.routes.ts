import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
// router.post("/login", loginUser); // create login later

export default router;
