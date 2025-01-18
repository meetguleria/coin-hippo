import { useContext } from 'react';
import { Typography, Row, Col, Statistic, Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { CryptoContext } from '../contexts/CryptoContext';

const { Title } = Typography;

function Homepage() {
  const { coins, globalStats, loading } = useContext(CryptoContext);

  // Get the top 10 cryptocurrencies from the context
  const top10Coins = coins.slice(0, 10);

  if (loading) return <Spin size="large" className="loader" />;

  return (
    <div className="homepage-container">
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      {globalStats && (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats?.active_cryptocurrencies}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Statistic title="Total Markets" value={globalStats.markets} />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="Total Market Cap"
              value={
                globalStats?.total_market_cap?.usd
                  ? `$${(globalStats.total_market_cap.usd / 1e12).toFixed(2)}T`
                  : 'N/A'
                }
              />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="Total 24H Volume"
              value={`$${(globalStats?.total_volume.usd / 1e9).toFixed(2)}B`}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="Market Cap Change 24H"
              value={`${globalStats?.market_cap_change_percentage_24h_usd.toFixed(
                2
              )}%`}
            />
          </Col>
        </Row>
      )}

      <div className="home-heading-container">
        <Title level={3} className="heading" style={{ marginTop: '40px' }}>
          Top 10 Cryptocurrencies
        </Title>
        <Title level={4} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>

      {top10Coins.length > 0 ? (
        <Row gutter={[16, 16]}>
          {top10Coins.map((crypto) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={crypto.id}>
              <Link to={`/crypto/${crypto.id}`}>
                <Card className="crypto-card" hoverable>
                  <img
                    alt={crypto.name}
                    src={crypto.image}
                    className="crypto-card-image"
                  />
                  <Card.Meta
                    title={`${crypto.name} (${crypto.symbol.toUpperCase()})`}
                  />
                  <div className="crypto-card-content">
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
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <div>No cryptocurrencies data available</div> // Handle empty state gracefully
      )}
    </div>
  );
}

export default Homepage;
