import { SlashCommandBuilder, EmbedBuilder, MessageFlags } from "discord.js";
import { fetchCryptoPrices } from "../../../utils/getMarketData.js";

async function displayPrice() {
  const data = await fetchCryptoPrices();
  if (!data || data.length === 0) {
    return [
      {
        name: "No cryptocurrencies found.",
        value: "Please try again later.",
      },
    ];
  }
  const response = data.map((crypto) => ({
    name: `${crypto.symbol} ${crypto.name}`,
    value: `$${parseFloat(crypto.price).toFixed(2)}`,
    inline: true,
  }));
  return response
}

export default {
  data: new SlashCommandBuilder()
    .setName("market")
    .setDescription("Shows the available cryptocurrencies and their prices."),
  run: async ({ interaction }) => {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const iconURL = "https://cdn.discordapp.com/emojis/1354909851771212009.webp?size=64&quality=lossless";
    try {
      const embed = new EmbedBuilder()
        .setThumbnail(iconURL)
        .setColor(0x0099ff)
        .setAuthor({
          name: "Market",
          iconURL
        })
        .setDescription(
          "Here are the available cryptocurrencies and their prices:"
        )
        .addFields(await displayPrice())
        .setFooter({ text: "Use `/price <crypto>` for more details." });
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error("Error in /market command:", error);
      await interaction.editReply({
        content: "An error occurred while fetching the market data.",
      });
    }
  },
};
