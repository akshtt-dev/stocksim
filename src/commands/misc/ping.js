import { MessageFlags, SlashCommandBuilder } from "discord.js";
import config from "../../../config.js";
export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with ping in ms"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const ping = interaction.client.ws.ping;
    if (!ping) return interaction.editReply("Pong! No ping data available.");
    await interaction.editReply({
      content: `${config.emoji.ping} Pong! \`${ping}ms\``,
      flags: MessageFlags.Ephemeral,
    });
  },
};
