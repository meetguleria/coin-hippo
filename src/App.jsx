import React, { useState } from 'react';
import { Layout } from 'antd';
import { Navbar, Homepage, Cryptocurrencies, CryptoDetails, Exchanges, News } from './Components';
import { Routes, Route } from 'react-router-dom';

const { Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Navbar />
      </Sider>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
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
