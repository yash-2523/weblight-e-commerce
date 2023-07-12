import { IRequest } from "../helpers/requestInterface";
import { NextFunction, Response } from "express";
import { ExpressError } from "../helpers/customError";

const errorHandlerMiddleware = (
	err: Error,
	req: IRequest,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ExpressError) {
		res.status(err.status).json(err.toJSON());
	} else {
		next();
	}
};

export default errorHandlerMiddleware;
