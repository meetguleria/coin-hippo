// Utility to manage cache operations
const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Save data to localStorage with timestamp
export const saveToCache = (key, data) => {
  const timestamp = Date.now();
  const cachedData = {
    timestamp,
    data,
  };
  localStorage.setItem(key, JSON.stringify(cachedData));
};

// Retrieve data from localStorage and validate expiry
export const getFromCache = (key) => {
  const cachedData = localStorage.getItem(key);
  if (!cachedData) return null;

  try {
    const { timestamp, data } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
      return data;
    } else {
      // Cache expired, clear it
      localStorage.removeItem(key);
      return null;
    }
  } catch (error) {
    console.error('Failed to parse cached data', error);
    return null;
  }
};

// Clear cache data
export const clearCache = (key) => {
  localStorage.removeItem(key);
};
