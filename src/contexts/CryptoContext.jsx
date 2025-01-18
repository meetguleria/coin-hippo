import { createContext, useState, useEffect, useMemo } from "react";
import apiService from "../services/apiService";

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalStats, setGlobalStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const coinsData = await apiService.getCryptocurrencies('usd', 100);
        const statsData = await apiService.getGlobalStats();

        setCoins(coinsData || []);
        setGlobalStats(statsData?.data || null);
      } catch (error) {
        console.error("Error loading data in CryptoContext:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const contextValue = useMemo(() => ({ coins, globalStats, loading }), [coins, globalStats, loading]);

  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
};