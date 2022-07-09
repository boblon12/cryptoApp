/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Options = (props) => (
  <div className="options">
    <h1 className="options-header">{props.title}</h1>
    <div className="options-container">
      {props.options.map((option) => (
        <div className="option-item" onClick={option.handler} key={option.id}>
          {option.name}
        </div>
          ))}
    </div>
  </div>
);

export default Options;
