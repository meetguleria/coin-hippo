import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';
import apiService from '../services/apiService';

const { Search } = Input;

function Cryptocurrencies() {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await apiService.getCryptocurrencies();
        setCryptos(data);
        setFilteredCryptos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cryptocurrencies:', error);
        setLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  useEffect(() => {
    const filtered = cryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchTerm, cryptos]);

  if (loading) return <Spin size="large" />;

  return (
    <div>
      <Search
        placeholder="Search cryptocurrencies"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Row gutter={[16, 16]}>
        {filteredCryptos.map((crypto) => (
          <Col xs={24} sm={12} lg={6} key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card
                title={`${crypto.name} (${crypto.symbol.toUpperCase()})`}
                hoverable
              >
                <p>Price: ${crypto.current_price.toLocaleString()}</p>
                <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
                <p>Daily Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Cryptocurrencies;
