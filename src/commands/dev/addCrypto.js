import { SlashCommandBuilder } from "discord.js";
import Crypto from "../../../models/Crypto.js";
import config from "../../../config.js";

export default {
  data: new SlashCommandBuilder()
    .setName("addcrypto")
    .setDescription("Add a cryptocurrency to your watchlist")
    .setDefaultMemberPermissions(0)
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription(
          "The name of the cryptocurrency (e.g., Bitcoin, Ethereum)"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("symbol")
        .setDescription("The symbol of the cryptocurrency (enter emoji id)")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("shortname")
        .setDescription("The short name of the cryptocurrency (e.g., BTC, ETH)")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("price")
        .setDescription("The price of the cryptocurrency (optional)")
    ),

  run: async ({ interaction }) => {
    await interaction.deferReply();
    if (!config.devUserIds.includes(interaction.user.id)) return;
    const name = interaction.options.getString("name");
    const symbol = interaction.options.getString("symbol");
    const shortname = interaction.options.getString("shortname");
    const id = (`${shortname}-${name}`).toLowerCase();
    const price = interaction.options.getNumber("price") || 0;
    try {
      const existingCrypto = await Crypto.findOne({ id });
      if (existingCrypto) {
        return await interaction.editReply(
          `${name} (${shortname}) already exists`
        );
      }

      await Crypto.create({
        name,
        id,
        symbol,
        shortname,
        price,
        isAdded: true,
      });

      await interaction.editReply(
        `Successfully added ${name} (${shortname}) to your watchlist.`
      );
    } catch (error) {
      console.error(error);
      await interaction.editReply(
        `Failed to add ${name} (${shortname}) to your watchlist. Please try again.`
      );
    }
  },
  options: {
    devOnly: true,
  },
};
