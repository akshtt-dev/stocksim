import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import updateMarketData from "../utils/updateMarketData.js";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
    if (!process.env.PRODUCTION) await updateMarketData();
    setInterval(async () => {
      await updateMarketData();
      console.log("✅ Updated market data");
    }, 1000 * 60 * 60);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}

export default connectDB;
