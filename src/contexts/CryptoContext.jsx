import { createContext, useState, useEffect, useMemo } from "react";
import { apiService } from "../services/apiService";

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const data = await apiService.getCryptocurrencies('usd', 100);
        setCoins(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const contextValue = useMemo(() => ({ coins, loading }), [coins, loading]);

  return (
    <CryptoContext.Provider value={contextValue}>
    {children}
    </CryptoContext.Provider>
  );
};