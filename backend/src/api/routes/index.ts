import { Router } from "express";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import categoryRoutes from "./categoryRoutes";
import cartRoutes from "./cartRoutes";
import orderRoutes from "./orderRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);


export default router;
