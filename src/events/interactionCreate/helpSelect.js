const { EmbedBuilder } = require("discord.js");

const miscCommands = [
  { name: "<:ping:1354891444330041617> `/ping`", value: "Replies with Pong!" },
];

const tradeCommands = [
  { name: "`/trade`", value: "Initiates a trade with another user" },
  { name: "`/balance`", value: "Shows your current balance" },
];

const marketCommands = [
  {
    name: "`/market`",
    value: "Shows the available cryptocurrencies and their prices.",
  },
  {
    name: "`/price <crypto>`",
    value: "Shows the price of a specific cryptocurrency",
  },
  { name: "`/buy <crypto> <amount>`", value: "Buys a specific cryptocurrency" },
  {
    name: "`/sell <crypto> <amount>`",
    value: "Sells a specific cryptocurrency",
  },
  { name: "`/shop`", value: "Displays the market shop" },
  { name: "`/buy`", value: "Buys an item from the shop" },
];

module.exports = async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "menu_select") return;

  let selectedCommands;
  let categoryTitle;
  let thumbnail = interaction.client.user.displayAvatarURL();
  switch (interaction.values[0]) {
    case "misc":
      selectedCommands = miscCommands;
      thumbnail = "https://cdn.discordapp.com/emojis/1354905097817034772.webp?size=128&quality=lossless";
      categoryTitle = "<:misc:1354905097817034772> Miscellaneous Commands";
      break;
    case "trade":
      selectedCommands = tradeCommands;
      thumbnail = "https://cdn.discordapp.com/emojis/1354905949974040689.webp?size=128&quality=lossless";
      categoryTitle = "<:trade:1354905949974040689> Trade Commands";
      break;
    case "market":
      selectedCommands = marketCommands;
      thumbnail = "https://cdn.discordapp.com/emojis/1354909851771212009.webp?size=128&quality=lossless";
      categoryTitle = "<:chart:1354909851771212009> Market Commands";
      break;
    default:
      return;
  }

  const embed = new EmbedBuilder()
    .setAuthor({
      name: interaction.client.user.username,
      iconURL: interaction.client.user.displayAvatarURL(),
    })
    .setThumbnail(thumbnail)
    .setColor(0x0099ff)
    .setTitle(categoryTitle)
    .addFields(selectedCommands);

  await interaction.update({ embeds: [embed] });
};

module.exports.miscCommands = miscCommands;
module.exports.tradeCommands = tradeCommands;
module.exports.marketCommands = marketCommands;
