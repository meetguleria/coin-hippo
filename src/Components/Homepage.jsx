import { Typography, Row, Col, Statistic, Card } from 'antd';

const { Title } = Typography;

// Placeholder cryptocurrency data
const cryptos = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$50,000', marketCap: '$1T' },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,500', marketCap: '$500B' },
  { name: 'Cardano', symbol: 'ADA', price: '$2.50', marketCap: '$80B' },
];

function Homepage() {
  const globalStats = {
    totalCryptocurrencies: 5000,
    totalExchanges: 300,
    totalMarketCap: 2e12, // 2 trillion
    total24HVolume: 1.5e11, // 150 billion
    totalMarkets: 8000,
  };

  return (
    <div>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.totalCryptocurrencies} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={globalStats.totalExchanges} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={`$${(globalStats.totalMarketCap / 1e12).toFixed(2)}T`} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24H Trading Volume" value={`$${(globalStats.total24HVolume / 1e9).toFixed(2)}B`} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={globalStats.totalMarkets} />
        </Col>
      </Row>

      <Title level={3} className="heading" style={{ marginTop: '20px' }}>Top Cryptocurrencies</Title>
      <Row gutter={[16, 16]}>
        {cryptos.map((crypto) => (
          <Col xs={24} sm={12} lg={8} key={crypto.symbol}>
            <Card title={crypto.name} bordered={false}>
              <p>Symbol: {crypto.symbol}</p>
              <p>Price: {crypto.price}</p>
              <p>Market Cap: {crypto.marketCap}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Homepage;
