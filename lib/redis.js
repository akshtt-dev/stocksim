import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  username: process.env.REDIS_USERNAME || "default",
  password: process.env.REDIS_PASSWORD || null,
  db: process.env.REDIS_DB || 0,
  lazyConnect: true,
  enableReadyCheck: true,
  retryStrategy: (times) => {
    return Math.min(times * 100, 3000);
  },
  reconnectOnError: (err) => {
    return err.code === "ECONNREFUSED" || err.code === "ECONNRESET";
  },
});

export default redis;
