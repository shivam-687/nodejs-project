

# Node.js Backend Project

This is a Node.js backend project created to fulfill the requirements of a job interview task. The project includes functionality for user authentication, post management, and geospatial queries.

## Project Setup

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone [repository_url]
   ```

2. Install dependencies:
   ```bash
   cd nodejs-backend-project
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the project root and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_uri
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Project Structure

The project is structured as follows:

- `src/` - Contains the source code.
  - `controllers/` - Implements the business logic.
  - `models/` - Defines Mongoose models.
  - `routes/` - Defines Express routes.
  - `middlewares/` - Custom middleware functions.
  - `config/` - Configuration files.
- `schemas/` - Contains Zod schemas for request validation.
- `app.ts` - Entry point of the application.
- `README.md` - Documentation.

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Authenticate a user and generate a JWT token.

### Posts
- `GET /posts` - Retrieve all posts.
- `GET /posts/byGeoLoc` - Retrieve posts based on latitude and longitude.
- `GET /posts/overview` - Get an overview of the count of active and inactive posts for the authenticated user.
- `GET /posts/:id` - Retrieve a specific post.
- `POST /posts` - Create a new post.
- `PUT /posts/:id` - Update a post.
- `DELETE /posts/:id` - Delete a post.

## Dependencies

- `express` - Web framework for Node.js.
- `mongoose` - MongoDB object modeling tool.
- `passport` - Authentication middleware for Node.js.
- `jsonwebtoken` - JSON Web Token (JWT) implementation.
- `zod` - Schema validation library.

## Contributing

Feel free to open an issue or submit a pull request for improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
```

Replace `[repository_url]`, `your_mongodb_connection_uri`, and `your_jwt_secret_key` with your actual repository URL, MongoDB connection URI, and JWT secret key, respectively.

Make sure to update the `License` section with the appropriate license you choose for your project.