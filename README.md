# Coin Hippo - Advanced Cryptocurrency Dashboard

**Coin Hippo** is a comprehensive **React** application that integrates multiple APIs (primarily **CoinGecko** for global market data and **ccxt** for Binance OHLCV data) to provide a centralized dashboard for cryptocurrency insights. The project leverages **Vite** for speedy development, **Ant Design** and **Emotion** for responsive, modern styling, and **VisX** for sophisticated data visualization. A custom localStorage-based caching layer reduces repeated API calls to ensure optimal performance.

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Architecture & Data Flow](#architecture--data-flow)  
4. [Tech Stack](#tech-stack)  
5. [Installation](#installation)  
6. [Usage](#usage)  
7. [Project Structure](#project-structure)  
8. [Caching Details](#caching-details)  
9. [Possible Enhancements](#possible-enhancements)

---

## Project Overview

**Coin Hippo** aims to solve the need for an accessible, lightweight crypto dashboard that merges **global market stats**, **individual coin data**, and **historical price trends** within a single interface. The application includes:

- A **Homepage** showing overall crypto statistics (e.g., total market cap, total number of active cryptocurrencies, 24-hour volume).
- A **Cryptocurrencies** page listing up to 100 coins with real-time prices, market cap, and daily percentage changes.
- A **coin detail** view for each cryptocurrency, complete with:
  - Live market data.
  - A **VisX-based** interactive chart (sourced from **Binance** via **ccxt**).
  - Developer and community metrics (Twitter followers, GitHub repo info, etc.).

By using **React Context** for global state, the app stays performant and maintains a clean architecture without overcomplicating data management.

---

## Features

1. **Global Market Statistics (Homepage)**  
   - Total Cryptocurrencies  
   - Total Markets  
   - Total Market Cap, 24H Volume  
   - Market Cap Percentage Changes  

2. **Cryptocurrencies Listing**  
   - Fetches data from CoinGecko’s `/coins/markets` endpoint.  
   - Includes search and filtering by name or symbol.  
   - Displays price, market cap, 24h change, and direct links to detail pages.

3. **Coin Detail Views**  
   - Fetches extended information (current price, market cap rank, 24h volume, etc.).  
   - Integrates **ccxt** to query Binance for OHLCV data, visualized via an interactive **VisX** chart.  
   - Community and developer info, like Twitter followers and GitHub stats.

4. **Responsive & Modern UI**  
   - Built with **Ant Design** components (`Layout`, `Sider`, `Descriptions`, `Card`, `Spin`, etc.).  
   - Styled with **Emotion** for maintainable and dynamic CSS.  
   - Mobile-friendly sidebar toggling using `breakpoint="lg"` and responsive design.

5. **Local Caching**  
   - Uses `localStorage` to cache coin lists and global stats for up to 24 hours.  
   - Minimizes redundant API calls to speed up repeated visits or navigation events.

6. **Placeholder Pages**  
   - `Exchanges` and `News` exist to demonstrate multi-page routing but can be expanded in future iterations.

---

## Architecture & Data Flow

1. **React Context (CryptoContext)**  
   - On application load, `CryptoContext` fetches and caches:
     - **CoinGecko** data for top cryptocurrencies (`getCryptocurrencies()`).
     - **Global stats** (`getGlobalStats()` from `/global`).
   - This data is stored in memory and localStorage, then provided to all components via `CryptoContext.Provider`.

2. **Detailed Coin Data**  
   - When a user navigates to `/crypto/:id`, `CryptoDetails.jsx` fetches additional data for that coin:
     - Basic info from **CoinGecko** (`apiService.getCryptoDetails()`).
     - Historical OHLCV from Binance with **ccxt** (`fetchOHLCV(symbol/USDT, '1h', 100)`).
   - The chart data is shaped into `{ date, price, open, high, low, volume }` objects and passed to the **VisX** chart.

3. **VisX Chart**  
   - `Chart.jsx` receives an array of objects with a `date` and `price` property, plus optional open/high/low/volume.  
   - Renders an area/line chart with interactive tooltips showing price at a specific date/time.

4. **Caching & Validation**  
   - `cacheService.js` checks if data exists in localStorage and whether it’s still within the **24-hour** validity window.  
   - If valid, the data is pulled from cache. Otherwise, a fresh API call is made.

---

## Tech Stack

- **Front-End Framework**: React (with Vite as the build tool)
- **UI & Styling**:  
  - [Ant Design](https://ant.design/) for ready-made components  
  - [Emotion](https://emotion.sh/docs/styled) for styled components  
- **Data Visualization**: [VisX](https://airbnb.io/visx/) by Airbnb  
- **APIs & Libraries**:  
  - [CoinGecko API](https://www.coingecko.com/en/api) for market info  
  - [ccxt](https://github.com/ccxt/ccxt) (Binance) for OHLCV data  
- **State Management**: React Context API  
- **Caching**: localStorage (via `cacheService.js`)

---

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/username/coin-hippo.git
   cd coin-hippo

	2.	Install Dependencies

npm install

(or yarn)

	3.	Start the Development Server

npm run dev

This should start on http://localhost:5173.

	4.	Build for Production (optional)

npm run build
npm run preview

	•	Generates a production build in dist
	•	npm run preview spins up a local server to test the production build

Usage
	1.	Homepage (/)
	•	Shows global stats from CoinGecko (market cap, total volume, etc.)
	•	Displays the top 10 coins for quick reference
	2.	Cryptocurrencies (/cryptocurrencies)
	•	Lists up to 100 coins, sorted by market cap
	•	Supports real-time search by coin name or symbol
	•	Clicking on a coin navigates to its details page
	3.	Crypto Details (/crypto/:id)
	•	Showcases the selected coin’s data: price, market cap rank, 24h volume, etc.
	•	Renders an interactive chart (via VisX) for historical prices from ccxt (Binance)
	•	Additional stats like Reddit subscribers, Twitter followers, GitHub stars
	4.	Exchanges & News
	•	Placeholder pages to demonstrate routing; future expansions can integrate real exchange data or crypto-related news

Project Structure

.
├── src
│   ├── App.jsx               // Main layout with Sider & Routes
│   ├── App.css               // Global CSS variables & base styling
│   ├── main.jsx              // Entry point: renders <App /> & router
│   ├── contexts
│   │   └── CryptoContext.jsx // Global data for coins, stats
│   ├── Pages
│   │   ├── Homepage.jsx      // Global stats & top coins
│   │   ├── Cryptocurrencies.jsx
│   │   ├── CryptoDetails.jsx // Detailed coin page + chart
│   │   ├── Exchanges.jsx     // Placeholder
│   │   ├── News.jsx          // Placeholder
│   │   └── index.js
│   ├── Components
│   │   ├── Navbar.jsx        // Collapsible sidebar navigation
│   │   └── Chart.jsx         // VisX chart for OHLCV data
│   ├── services
│   │   ├── apiService.js     // CoinGecko fetch + caching
│   │   ├── ccxtService.js    // Binance OHLCV
│   │   ├── cacheService.js   // localStorage caching logic
│   │   ├── exchangeService.js// ccxt exchange instance
│   │   └── symbolMappingService.js // Maps symbols if needed
│   ├── utils
│   │   └── normalizeCryptoData.js  // (Old approach, mostly unused)
│   ├── index.css             // Additional global styles
│   └── setupTests.js         // Jest-DOM config
├── package.json
└── ...

Caching Details
	•	LocalStorage: The application checks for cached responses before making new requests to CoinGecko.
	•	24-Hour Expiry: Each stored item has a timestamp; if 24 hours have passed, the cache is invalidated and re-fetched.
	•	Manual Clearing: To force fresh data, clear localStorage or wait for expiry.