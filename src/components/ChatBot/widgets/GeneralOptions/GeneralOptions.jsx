/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Options from './Options';

const GeneralOptions = (props) => {
  const options = [
    {
      name: 'Currency Exchange',
      handler: props.actionProvider.handleFirstdCurrencyChoice,
      id: 1,
    },
  ];
  return <Options options={options} title="Options" {...props} />;
};

export default GeneralOptions;
