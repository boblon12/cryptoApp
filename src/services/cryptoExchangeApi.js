/* eslint-disable arrow-body-style */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchangeHeaders = {
    'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com',
    'X-RapidAPI-Key': '09d74a35a3mshf6c6ba3afde77ccp1502a9jsn71f1821ee5f4',
};

const baseUrl = 'https://investing-cryptocurrency-markets.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoExchangeHeaders });

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getExchange: builder.query({
            query: ({ firstCurrencyID, secondCurrencyID }) => createRequest(`/currencies/get-rate?fromCurrency=${firstCurrencyID}&toCurrency=${secondCurrencyID}`),
        }),
        getList: builder.query({
            query: () => createRequest('/currencies/list'),
        }),
    }),
});

export const { useGetExchangeQuery, useGetListQuery } = cryptoExchangeApi;
