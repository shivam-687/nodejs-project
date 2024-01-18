import mongoose from "mongoose";
import config from '../config'


export async function connectDB() {
  try {
    const db = await mongoose.connect(config.mongodb_uri);
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.error(error);
    process.exit();
  }
}