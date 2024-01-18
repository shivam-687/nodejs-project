import passport from 'passport';
import {Request, Response, NextFunction} from 'express'
import { IUser } from '@/models/user';

const requireLocalAuth = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(422).send(info);
    }
    req.user = user as IUser;
    
    next();
  })(req, res, next);
};

export default requireLocalAuth;