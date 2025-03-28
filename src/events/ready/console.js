import { ActivityType } from "discord.js";
export default async (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("Trade Market", { type: ActivityType.Watching });
}

