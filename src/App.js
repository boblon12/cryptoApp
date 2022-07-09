import React, { useState, useMemo } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { Homepage, News, Cryptocurrencies, CryptoDetails } from './components';
import './App.css';
import FineMenu from './components/Navbar';
import Exchanges from './components/Exchanges';
import Chat from './components/Chat';
import { useAuth } from './context/AuthContext';
import 'react-chatbot-kit/build/main.css';
import ChatBotContainer from './components/ChatBot/ChatBotContainer';

const App = () => {
  const { user } = useAuth();
  const [active, setActivestyle] = useState(true);
  const setActive = () => {
    setActivestyle(!active);
  };
  const layout = useMemo(() => (
    <>
      {user ? (
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/chat">
                <Chat />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </Layout>
      ) : (
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Redirect to="/" />
            </Switch>
          </div>
        </Layout>
      )}
    </>
  ));

  return (
    <div className="app">
      <>
        <FineMenu active={active} setActive={setActive} />
        <div className="main">
          {layout}
          <div
            className="footer"
            style={
              active
                ? { 'background-color': 'white' }
                : { 'background-color': '#001529' }
            }
          >
            <Typography.Title
              level={5}
              style={
                active
                  ? { color: 'black', textAlign: 'center' }
                  : { color: 'white', textAlign: 'center' }
              }
            >
              Copyright © 2022
              <Link to="/">Give me crypto</Link> <br />
              All Rights Reserved.
            </Typography.Title>
            <a
              target="_blank"
              href="https://vk.com/faershtein1337"
              rel="noreferrer"
            >
              Faershtein Daniil
            </a>
          </div>
        </div>
        <ChatBotContainer />
      </>
    </div>
  );
};

export default App;
