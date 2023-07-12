import { authMiddleware } from "../middlewares";
import { Router } from "express";
import { OrderController } from "../controllers";
const router = Router();


router.post("/", authMiddleware, OrderController.createOrder);
router.get("/", authMiddleware, OrderController.getOrders);

export default router;