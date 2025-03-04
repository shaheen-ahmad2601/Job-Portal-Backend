import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection established✅");
  } catch (error) {
    console.log("connection failed❌" + error.message);
  }
};

export default connectDB;
