import { categoryModel, productModel, cartModel } from "../../../models";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../../helpers/customError";
import { IRequest } from "../../../helpers/requestInterface";

export default class CartController {
    public static async addToCart(req: any, res: Response, next: NextFunction) {
        try{
            const { productId, quantity } = req.body;

            const product = await productModel.findById(productId);

            if(!product) {
                return next(new ExpressError("Product not found!", 404))
            }

            const cart = await cartModel.findOne({ userId: req.user._id, productId: productId });
            if(cart) {
                cart.quantity = quantity;
                await cart.save();
                return res.status(200).json({
                    success: true,
                    message: "Cart updated",
                    data: cart
                })
            }

            const newCart = new cartModel({
                userId: req.user._id,
                productId: productId,
                quantity: quantity
            })

            await newCart.save();

            return res.status(200).json({
                success: true,
                message: "Item Added to the cart",
                data: newCart
            })
        }catch(error: any){
            return next(new ExpressError("Unable to add to cart", 500, error))
        }
    }

    public static async getCart(req: any, res: Response, next: NextFunction) {
        try{
            const cart = await cartModel.find({ userId: req.user._id }).populate("productId")

            return res.status(200).json({
                success: true,
                message: "Cart",
                data: cart
            })
        }catch(error: any){
            console.log(error)
            return next(new ExpressError("Unable to get cart", 500, error))
        }
    }

    public static async deleteCart(req: any, res: Response, next: NextFunction) {
        try{
            const cart = await cartModel.findById(req.params.cartId);

           

            if(!cart) {
                return next(new ExpressError("Cart not found!", 404))
            }

            if(cart?.userId.toString() !== req.user._id.toString()){
                return next(new ExpressError("permission denied", 403))
            }

            await cart.remove();
            return res.status(200).json({
                success: true,
                message: "Cart deleted",
                data: cart
            })
        }catch(error: any){
            return next(new ExpressError("Unable to delete cart", 500, error))
        }
    }

    public static async deleteAllCart(req: any, res: Response, next: NextFunction) {
        try{
            const cart = await cartModel.deleteMany({ user: req.user._id });

            return res.status(200).json({
                success: true,
                message: "Cart deleted",
                data: cart
            })
        }catch(error: any){
            return next(new ExpressError("Unable to delete cart", 500, error))
        }
    }

    public static async updateCart(req: any, res: Response, next: NextFunction) {
        try{
            const { quantity } = req.body;
            
            const cart = await cartModel.findById(req.params.cartId);

            

            if(!cart) {
                return next(new ExpressError("Cart not found!", 404))
            }

            if(cart?.userId.toString() !== req.user._id.toString()){
                return next(new ExpressError("permission denied", 403))
            }

            cart.quantity = quantity;

            await cart.save();
            return res.status(200).json({
                success: true,
                message: "Cart updated",
                data: cart
            })
        }catch(error: any){
            return next(new ExpressError("Unable to update cart", 500, error))
        }
    }
}