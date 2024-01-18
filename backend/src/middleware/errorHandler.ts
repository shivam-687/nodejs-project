import {Request, Response, NextFunction} from 'express'
export default async function errorHandler(err: any, req: Request, res: Response, next: NextFunction){
    const statusCode = err.status ?? 500;
	const message = err.message || "Something went wrong.";

	// returns error status code and message
	return res.status(statusCode).json({
		error: statusCode,
		message: message
	})
}