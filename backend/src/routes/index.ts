import { Router } from "express";
import authRouter from "./auth";
import postRouter from "./post.router";


const router = Router();


router.use('/auth', authRouter);
router.use('/api/posts', postRouter);


export default router;