/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Col, Row, Menu, Switch, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  MenuFoldOutlined,
  BulbOutlined,
  FundOutlined,
  MenuUnfoldOutlined,
  DollarCircleOutlined,
  LoginOutlined,
  PoweroffOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase';

import icons from '../images/crypto.png';
import { useAuth } from '../context/AuthContext';

const FineMenu = () => {
  const { user, activeTheme, setActiveTheme } = useAuth();
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [collapsed, setCollapsed] = useState(true);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(true);
    } else {
      setActiveMenu(false);
    }
  }, [screenSize]);

  async function handleLogout() {
    await auth.signOut();
  }

  const [theme, setTheme] = useState('light');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
    setActiveTheme(!activeTheme);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      {activeMenu ? (
        <div>
          <Typography.Title level={2} className="logo">
            <Link to="/">Give me crypto</Link>
          </Typography.Title>
          <div className="mobile-menu">
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ marginBottom: 0, width: '80px' }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
              style={
                collapsed
                  ? {
                      visibility: 'hidden',
                      opacity: '0',
                      transition: 'visibility 0s, opacity 0.3s linear',
                    }
                  : {
                      visibility: 'visible',
                      opacity: '1',
                      transition: 'visibility 0s, opacity 0.3s linear',
                      height: '100vh',
                    }
              }
              selectedKeys={['login', 'logout']}
              theme={theme}
              inlineCollapsed
              className="bottom-menu"
            >
              <Switch
                style={{
                  marginTop: '10px',
                  'margin-left': '20px',
                  justifyContent: 'flex-end',
                }}
                onChange={(value) => {
                  changeTheme(value);
                }}
                className="switch"
              />
              <Row type="flex" justify="center" className="icon">
                <Col>
                  <Avatar src={icons} size="large" />
                </Col>
              </Row>
              <Menu.Item onClick={toggleCollapsed} icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item onClick={toggleCollapsed} icon={<FundOutlined />}>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              </Menu.Item>
              <Menu.Item onClick={toggleCollapsed} icon={<BulbOutlined />}>
                <Link to="/news">News</Link>
              </Menu.Item>
              <Menu.Item
                onClick={toggleCollapsed}
                icon={<DollarCircleOutlined />}
              >
                <Link to="/exchanges">Exchanges</Link>
              </Menu.Item>
              {user ? (
                <>
                  <Menu.Item
                    onClick={toggleCollapsed}
                    icon={<WechatOutlined />}
                  >
                    <Link to="/chat">Chat</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="logout"
                    onClick={() => {
                      toggleCollapsed();
                      handleLogout();
                    }}
                    icon={<PoweroffOutlined />}
                  />
                </>
              ) : (
                <Menu.Item
                  key="login"
                  onClick={async () => {
                    toggleCollapsed();
                    await auth.signInWithRedirect(
                      new firebase.auth.GoogleAuthProvider()
                    );
                  }}
                  icon={<LoginOutlined />}
                />
              )}
            </Menu>
          </div>
        </div>
      ) : (
        <div className="navigation">
          <div className="nav-container">
            <Menu
              style={{ height: '100vh' }}
              theme={theme}
              className="bottom-menu"
              selectedKeys={['login', 'logout']}
            >
              <Switch
                style={{
                  marginTop: '10px',
                  'margin-left': '20px',
                  justifyContent: 'flex-end',
                }}
                onChange={(value) => {
                  changeTheme(value);
                }}
                className="switch"
              />
              <Row type="flex" justify="center" className="icon">
                <Col>
                  <Avatar src={icons} size="large" />
                </Col>
              </Row>
              <Typography.Title level={2} className="logo">
                <Link to="/">Give me crypto</Link>
              </Typography.Title>
              <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item icon={<FundOutlined />}>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
              </Menu.Item>
              <Menu.Item icon={<BulbOutlined />}>
                <Link to="/news">News</Link>
              </Menu.Item>
              <Menu.Item
                onClick={toggleCollapsed}
                icon={<DollarCircleOutlined />}
              >
                <Link to="/exchanges">Exchanges</Link>
              </Menu.Item>
              {user ? (
                <>
                  <Menu.Item
                    onClick={toggleCollapsed}
                    icon={<WechatOutlined />}
                  >
                    <Link to="/chat">Chat</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="logout"
                    onClick={() => {
                      toggleCollapsed();
                      handleLogout();
                    }}
                    icon={<PoweroffOutlined />}
                  >
                    Logout
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item
                  key="login"
                  onClick={async () => {
                    toggleCollapsed();
                    await auth.signInWithRedirect(
                      new firebase.auth.GoogleAuthProvider()
                    );
                  }}
                  icon={<LoginOutlined />}
                >
                  Login
                </Menu.Item>
              )}
            </Menu>
          </div>
        </div>
      )}
    </>
  );
};

export default FineMenu;
