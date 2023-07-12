import { authMiddleware } from "../middlewares";
import { Router } from "express";
import { AuthController } from "../controllers";
const router = Router();


router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/", authMiddleware, AuthController.getUser);
router.post("/admin-login", AuthController.adminLogin);

export default router;