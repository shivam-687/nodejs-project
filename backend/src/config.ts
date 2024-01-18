import dotenv from 'dotenv';
dotenv.config({path: '.env'});

export default {
    port: process.env.PORT || 3001,
    mongodb_uri: process.env.MONGODB_URI||'',
    jwt_secret: 'nodejs-auth',
    limit: 10
}