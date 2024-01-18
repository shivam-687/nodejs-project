import { Router } from "express";
import { 
    createPost, 
    deletePost, 
    getPost, 
    getUserPostsOverview, 
    listPosts, 
    listPostsByGeoLoc, 
    updatePost 
} from "@/controllers/postController";
import requireJwtAuth from "@/middleware/requireJwtAuth";
import validateSchema from "@/middleware/validateSchema";
import { 
    CreatePostInputSchema, 
    UpdatePostInputSchema 
} from "@/request-schema/post-schema";



const postRouter = Router();

postRouter.get('/', listPosts);
postRouter.get('/byGeoLoc', listPostsByGeoLoc); // This route is sepcially for get post by latitude, longitude and maxDistance. by default maxDistance=100km
postRouter.get('/overview', requireJwtAuth, getUserPostsOverview)
postRouter.get('/:id', getPost);
postRouter.post('/', [requireJwtAuth, validateSchema(CreatePostInputSchema)], createPost);
postRouter.put('/:id', [requireJwtAuth, validateSchema(UpdatePostInputSchema)], updatePost);
postRouter.delete('/:id', [requireJwtAuth], deletePost);

export default postRouter;