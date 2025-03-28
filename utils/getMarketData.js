import axios from "axios";
import Crypto from "../models/Crypto.js";
import redis from "../lib/redis.js";

async function getCryptoData(coin) {
  const url = `https://api.coinpaprika.com/v1/tickers/${coin}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching crypto data for ${coin}:`, error);
    return null;
  }
}

async function fetchCryptoPrices() {
  const cacheKey = "crypto:prices";
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const cryptos = await Crypto.find({});
  if (!cryptos || cryptos.length === 0) {
    return [];
  }

  const cryptoData = cryptos.map((crypto) => ({
    name: crypto.name,
    symbol: crypto.symbol,
    price: crypto.price,
  }));

  await redis.set(cacheKey, JSON.stringify(cryptoData), "EX", 10);
  return cryptoData;
}

export { getCryptoData, fetchCryptoPrices };
