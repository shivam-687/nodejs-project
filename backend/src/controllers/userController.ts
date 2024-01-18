import bcrypt from 'bcrypt-nodejs'
import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../models/user'
import config from '../config'


export class UserController {

  public async registerUser(req: Request, res: Response): Promise<void> {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    try {
      const createdUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const token = jwt.sign({ email: createdUser.email }, config.jwt_secret);
      res.status(200).json({
        data: {
          email: createdUser.email,
          token
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      console.log(error);
    }
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    const user = req.user as any;
    const token = jwt.sign({ email: user.email }, config.jwt_secret);
      res.status(200).json({
        data: {
          email: user.email,
          token
        }
      });
  }
}