import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);

    process.exit(1);
  }
}
