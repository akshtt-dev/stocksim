const { MessageFlags, SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with ping in ms"),
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const ping = interaction.client.ws.ping;
    if (!ping) return interaction.editReply("Pong! No ping data available.");
    await interaction.editReply({
      content: `<:ping:1354891444330041617> Pong! \`${ping}ms\``,
      flags: MessageFlags.Ephemeral,
    });
  },
};