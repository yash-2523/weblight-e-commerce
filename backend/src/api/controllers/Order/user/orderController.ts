import { productModel, orderModel, cartModel } from "../../../models";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../../helpers/customError";
import { IRequest } from "../../../helpers/requestInterface";

export default class OrderController {
    public static async createOrder(req: any, res: Response, next: NextFunction) {
        try{
            const { cartId } = req.body;

            let cart = await cartModel.findById(cartId);
            if(!cart) {
                return next(new ExpressError("Cart not found", 404))
            }

            const order = new orderModel({
                userId: req.user._id,
                productId: cart.productId,
                quantity: cart.quantity
            })

            await order.save();

            await cartModel.findByIdAndDelete(cartId);
            return res.status(200).json({
                success: true,
                message: "Ordered",
                data: order
            })
        }catch(error: any){
            return next(new ExpressError("Unable to create order", 500, error))
        }
    }

    public static async getOrders(req: any, res: Response, next: NextFunction) {
        try{
            const orders = await orderModel.find({ userId: req.user._id }).populate("productId");

            return res.status(200).json({
                success: true,
                message: "Orders",
                data: orders
            })
        }catch(error: any){
            return next(new ExpressError("Unable to get orders", 500, error))
        }
    }
}