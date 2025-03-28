import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, MessageFlags, EmbedBuilder } from "discord.js";
import config from "../../../config.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Replies with a list of available commands"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    try {
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("menu_select")
        .setPlaceholder("Choose a category...")
        .addOptions([
          {
            label: "Misc",
            description: "See a list of miscellaneous commands",
            value: "misc",
          },
          {
            label: "Trade",
            description: "See a list of trade commands",
            value: "trade",
          },
          {
            label: "Market",
            description: "See a list of market commands",
            value: "market",
          },
          {
            label: "Economy",
            description: "See a list of economy commands",
            value: "economy",
          },
          {
            label: "Account",
            description: "See a list of account commands",
            value: "account",
          }
        ]);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.client.user.username,
          iconURL: interaction.client.user.displayAvatarURL(),
        })
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setColor(0x0099ff)
        .setDescription(
          `Hello, I am **${interaction.client.user.username}**!\n\nI am here to assist you with various commands. Please select a category from the dropdown menu below to see the available commands.\n\n**Support Server**: [Join](${config.supportGuildLink})`
        )
        .setFooter({
          text: "Use the command `/help` to see this message again.",
        });

      await interaction.editReply({
        components: [row],
        embeds: [embed],
      });
    } catch (error) {
      await interaction.editReply({
        content: "An error occurred while processing your request.",
      });
      console.error("Error in help command:", error);
    }
  },
};
