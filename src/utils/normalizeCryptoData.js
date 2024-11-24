// Normalizes the raw crypto market chart data from the CoinGecko API.
export const normalizeCryptoData = (apiData) => {
  if (!apiData || !apiData.prices) {
    console.error('Invalid API data provided to normalizeCryptoData');
    return [];
  }

  return apiData.prices.map(([timestamp, price]) => ({
    date: new Date(timestamp),
    price,
  }));
};
