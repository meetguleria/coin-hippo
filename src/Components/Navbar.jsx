import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Navbar() {
  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="Coin Hippo" style={{ width: '100%', padding: '10px' }} />
      </div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Navbar;
