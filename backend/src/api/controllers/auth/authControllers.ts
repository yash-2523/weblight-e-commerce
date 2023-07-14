import { userModel } from "../../models";
import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../../helpers/customError";
import { IRequest } from "../../helpers/requestInterface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AuthController {
    public static async register(req: IRequest, res: Response, next: NextFunction) {
        try{
            const { name, email, password, address, city, postalCode, country, state } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new userModel({
                name,
                email,
                password: hashedPassword,
                address,
                city,
                postalCode,
                country,
                state
            })

            await user.save();
            return res.status(200).json({
                success: true,
                message: "User registered Successfully!"
            })
        }catch(err: any) {
            // check if it is a mongodb repeatin key error
            if(err?.code === 11000) {
                return next(new ExpressError("Email already exists!", 400))
            }
            return next(new ExpressError("Unable to register user", 500, err))
        }
    }

    public static async login(req: IRequest, res: Response, next: NextFunction) {
        try{
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if(!user) {
                return next(new ExpressError("Invalid Credentials", 400))
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return next(new ExpressError("Invalid Credentials", 400))
            }
            const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
            return res.status(200).json({
                success: true,
                message: "User logged in successfully!",
                token
            })
        }catch(err: any) {
            return next(new ExpressError("Unable to login user", 500, err))
        }
    }

    public static async getUser(req: IRequest, res: Response, next: NextFunction) {
        return res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: req.user
        })
    }
}