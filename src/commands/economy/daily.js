import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from "discord.js";
import User from "../../../models/User.js";

export default {
  data: new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim your daily rewards!"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const userId = interaction.user.id;
    const user = await User.findOne({ userId });

    if (!user) {
      await interaction.editReply({
        content:
          "You need to create an account first! Use `/register` to create an account.",
      });
      return;
    }

    // update user balance
    const dailyAmount = Math.floor(Math.random() * 50) + 15;
    const currentTime = Date.now();
    const lastClaimed = user.lastClaimedDaily || 0;
    const cooldown = 24 * 60 * 60 * 1000;
    const timeSinceLastClaim = currentTime - lastClaimed;

    if (timeSinceLastClaim < cooldown) {
      const timeLeft = cooldown - timeSinceLastClaim;
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
      );
      await interaction.editReply({
        content: `You can claim your daily reward again in ${hoursLeft} hours and ${minutesLeft} minutes.`,
      });
      return;
    }

    user.balance += dailyAmount;
    user.lastClaimedDaily = currentTime;
    await user.save();

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Daily Reward Claimed!")
      .setDescription(
        `You have claimed your daily reward of **$${dailyAmount}**`
      )
      .addFields(
        { name: "New Balance", value: `$${user.balance}`, inline: true },
        { name: "Next Claim", value: `In 24 hours`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: "Thank you for using our bot!" });

    await interaction.editReply({ embeds: [embed] });
  },
};
