import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Row, Col, Spin, Card, Descriptions, Divider, Button } from 'antd';
import styled from '@emotion/styled';
import apiService from '../services/apiService';
import { fetchOHLCV } from '../services/ccxtService';
import Chart from '../Components/Chart';
import { ParentSize } from '@visx/responsive';

const { Title, Paragraph } = Typography;

// Styled Components
const CryptoDetailsContainer = styled.div`
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CryptoLogo = styled.img`
  height: 30px;
  width: auto;
  margin-right: 10px;
`;

const CryptoTitle = styled(Title)`
  margin: 0;
  color: #005ea5;
  font-size: 20px;
`;

// Card and Containers Styling
const ChartWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
`;

const CryptoIntroCard = styled(Card)`
  padding: 15px;
  border-radius: 8px;
  background-color: #f8f9fa;
  border: 1px solid #cbd3da;
  margin-bottom: 15px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const DescriptionContainer = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const ExtraInfoContainer = styled.div`
  margin-top: 15px;
  padding: 15px;
  border: 1px solid #cbd3da;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: ${(props) => (props.isPositive ? '#28a745' : '#dc3545')}; /* Green for positive, red for negative */
`;

function CryptoDetails() {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [priceHistory, setPriceHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    // Fetch crypto details and market chart data
    const fetchDetails = async () => {
      try {
        setLoading(true);

        const details = await apiService.getCryptoDetails(id);
        setCryptoDetails(details);

        const symbol = details?.symbol?.toUpperCase();
        if (!symbol) {
          setPriceHistory([]);
          return;
        }

        const ohlcvData = await fetchOHLCV(`${symbol}/USDT`, '1h', 100);

        // Validate the returned data instead of relying on a `success` flag
        const isValidData = Array.isArray(ohlcvData) && ohlcvData.length > 0; // Fix: Validate directly against the array
        if (isValidData) {
          // We can directly set the data if ccxtService returns { date, price }
          setPriceHistory(ohlcvData);
        } else {
          console.error('[FetchDetails] Invalid or empty OHLCV data:', ohlcvData);
          setPriceHistory([]);
        }
    } catch (error) {
      console.error('[FetchDetails] Error fetching data:', error.message || error);
      setPriceHistory([]);
    } finally {
      setLoading(false);
    }
  };

    fetchDetails();
  }, [id]);

  if (loading) return <Spin size="large" className="loader" />;
  if (!cryptoDetails || !cryptoDetails.market_data) {
    return <div>Error: Unable to fetch crypto details.</div>;
  }

  return (
    <CryptoDetailsContainer>
      {/* Header Section for Crypto Logo and Title */}
      <HeaderSection>
        <CryptoLogo
          src={cryptoDetails.image.small}
          alt={cryptoDetails.name}
        />
        <CryptoTitle level={4}>
          {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})
        </CryptoTitle>
      </HeaderSection>

      {/* Price Chart Section */}
      <ChartWrapper>
      {priceHistory && priceHistory.length > 0 ? (
        <ParentSize>
            {({ width }) => {
              const height = width * (9 / 16); // 16:9 aspect ratio
              return <Chart priceHistory={priceHistory} width={width} height={height} />;
            }}
          </ParentSize>
        ) : (
          <div>Loading price chart...</div>
        )}
      </ChartWrapper>

      {/* Primary Intro Card */}
      <CryptoIntroCard>
        <Descriptions
          column={{ xs: 1, sm: 1, md: 2 }}
          bordered
          size="small"
        >
          <Descriptions.Item label="Current Price">
            <StatValue isPositive={cryptoDetails.market_data.price_change_percentage_24h >= 0}>
              ${cryptoDetails.market_data.current_price.usd.toLocaleString()}
            </StatValue>
          </Descriptions.Item>
          <Descriptions.Item label="Market Cap Rank">
            #{cryptoDetails.market_cap_rank}
          </Descriptions.Item>
          <Descriptions.Item label="24H Change">
            <StatValue isPositive={cryptoDetails.market_data.price_change_percentage_24h >= 0}>
              {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%
            </StatValue>
          </Descriptions.Item>
          <Descriptions.Item label="Market Cap">
            ${cryptoDetails.market_data.market_cap.usd.toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </CryptoIntroCard>

      {/* Extended About Section */}
      <DescriptionContainer>
        <Title level={4} style={{ color: '#005ea5' }}>About {cryptoDetails.name}</Title>
        <Paragraph ellipsis={!showFullDescription ? { rows: 3, expandable: false } : false}>
          <span dangerouslySetInnerHTML={{ __html: cryptoDetails.description.en }} />
        </Paragraph>
        <Button
          type="link"
          onClick={() => setShowFullDescription(!showFullDescription)}
        >
          {showFullDescription ? 'Show Less' : 'Read More'}
        </Button>
      </DescriptionContainer>

      {/* Additional Information */}
      <ExtraInfoContainer>
        <Title level={4} style={{ color: '#005ea5' }}>Community & Developer Statistics</Title>
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Twitter Followers">
            {cryptoDetails.community_data.twitter_followers.toLocaleString() || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Reddit Subscribers">
            {cryptoDetails.community_data.reddit_subscribers.toLocaleString() || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="GitHub Stars">
            {cryptoDetails.developer_data.stars || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Contributors">
            {cryptoDetails.developer_data.pull_request_contributors || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="All-Time High Price">
            ${cryptoDetails.market_data.ath.usd.toLocaleString()} (On {new Date(cryptoDetails.market_data.ath_date.usd).toLocaleDateString()})
          </Descriptions.Item>
        </Descriptions>
      </ExtraInfoContainer>
    </CryptoDetailsContainer>
  );
}

export default CryptoDetails;