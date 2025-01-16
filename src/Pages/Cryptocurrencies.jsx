import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Spin } from 'antd';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import apiService from '../services/apiService';

const { Search } = Input;

// Styled Components
const CryptoPage = styled.div`
  padding: 20px;
`;

const CryptoCard = styled(Card)`
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CryptoCardImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin: 20px auto 0;
  display: block;
`;

const CryptoCardContent = styled.div`
  margin-top: 10px;

  p {
    margin: 5px 0;
    color: var(--text-primary);
  }
`;

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
    const filtered = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [searchTerm, cryptos]);

  if (loading) return <Spin size="large" className="loader" />;

  return (
    <CryptoPage>
      <Search
        placeholder="Search cryptocurrencies"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, maxWidth: 400 }}
        allowClear
      />
      <Row gutter={[16, 16]}>
        {filteredCryptos.map((crypto) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`}>
              <CryptoCard hoverable>
                <CryptoCardImage alt={crypto.name} src={crypto.image} />
                <Card.Meta
                  title={`${crypto.name} (${crypto.symbol.toUpperCase()})`}
                />
                <CryptoCardContent>
                  <p>Price: ${crypto.current_price.toLocaleString()}</p>
                  <p>Market Cap: ${crypto.market_cap.toLocaleString()}</p>
                  <p>
                    Daily Change:{' '}
                    <span
                      style={{
                        color:
                          crypto.price_change_percentage_24h >= 0
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </p>
                </CryptoCardContent>
              </CryptoCard>
            </Link>
          </Col>
        ))}
      </Row>
    </CryptoPage>
  );
}

export default Cryptocurrencies;
