import { productModel, orderModel } from "../../../models";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../../helpers/customError";
import { IRequest } from "../../../helpers/requestInterface";

export default class OrderController {
    public static async createOrder(req: any, res: Response, next: NextFunction) {
        try{
            const { productId, quantity } = req.body;

            const order = new orderModel({
                userId: req.user._id,
                productId: productId,
                quantity: quantity
            })

            await order.save();
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