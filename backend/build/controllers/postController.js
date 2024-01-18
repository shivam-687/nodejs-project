"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPostsOverview = exports.listPostsByGeoLoc = exports.listPosts = exports.getPost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const config_1 = __importDefault(require("@/config"));
const post_1 = require("@/models/post");
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, body, isActive, geoLocation } = req.body;
            const { _id: userId } = req.user;
            const newPost = new post_1.PostModel({
                title,
                body,
                user: userId,
                isActive,
                geoLocation,
            });
            yield newPost.save();
            res.json({ message: 'Post created successfully', post: newPost });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.createPost = createPost;
function updatePost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, body, isActive, geoLocation } = req.body;
            const postId = req.params.id;
            const user = req.user;
            const post = yield post_1.PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            if (post.user.toString() !== (user === null || user === void 0 ? void 0 : user._id.toString())) {
                return res.status(403).json({ error: 'Unauthorized to update this post' });
            }
            post.title = title || post.title;
            post.body = body || post.body;
            post.isActive = isActive !== undefined ? isActive : post.isActive;
            post.geoLocation = geoLocation || post.geoLocation;
            yield post.save();
            res.json({ message: 'Post updated successfully', post });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.updatePost = updatePost;
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postId = req.params.id;
            const post = yield post_1.PostModel.findById(postId);
            const user = req.user;
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            // Ensure the user is the owner of the post
            if (post.user.toString() !== user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized to delete this post' });
            }
            yield post.deleteOne({ _id: postId });
            res.json({ message: 'Post deleted successfully' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.deletePost = deletePost;
function getPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postId = req.params.id;
            const post = yield post_1.PostModel.findById(postId);
            //   const user = req.user as IUserDocument;  //When only owner user can access  
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            // When only owner user can access  
            //   if (post.user.toString() !== req.user._id.toString()) {
            //     return res.status(403).json({ error: 'Unauthorized to access this post' });
            //   }
            res.json({ post });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getPost = getPost;
function listPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, limit = config_1.default.limit, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
            const skip = (Number(page) - 1) * Number(limit);
            const query = {};
            // Add additional filters as needed
            if (req.query.isActive !== undefined) {
                query.isActive = req.query.isActive === 'true';
            }
            const posts = yield post_1.PostModel.find(query)
                .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('user', ["name", "email"]);
            const totalCount = yield post_1.PostModel.countDocuments(query);
            res.json({
                posts,
                totalCount,
                totalPages: Math.ceil(totalCount / Number(limit)),
                currentPage: Number(page),
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.listPosts = listPosts;
function listPostsByGeoLoc(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page = 1, limit = config_1.default.limit, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
            const skip = (Number(page) - 1) * Number(limit);
            const query = {};
            // Add additional filters as needed
            if (req.query.isActive !== undefined) {
                query.isActive = req.query.isActive === 'true';
            }
            // Parse latitude and longitude from query parameters
            const { latitude, longitude, maxDistance = 100 } = req.query;
            if (latitude && longitude) {
                const maxDistanceInKm = Number(maxDistance);
                query.geoLocation = {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [Number(longitude), Number(latitude)],
                        },
                        $maxDistance: maxDistanceInKm * 1000, // Convert km to meters
                    },
                };
            }
            const posts = yield post_1.PostModel.find(query)
                .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
                .skip(skip)
                .limit(Number(limit))
                .populate('user', ["name", "email"]);
            const totalCount = yield post_1.PostModel.countDocuments(query);
            res.json({
                posts,
                totalCount,
                totalPages: Math.ceil(totalCount / Number(limit)),
                currentPage: Number(page),
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.listPostsByGeoLoc = listPostsByGeoLoc;
function getUserPostsOverview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id } = req === null || req === void 0 ? void 0 : req.user;
            const activeCount = yield post_1.PostModel.countDocuments({ user: _id, isActive: true });
            const inactiveCount = yield post_1.PostModel.countDocuments({ user: _id, isActive: false });
            res.json({
                activePosts: activeCount,
                inActivePosts: inactiveCount,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getUserPostsOverview = getUserPostsOverview;
