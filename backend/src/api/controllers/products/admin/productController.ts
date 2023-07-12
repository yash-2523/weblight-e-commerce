import { productModel, categoryModel } from "../../../models";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../../helpers/customError";
import { IRequest } from "../../../helpers/requestInterface";
import { Types } from "mongoose";

export default class ProductAdminController {
    public static async createProduct(req: any, res: Response, next: NextFunction) {
        try{
            const { name, description, price, category } = req.body;

            let isCategory = await categoryModel.findById(category);
            if(!isCategory) {
                return next(new ExpressError("Category not found!", 404))
            }

            const product: any = new productModel({
                name,
                description,
                price: parseFloat(price),
                category,
                images: []
            })

            if(req.files?.productImages && req.files?.productImages.length > 0) {
                req.files.productImages.forEach((image: any) => {
                    product.images.push({
                        fileName: image.filename
                    })
                })
            }
            
            await product.save();
            return res.status(200).json({
                success: true,
                message: "Product created",
                data: product
            })
        }catch(error: any){
            return next(new ExpressError("Unable to create product", 500, error))
        }
    }

    public static async updateProduct(req: any, res: Response, next: NextFunction) {
        try{
            const { name, description, price, category } = req.body;
            
            const product: any = await productModel.findById(req.params.productId);

            let isCategory = await categoryModel.findById(category);
            if(!isCategory) {
                return next(new ExpressError("Category not found!", 404))
            }

            if(!product) {
                return next(new ExpressError("Product not found!", 404))
            }

            product.name = name;
            product.description = description;
            product.price = price;
            product.category = category;

            if(req.files?.productImages && req.files?.productImages.length > 0) {
                req.files.productImages.forEach((image: any) => {
                    product.images.push({
                        fileName: image.filename
                    })
                })
            }
            
            await product.save();
            return res.status(200).json({
                success: true,
                message: "Product updated",
                data: product
            })
        }catch(error: any){
            return next(new ExpressError("Unable to update product", 500, error))
        }
    }

    public static async deleteProduct(req: any, res: Response, next: NextFunction) {
        try{
            const product = await productModel.findById(req.params.productId);

            if(!product) {
                return next(new ExpressError("Product not found!", 404))
            }

            await product.remove();
            return res.status(200).json({
                success: true,
                message: "Product deleted",
                data: product
            })
        }catch(error: any){
            return next(new ExpressError("Unable to delete product", 500, error))
        }
    }

    public static async removeImage(req: any, res: Response, next: NextFunction) {
        try{
            const product: any = await productModel.findById(new Types.ObjectId(req.params.productId));

            if(!product) {
                return next(new ExpressError("Product not found!", 404))
            }

            let flag = false;
            for(let i=0;i<product.images.length;i++){
                if(product.images[i]._id.toString() == req.params.imageId){
                    flag = true;
                    break;
                }
            }

            if(!flag){
                return next(new ExpressError("Image Not found", 404));
            }

            product.images = product.images.filter((image: any) => image._id.toString() !== req.params.imageId);
            await product.save();

            return res.status(200).json({
                success: true,
                message: "Image deleted",
                data: product
            })
        }catch(error: any){
            return next(new ExpressError("Unable to delete image", 500, error))
        }
    }
}