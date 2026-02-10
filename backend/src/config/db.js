import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    // // localhost;
    // await mongoose.connect(process.env.MONGO_URI_LOCAL);
    // //live
    await mongoose.connect(process.env.MONGO_URI_LIVE);
    console.log("Database Connected");
  } catch (error) {
    console.log("Error in database connection", error);
  }
};

export default connectDB;
