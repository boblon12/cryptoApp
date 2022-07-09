import React, { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { Homepage, News, Cryptocurrencies, CryptoDetails } from './components';
import './App.css';
import FineMenu from './components/Navbar';
import Exchanges from './components/Exchanges';
import Chat from './components/Chat';
import { useAuth } from './context/AuthContext';
import 'react-chatbot-kit/build/main.css';
import ChatBotContainer from './components/ChatBot/ChatBotContainer';
import Footer from './components/Footer';

const App = () => {
  const { user } = useAuth();
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
        <FineMenu />
        <div className="main">
          {layout}
          <Footer />
        </div>
        <ChatBotContainer />
      </>
    </div>
  );
};

export default App;
