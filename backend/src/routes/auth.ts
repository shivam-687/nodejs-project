import requireLocalAuth from "@/middleware/requireLocalAuth";
import { UserController } from "../controllers/userController";
import { Router} from "express";
import validateSchema from "@/middleware/validateSchema";
import { CreateUserInputSchema } from "@/request-schema/user-schema";

const userController = new UserController();
const authRouter = Router();


authRouter.post('/register', validateSchema(CreateUserInputSchema),  userController.registerUser);
authRouter.post('/login', requireLocalAuth,  userController.authenticateUser);


export default authRouter;