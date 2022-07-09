/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CurrencyHeaders = {
  'x-rapidapi-key': '09d74a35a3mshf6c6ba3afde77ccp1502a9jsn71f1821ee5f4',
  'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
};

const createRequest = (url) => ({ url, headers: CurrencyHeaders });

export const currencyApi = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://currency-exchange.p.rapidapi.com',
  }),
  endpoints: (builder) => ({
    getCurrencyExchange: builder.query({
      query: ({ firstCurrency, secondCurrency }) =>
        createRequest(
          `/exchange?from=${firstCurrency.slice(5)}&to=${secondCurrency.slice(
            5
          )}`
        ),
    }),
  }),
});

export const { useGetCurrencyExchangeQuery } = currencyApi;
