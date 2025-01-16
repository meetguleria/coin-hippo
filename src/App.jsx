import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './Components/Navbar';
import { Homepage, Cryptocurrencies, CryptoDetails, Exchanges, News } from './Pages';

const { Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200} // Set the width of the sidebar when expanded
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        collapsedWidth="80" // Set the width when collapsed (adjust as needed)
      >
        {/* Pass both collapsed and setCollapsed to Navbar */}
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
          }}
        >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
            <Route path="/crypto/:id" element={<CryptoDetails />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/news" element={<News />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
