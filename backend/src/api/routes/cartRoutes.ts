import { authMiddleware } from "../middlewares";
import { Router } from "express";
import { CartController } from "../controllers";
const router = Router();


router.get("/", authMiddleware, CartController.getCart);
router.post("/", authMiddleware, CartController.addToCart);
router.put("/:cartId", authMiddleware, CartController.updateCart);
router.delete("/delete-all", authMiddleware, CartController.deleteAllCart);
router.delete("/:cartId", authMiddleware, CartController.deleteCart);


export default router;