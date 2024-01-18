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
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("./models/user");
const post_1 = require("./models/post");
// Sample user data
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
];
// Sample post data
const posts = [
    {
        title: 'Post 1',
        body: 'This is the body of post 1.',
        user: null, // Placeholder for the user ID
        isActive: true,
        geoLocation: {
            type: 'Point',
            coordinates: [40.7128, -74.0060], // New York coordinates
        },
    },
    {
        title: 'Post 2',
        body: 'This is the body of post 2.',
        user: null, // Placeholder for the user ID
        isActive: true,
        geoLocation: {
            type: 'Point',
            coordinates: [34.0522, -118.2437], // Los Angeles coordinates
        },
    },
    // Add more posts as needed
];
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Clear existing data
        yield user_1.User.deleteMany({});
        yield post_1.PostModel.deleteMany({});
        // Seed users
        const createdUsers = yield user_1.User.create(users);
        // Update user references in post data
        posts.forEach((post, index) => {
            post.user = createdUsers[index]._id;
        });
        // Seed posts
        yield post_1.PostModel.create(posts);
        console.log('Demo data seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding demo data:', error);
    }
    finally {
        // Close the MongoDB connection
        mongoose_1.default.connection.close();
    }
});
// Run the seedData function
seedData();
