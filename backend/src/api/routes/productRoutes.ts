import { adminMiddleware, authMiddleware } from "../middlewares";
import { Router } from "express";
import { ProductAdminController, ProductController } from "../controllers";
import fileUpload from "../helpers/fileUpload";
import { MulterError } from "multer";
import { Request, Response, NextFunction } from "express";


const uploader: any = function (req: any, res: Response, next: NextFunction) {
	const upload = fileUpload.fields([
		{
			name: "productImages",
			maxCount: 10,
		},
	]);

	return upload(req, res, function (err) {
		if (err instanceof MulterError) {
			console.log("Multer", err);
		} else if (err) {
			console.log("Server", err);
		}

		next();
	});
};

const router = Router();


router.get("/", authMiddleware,ProductController.getProducts);
router.get("/:productId", authMiddleware, ProductController.getProduct);
router.post("/admin", adminMiddleware, uploader, ProductAdminController.createProduct);
router.put("/admin/:productId", adminMiddleware, uploader, ProductAdminController.updateProduct);
router.delete("/admin/:productId/image/:imageId", adminMiddleware, ProductAdminController.removeImage);
router.delete("/admin/:productId", adminMiddleware, ProductAdminController.deleteProduct);


export default router;