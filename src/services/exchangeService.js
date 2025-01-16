let exchangeInstance;

// Initialize the exchange service
export function getExchange() {
  if (!exchangeInstance) {
    exchangeInstance = new ccxt.binance();
  }

  return exchangeInstance;
}