import styled from '@emotion/styled';
import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import logo from '../images/logo.png';

// Styled Components

const NavbarContainer = styled.div`
  background-color: #001529;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${(props) => (props.collapsed ? '80px' : '240px')};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  overflow: hidden;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #001529;
  box-sizing: border-box;
  border-radius: 10px;
`;

const LogoImage = styled.img`
  max-height: ${(props) => (props.collapsed ? '50px' : '100px')};
  height: auto;
  width: auto;
  transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  object-fit: contain;
  border-radius: 10px;
`;

const MenuToggle = styled(Button)`
  margin: 10px auto;
  background: none;
  border: none;
  color: white;
  display: block;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s ease-in-out;

  &:hover {
    transform: rotate(90deg); /* Smooth rotation effect on hover */
    color: #00bcd4; /* Use a bright teal to create contrast */
  }

  &:active {
    transform: rotate(180deg); /* Further rotation on click */
  }
`;

const NavMenu = styled(Menu)`
  margin-top: 20px;
  width: 100%;
  background-color: #001529 !important;

  .ant-menu-item {
    color: #e0e6eb; /* Default text color for menu items (light grey) */
    background-color: #001529; /* Background color for all items */
    border-bottom: none;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s ease-in-out, transform 0.5s ease;

    .anticon {
      color: #e0e6eb; /* Default icon color */
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), color 0.4s ease-in-out;
    }

    &:hover {
      background-color: #004466; /* Use a slightly lighter shade of blue for hover effect */
      color: #ffffff; /* White text on hover */
      transform: translateX(8px); /* Slight shift for a modern feel */
      .anticon {
        color: #00e6ff; /* Brighter cyan color for icon hover */
        transform: scale(1.1); /* Slight scaling for animation effect */
      }
    }
  }

  .ant-menu-item-selected {
    background-color: #007ea7 !important; /* More vibrant blue for selected item */
    color: #ffffff !important; /* White text for selected item */
    transform: translateX(10px); /* Consistent shift for emphasis */

    .anticon {
      color: #ffffff !important; /* Icon color matches text when selected */
      transform: scale(1.15); /* Slight scaling for selected state */
    }
  }

  .ant-menu-item,
  .ant-menu-item-selected {
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth transition timing */
  }
`;

function Navbar({ collapsed, setCollapsed }) {
  const location = useLocation();

  // Collapse sidebar when navigating to a new route on small screens
  useEffect(() => {
    if (window.innerWidth <= 800) {
      setCollapsed(true);
    }
  }, [location.pathname, setCollapsed]);

  return (
    <NavbarContainer collapsed={collapsed}>
      {/* Logo Container */}
      <LogoContainer>
        <Link to="/">
          <LogoImage src={logo} alt="Coin Hippo" collapsed={collapsed} />
        </Link>
      </LogoContainer>

      {/* Collapse/Expand Button */}
      <MenuToggle
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <MenuOutlined /> : <CloseOutlined />}
      </MenuToggle>

      {/* Navigation Menu */}
      <NavMenu
        theme="dark"
        mode="inline"
        onClick={() => {
          if (window.innerWidth <= 800) {
            setCollapsed(true);
          }
        }}
      >
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
      </NavMenu>
    </NavbarContainer>
  );
}

export default Navbar;
