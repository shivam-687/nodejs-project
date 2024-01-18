import config from '@/config';
import { Post, PostModel } from '@/models/post';
import { IUserDocument } from '@/models/user';
import { Request, Response, NextFunction } from 'express';
import { FilterQuery } from 'mongoose';


export async function createPost(req: Request, res: Response) {
    try {
        const { title, body, isActive, geoLocation } = req.body;

        const { _id: userId } = req.user as IUserDocument;

        const newPost: Post = new PostModel({
            title,
            body,
            user: userId,
            isActive,
            geoLocation,
        });

        await newPost.save();

        res.json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function updatePost(req: Request, res: Response, next: NextFunction) {
    try {
        const { title, body, isActive, geoLocation } = req.body;
        const postId = req.params.id;
        const user = req.user as IUserDocument;
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }


        if (post.user.toString() !== user?._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized to update this post' });
        }

        post.title = title || post.title;
        post.body = body || post.body;
        post.isActive = isActive !== undefined ? isActive : post.isActive;
        post.geoLocation = geoLocation || post.geoLocation;

        await post.save();

        res.json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function deletePost(req: Request, res: Response) {
    try {
        const postId = req.params.id;

        const post = await PostModel.findById(postId);
        const user = req.user as IUserDocument;

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Ensure the user is the owner of the post
        if (post.user.toString() !== user._id.toString()) {
            return res.status(403).json({ error: 'Unauthorized to delete this post' });
        }

        await post.deleteOne({ _id: postId });

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



export async function getPost(req: Request, res: Response) {
    try {
        const postId = req.params.id;

        const post = await PostModel.findById(postId);
        //   const user = req.user as IUserDocument;  //When only owner user can access  


        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // When only owner user can access  
        //   if (post.user.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ error: 'Unauthorized to access this post' });
        //   }

        res.json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function listPosts(req: Request, res: Response) {
    try {
        const { page = 1, limit = config.limit, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const query: any = {};

        // Add additional filters as needed
        if (req.query.isActive !== undefined) {
            query.isActive = req.query.isActive === 'true';
        }

        const posts = await PostModel.find(query)
            .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
            .skip(skip)
            .limit(Number(limit))
            .populate('user', ["name", "email"]);

        const totalCount = await PostModel.countDocuments(query);

        res.json({
            posts,
            totalCount,
            totalPages: Math.ceil(totalCount / Number(limit)),
            currentPage: Number(page),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function listPostsByGeoLoc(req: Request, res: Response) {
    try {
      const { page = 1, limit = config.limit, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const query: FilterQuery<Post> = {};

      // Add additional filters as needed
      if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === 'true';
      }

      // Parse latitude and longitude from query parameters
      const { latitude, longitude, maxDistance=100 } = req.query;
      if (latitude && longitude) {
        const maxDistanceInKm = Number(maxDistance);

        query.geoLocation = {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: maxDistanceInKm * 1000, // Convert km to meters
          },
        };
        
      }

      const posts = await PostModel.find(query)
        .sort({ [sortBy as string]: sortOrder === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(Number(limit))
        .populate('user', ["name", "email"]); 

      const totalCount = await PostModel.countDocuments(query);

      res.json({
        posts,
        totalCount,
        totalPages: Math.ceil(totalCount / Number(limit)),
        currentPage: Number(page),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }



  export async function getUserPostsOverview(req: Request, res: Response) {
    try {
      const {_id} = req?.user as IUserDocument;

      const activeCount = await PostModel.countDocuments({ user: _id, isActive: true });
      const inactiveCount = await PostModel.countDocuments({ user: _id, isActive: false });

      res.json({
        activePosts: activeCount,
        inActivePosts: inactiveCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }