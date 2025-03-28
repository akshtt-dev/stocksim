const mongoose = require("mongoose");
const updateMarketData = require("../utils/updateMarketData.js");
const LastUpdate = require("../models/lastUpdate.js");
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const lastUpdate = await LastUpdate.findOne({});
    const currentDate = new Date();

    if (!lastUpdate) {
      await LastUpdate.create({ lastUpdate: currentDate });
      await updateMarketData();
    } else {
      const diffHours = Math.ceil(
        (currentDate - lastUpdate.lastUpdate) / (1000 * 60 * 60)
      );
      if (diffHours > 1) {
        await updateMarketData();
        await LastUpdate.updateOne({}, { lastUpdate: currentDate });
      }
    }

    setInterval(async () => {
      console.log("⏳ Running scheduled market data update...");
      await updateMarketData();
      await LastUpdate.updateOne({}, { lastUpdate: new Date() });
    }, 3600000);
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}

module.exports = connectDB;
