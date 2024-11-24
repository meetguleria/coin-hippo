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

const getCryptocurrencies = async (currency = 'usd', limit = 100) => {
  return await fetchFromAPI('coins/markets', {
    vs_currency: currency,
    order: 'market_cap_desc',
    per_page: limit,
    page: 1,
    sparkline: false,
  });
};

const getCryptoDetails = async (id) => {
  return await fetchFromAPI(`coins/${id}`);
};

const getCryptoMarketChart = async (id, days = 30) => {
  return await fetchFromAPI(`coins/${id}/market_chart`, {
    vs_currency: 'usd',
    days,
    interval: 'daily',
  });
};

const getGlobalStats = async () => {
  return await fetchFromAPI('global');
};

export default {
  getCryptocurrencies,
  getCryptoDetails,
  getCryptoMarketChart,
  getGlobalStats,
};
