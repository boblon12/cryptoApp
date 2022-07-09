/* eslint-disable comma-dangle */
import { Loader } from '@chatscope/chat-ui-kit-react';
import React, { useLayoutEffect } from 'react';
import millify from 'millify';
import { useGetCurrencyExchangeQuery } from '../../../services/currencyApi';

function ExchangeResult({ firstCurrency, secondCurrency, actionProvider }) {
  const { data, isFetching } = useGetCurrencyExchangeQuery({
    firstCurrency,
    secondCurrency,
  });

  useLayoutEffect(() => {
    actionProvider.handleNewChoice();
  }, []);
  return (
    <div className="stats__final">
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <div className="column-left">
            <p> 1 {firstCurrency} = </p>
          </div>
          <div className="column-right">
            <p>
              {millify(data, { precision: 3 })} {secondCurrency}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ExchangeResult;
