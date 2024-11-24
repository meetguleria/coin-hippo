import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col, Spin } from 'antd';
import apiService from '../services/apiService';
import Chart from './Chart';

const { Title, Text } = Typography;

function CryptoDetails() {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await apiService.getCryptoDetails(id);
        setCryptoDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto details:', error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Spin size="large" />;
  if (!cryptoDetails) return <div>Error: Unable to fetch crypto details.</div>;

  return (
    <div>
      <Title level={2}>{cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})</Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text><strong>Price:</strong> ${cryptoDetails.market_data.current_price.usd.toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Text><strong>Market Cap:</strong> ${cryptoDetails.market_data.market_cap.usd.toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Text><strong>24H High:</strong> ${cryptoDetails.market_data.high_24h.usd.toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Text><strong>24H Low:</strong> ${cryptoDetails.market_data.low_24h.usd.toLocaleString()}</Text>
        </Col>
      </Row>

      {/* Price Chart */}
      <Title level={3} style={{ marginTop: '20px' }}>Price Chart (Last 30 Days)</Title>
      <Chart id={id} />
    </div>
  );
}

export default CryptoDetails;
