import {Request, Response, NextFunction} from 'express'
export default async function errorLogger(error: Error, req: Request, res: Response, next: NextFunction){
    console.error(error.stack);
    next(error);
}