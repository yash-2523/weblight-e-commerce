import { userModel } from "../models";
import { Request, Response, NextFunction } from "express";
import { ExpressError } from "../helpers/customError";
import jwt from "jsonwebtoken";



export default async function authMiddleware(
    req: any,
    res: Response,
    next: NextFunction
) {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader === "undefined") {
        return res.status(403).json({
            success: false,
            message: "Forbidden"
        });
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const token = bearerToken;
    if (!token) {
        return res.status(401).json({ success: false,message: "No token, authorization denied" });
    }

    try {
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET || "TestSecret");
        let user = await userModel.findById(decoded._id);
        if(!user){
            return next(new ExpressError("Invalid Token", 400))
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
}
