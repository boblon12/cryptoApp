/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { Button, Select } from 'antd';

const { Option } = Select;
function FirstCurrencyExchange({ firstCurrency, setState, actionProvider }) {
  const [firstCurrencyItem, setFirstCurrencyItem] = useState('🇪🇺 EUR');
  const currencyArray = ['🇪🇺 EUR', '🇺🇸 USD', '🇷🇺 RUB', '🇬🇧 GBP'];

  const handleSubmit = () => {
    setState((state) => ({
      ...state,
      firstCurrency: firstCurrencyItem.slice(5),
    }));
    actionProvider.handleSecondCurrencyChoice(firstCurrencyItem);
  };

  return (
    <div className="stats">
      <Select
        style={{ width: '100%', textAlign: 'center', zIndex: 10000 }}
        defaultValue="🇪🇺 EUR"
        onChange={(value) => setFirstCurrencyItem(value)}
      >
        {currencyArray.map((currency, i) => (
          <Option key={i} value={currency} style={{ textAlign: 'center' }}>
            {currency}
          </Option>
        ))}
      </Select>
      <Button onClick={handleSubmit} type="primary" size="large">
        Submit
      </Button>
    </div>
  );
}

export default FirstCurrencyExchange;
