import { SlashCommandBuilder, MessageFlags } from "discord.js";
import User from "../../../models/User.js";

export default {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription("Create an account to start using the bot!"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const userId = interaction.user.id;
    const username = interaction.user.username;
    const user = await User.findOne({ userId });

    if (user) return await interaction.editReply("You already have an account!");

    const newuser = new User({
      userId,
      username,
    });

    await newuser.save();

    await interaction.editReply({
      content: `Account created successfully! Welcome, ${username}!`,
    });
  },
};
