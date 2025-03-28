require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");
const redis = require("../lib/redis.js");
const connectDB = require("../lib/connectDB.js");

// Connect To Redis
(async () => {
  try {
    await redis.connect();
    console.log("Connected to Redis!");
  } catch (err) {
    console.error("Redis Connection Error:", err);
  }
})();

// Connect To MongoDB
connectDB();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
  ],
});
new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  testServer: process.env.TEST_SERVER,
});

client.login(process.env.TOKEN);

