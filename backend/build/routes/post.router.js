"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("@/controllers/postController");
const requireJwtAuth_1 = __importDefault(require("@/middleware/requireJwtAuth"));
const validateSchema_1 = __importDefault(require("@/middleware/validateSchema"));
const post_schema_1 = require("@/request-schema/post-schema");
const postRouter = (0, express_1.Router)();
postRouter.get('/', postController_1.listPosts);
postRouter.get('/byGeoLoc', postController_1.listPostsByGeoLoc); // This route is sepcially for get post by latitude, longitude and maxDistance. by default maxDistance=100km
postRouter.get('/overview', requireJwtAuth_1.default, postController_1.getUserPostsOverview);
postRouter.get('/:id', postController_1.getPost);
postRouter.post('/', [requireJwtAuth_1.default, (0, validateSchema_1.default)(post_schema_1.CreatePostInputSchema)], postController_1.createPost);
postRouter.put('/:id', [requireJwtAuth_1.default, (0, validateSchema_1.default)(post_schema_1.UpdatePostInputSchema)], postController_1.updatePost);
postRouter.delete('/:id', [requireJwtAuth_1.default], postController_1.deletePost);
exports.default = postRouter;
