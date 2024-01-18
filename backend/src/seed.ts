import mongoose from 'mongoose';
import { User } from './models/user';
import { PostModel } from './models/post';



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

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await PostModel.deleteMany({});

    // Seed users
    const createdUsers = await User.create(users);

    // Update user references in post data
    posts.forEach((post, index) => {
      post.user = createdUsers[index]._id;
    });

    // Seed posts
    await PostModel.create(posts);

    console.log('Demo data seeded successfully!');
  } catch (error) {
    console.error('Error seeding demo data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Run the seedData function
seedData();
