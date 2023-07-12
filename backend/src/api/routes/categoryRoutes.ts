import { adminMiddleware, authMiddleware } from "../middlewares";
import { Router } from "express";
import { CategoryController } from "../controllers";
const router = Router();


router.get("/", authMiddleware, CategoryController.getCategories);
router.get("/:categoryId", authMiddleware, CategoryController.getCategory);
router.post("/admin", adminMiddleware, CategoryController.createCategory);
router.put("/admin/:categoryId", adminMiddleware, CategoryController.updateCategory);
router.delete("/admin/:categoryId", adminMiddleware, CategoryController.deleteCategory);


export default router;