import { getExchange } from "./exchangeService";
import { saveToCache, getFromCache } from "./cacheService";

const CACHE_KEY = "symbolMapping";
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Fetch symbol mapping data from API
const fetchBinanceMarkets = async () => {
  const exchange = getExchange();
  try {
    await exchange.loadMarkets();
    const markets = exchange.markets;

    // Map Binance trading pairs to their respective symbols
    return Object.keys(markets).reduce((acc, pair) => {
      const { base, quote } = markets[pair];
      acc[`$${base}/${quote}`] = pair;
      return acc;
    }, {});
  } catch (error) {
    console.error("Error fetching Binance markets:", error);
    throw new Error("Failed to fetch Binance markets");
  }
};

// Generate mappings of Coingecko symbols to Binance trading pairs
export const generateSymbolMapping = async (coingeckoData) => {
  const cachedMappings = getFromCache(CACHE_KEY);
  if (cachedMappings && Date.now() - cachedMappings.timestamp < CACHE_EXPIRY_TIME) {
    return cachedMappings.data;
  }

  try {
    const binanceMarkets = await fetchBinanceMarkets();
    const symbolMappings = {};

    coingeckoData.forEach((coin) => {
      const { symbol } = coin;
      const binanceSymbol = `${symbol.toUpperCase()}/USDT`;
      if (binanceMarkets[binanceSymbol]) {
        const { id } = coin;
        symbolMappings[id] = binanceMarkets[binanceSymbol];
      }
    });

    saveToCache(CACHE_KEY, { timestamp: Date.now(), data: symbolMappings });
    return symbolMappings;
  } catch (error) {
    console.error("Error generating symbol mappings:", error);
    return {};
  }
};