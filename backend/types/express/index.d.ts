import { IUserDocument } from "@/models/user";

declare namespace Express {
    interface Request{
        user?: IUserDocument | null
    }
}