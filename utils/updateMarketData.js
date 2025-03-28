import Crypto from "../models/Crypto.js";
import { getCryptoData } from "../utils/getMarketData.js";

async function updateMarketData() {
  const data = await Crypto.find({ isAdded: { $ne: true } })
    .select("id -_id")
    .lean();
  if (!data || data.length === 0) return;
  const coins = data.map((coin) => coin.id);
  const cryptoData = await Promise.all(
    coins.map((coin) => getCryptoData(coin))
  );

  for (const data of cryptoData) {
    if (!data || !data.quotes || !data.quotes.USD) continue;
    const { name, quotes } = data;
    const price = quotes.USD.price;

    await Crypto.updateOne({ name }, { price }, { upsert: true });
  }
}

export default updateMarketData;
