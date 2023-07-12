import { categoryModel } from "../../../models";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../../helpers/customError";
import { IRequest } from "../../../helpers/requestInterface";

export default class CategoryController {
    public static async createCategory(req: any, res: Response, next: NextFunction) {
        try{
            const { name } = req.body;

            const category = new categoryModel({
                name
            })

            await category.save();
            return res.status(200).json({
                success: true,
                message: "Category created",
                data: category
            })
        }catch(error: any){
            return next(new ExpressError("Unable to create category", 500, error))
        }
    }
    
    public static async updateCategory(req: any, res: Response, next: NextFunction) {
        try{
            const { name } = req.body;
            
            const category = await categoryModel.findById(req.params.categoryId);

            if(!category) {
                return next(new ExpressError("Category not found!", 404))
            }

            category.name = name;

            await category.save();
            return res.status(200).json({
                success: true,
                message: "Category updated",
                data: category
            })
        }catch(error: any){
            return next(new ExpressError("Unable to update category", 500, error))
        }
    }

    public static async deleteCategory(req: any, res: Response, next: NextFunction) {
        try{
            const category = await categoryModel.findById(req.params.categoryId);

            if(!category) {
                return next(new ExpressError("Category not found!", 404))
            }

            await category.remove();
            return res.status(200).json({
                success: true,
                message: "Category deleted",
            })
        }catch(error: any){
            return next(new ExpressError("Unable to delete category", 500, error))
        }
    }

    public static async getCategories(req: any, res: Response, next: NextFunction) {
        try{
            const categories = await categoryModel.find();

            return res.status(200).json({
                success: true,
                message: "Categories",
                data: categories
            })
        }catch(error: any){
            return next(new ExpressError("Unable to get categories", 500, error))
        }
    }

    public static async getCategory(req: any, res: Response, next: NextFunction) {
        try{
            const category = await categoryModel.findById(req.params.categoryId);

            if(!category) {
                return next(new ExpressError("Category not found!", 404))
            }

            return res.status(200).json({
                success: true,
                message: "Category",
                data: category
            })
        }catch(error: any){
            return next(new ExpressError("Unable to get category", 500, error))
        }
    }
}