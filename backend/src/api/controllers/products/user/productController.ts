import { productModel } from "../../../models";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../../helpers/customError";
import { IRequest } from "../../../helpers/requestInterface";
import { Types } from "mongoose";

export default class ProductController {
    public static async getProducts(req: IRequest, res: Response, next: NextFunction) {
        try{
            const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
            const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : 10000000000000;
            let category: any = req.query.category ? req.query.category.toString() : null;
            let matchFilter:any = {
                price: {
                    $gte: minPrice,
                    $lte: maxPrice
                },
            }

            if(category !== null){
                category = new Types.ObjectId(category)
                matchFilter.category = category
            }

            //use aggregate to get the products
            const products = await productModel.aggregate([
                {
                    $match: matchFilter
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
            ])

            return res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: products
            })
        }catch(error: any){
            return next(new ExpressError("Unable to fetch products", 500, error))
        }
    }

    public static async getProduct(req: IRequest, res: Response, next: NextFunction) {
        try{
            const product = await productModel.findById(req.params.productId).populate("category");
            if(!product) {
                return next(new ExpressError("Product not found!", 404))
            }
            return res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: product
            })
        }catch(error: any){
            return next(new ExpressError("Unable to fetch product", 500, error))
        }
    }
}