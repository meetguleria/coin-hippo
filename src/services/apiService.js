import { saveToCache, getFromCache } from './cacheService';

const BASE_URL = 'https://api.coingecko.com/api/v3';

const fetchFromAPI = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching from CoinGecko API:', error);
    return null;
  }
};

// Helper function to get data with caching
const getDataWithCache = async (key, fetchFunction, ...params) => {
  // Check if data is already cached
  const cachedData = getFromCache(key);
  if (cachedData) {
    return cachedData;
  }

  // If not cached, fetch from API
  const data = await fetchFunction(...params);
  if (data) {
    saveToCache(key, data);
  }
  return data;
};

const getCryptocurrencies = async (currency = 'usd', limit = 100) => {
  const cacheKey = `cryptocurrencies_${currency}_${limit}`;
  return await getDataWithCache(cacheKey, fetchFromAPI, 'coins/markets', {
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: limit,
    page: 1,
    sparkline: false,
  });
};

const getCryptoDetails = async (id) => {
  const cacheKey = `crypto_details_${id}`;
  return await getDataWithCache(cacheKey, fetchFromAPI, `coins/${id}`);
};

const getCryptoMarketChart = async (id, days = 90) => {
  const cacheKey = `crypto_market_chart_${id}_${days}`;
  return await getDataWithCache(cacheKey, fetchFromAPI, `coins/${id}/market_chart`, {
    vs_currency: 'usd',
    days,
    interval: 'daily',
  });
};

const getGlobalStats = async () => {
  const cacheKey = `global_stats`;
  return await getDataWithCache(cacheKey, fetchFromAPI, 'global');
};

export default {
  getCryptocurrencies,
  getCryptoDetails,
  getCryptoMarketChart,
  getGlobalStats,
};
