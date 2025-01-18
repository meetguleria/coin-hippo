// Normalizes the raw crypto market chart data from the CoinGecko API.
export const normalizeCryptoData = (rawOHLCV) => {
  if (!Array.isArray(rawOHLCV) || rawOHLCV.length === 0) {
    console.error('Invalid or empty OHLCV data provided to normalizeCryptoData');
    return [];
  }

  return rawOHLCV.map(([timestamp, , , , close]) => ({
    date: new Date(timestamp), // Convert the timestamp to a Date object.
    price: close,              // Extract the close price.
  }));
};
