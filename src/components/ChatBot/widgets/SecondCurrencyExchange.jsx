/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import { Select, Button } from 'antd';

const { Option } = Select;
function SecondCurrencyExchange({ secondCurrency, setState, actionProvider }) {
  const [secondCurrencyItem, setSecondCurrencyItem] = useState('π·πΊ RUB');
  const currencyArray = ['πͺπΊ EUR', 'πΊπΈ USD', 'π·πΊ RUB', 'π¬π§ GBP'];

  const handleSubmit = () => {
    setState((state) => ({
      ...state,
      secondCurrency: secondCurrencyItem.slice(5),
    }));
    actionProvider.handleCurrencyExchangeResult(secondCurrencyItem);
  };

  return (
    <div className="statistic">
      <Select
        style={{ width: '100%', textAlign: 'center' }}
        defaultValue="π·πΊ RUB"
        onChange={(value) => setSecondCurrencyItem(value)}
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

export default SecondCurrencyExchange;
