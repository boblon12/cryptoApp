/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import CoBotAvatar from './CoBotAvatar';
import FirstCurrencyExchange from './widgets/FirstCurrencyExchange';
import GeneralOptions from './widgets/GeneralOptions/GeneralOptions';
import SecondCurrencyExchange from './widgets/SecondCurrencyExchange';
import ExchangeResult from './widgets/ExchangeResult';
import MyCustomAvatar from './MyCustomAvatar';

const botname = 'CryptoBot';
const config = {
  lang: 'no',
  botName: botname,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#40a9ff',
    },
    chatButton: {
      backgroundColor: '#40a9ff',
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Привет, меня зовут ${botname}. Я могу показать тебе текущий курс валют`
    ),
    createChatBotMessage('Выбери две валюты чтобы узнать текущий курс 🤗', {
      withAvatar: false,
      delay: 400,
      widget: 'FirstCurrencyExcnahge',
    }),
  ],
  state: {
    firstCurrency: null,
    secondCurrency: null,
  },
  customComponents: {
    botAvatar: (props) => <CoBotAvatar {...props} />,
    userAvatar: (props) => <MyCustomAvatar {...props} />,
  },
  widgets: [
    {
      widgetName: 'options',
      widgetFunc: (props) => <GeneralOptions {...props} />,
    },
    {
      widgetName: 'FirstCurrencyExcnahge',
      delay: 200,
      widgetFunc: (props) => <FirstCurrencyExchange {...props} />,
      mapStateToProps: ['firstCurrency'],
    },
    {
      widgetName: 'SecondCurrencyExcnahge',
      delay: 200,
      widgetFunc: (props) => <SecondCurrencyExchange {...props} />,
      mapStateToProps: ['secondCurrency'],
    },
    {
      widgetName: 'ExchangeResult',
      delay: 200,
      widgetFunc: (props) => <ExchangeResult {...props} />,
      mapStateToProps: ['firstCurrency', 'secondCurrency'],
    },
  ],
};

export default config;
