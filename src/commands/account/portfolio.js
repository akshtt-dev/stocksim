import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from "discord.js";
import User from "../../../models/User.js";
import getUserRank from "../../../utils/getUserRank.js";
import config from "../../../config.js";

export default {
  data: new SlashCommandBuilder()
    .setName("portfolio")
    .setDescription("View portfolio")
    .addUserOption((option) =>
      option.setName("user").setDescription("The user to view the portfolio of")
    ),
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    try {
      const mentionedUser = interaction.options.getUser("user");
      const userId = mentionedUser?.id || interaction.user.id;
      const username =
        interaction.options.getUser("user")?.username ||
        interaction.user.username;
      const user = await User.findOne({ userId });

      if (!user) {
        await interaction.editReply(
          mentionedUser
            ? "This user does not have an account!"
            : "You do not have an account!"
        );
        return;
      }

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${username}'s Portfolio`,
          iconURL:
            mentionedUser?.displayAvatarURL() ||
            interaction.user.displayAvatarURL(),
        })
        .setColor("#00FF00")
        .setThumbnail(
          mentionedUser?.displayAvatarURL() ||
            interaction.user.displayAvatarURL()
        )
        .addFields(
          {
            name: `${config.emoji.economy} Balance`,
            value: `$${user.balance.toLocaleString()}`,
            inline: true,
          },
          {
            name: `${config.emoji.rank} Rank`,
            value: `#${await getUserRank(user.userId)}`,
            inline: true,
          },
          {
            name: `${config.emoji.calendar} Registered On`,
            value: `<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`,
          }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      await interaction.editReply(
        "An error occurred while fetching the portfolio."
      );
    }
  },
};
