import { getExchange } from './exchangeService';

export async function fetchOHLCV(symbol, timeframe='1h', limit=100) {
  const exchange = getExchange();
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


