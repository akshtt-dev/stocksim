import { Client, GatewayIntentBits } from "discord.js";
import { CommandKit } from "commandkit";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import redis from "../lib/redis.js";
import connectDB from "../lib/connectDB.js";
import config from "../config.js";

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

const __dirname = path.dirname(fileURLToPath(import.meta.url));


new CommandKit({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
  // validationsPath: path.join(__dirname, 'validations'),
  devGuildIds: config.devGuildIds,
  devUserIds: config.devUserIds,
  devRoleIds: config.devRoleIds,
  // skipBuiltInValidations: true,
  bulkRegister: true,
});

client.login(process.env.TOKEN);
