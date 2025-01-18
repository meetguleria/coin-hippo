import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CryptoProvider } from './contexts/CryptoContext';
import 'antd/dist/reset.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </BrowserRouter>
);
