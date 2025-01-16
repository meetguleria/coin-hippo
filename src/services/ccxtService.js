/**
 * Fetch OHLCV data for a given trading pair and timeframe.
 * @param {string} symbol - The trading pair (e.g., 'BTC/USDT').
 * @param {string} timeframe - Time interval (e.g., '1h', '1d').
 * @param {number} limit - Number of candles to fetch.
 * @returns {Object} - Object containing either the OHLCV data or an error.
 *                     Example:
 *                     { success: true, data: [...] }
 *                     or
 *                     { success: false, error: { message: "Error message", details: "Error details" } }
 */
export async function fetchOHLCV(symbol, timeframe='1h', limit=100) {
  const exchange = new ccxt.binance(); // Initialize Exchange
  try {
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
    return ohlcv.map(([timestamp, open, high, low, close, volume]) => ({
      date: new Date(timestamp),
      open,
      high,
      low,
      close,
      volume,
    }));
  } catch (error) {
    console.error('Error fetching OHLCV data:', error);
    return {
      success: false,
      error: {
        message: 'Failed to fetch OHLCV data',
        details: error.message || 'Unknown error occurred.',
      },
    };
  }
}


