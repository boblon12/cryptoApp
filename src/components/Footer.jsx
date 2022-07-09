import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Footer() {
    const { activeTheme } = useAuth();
  return (
    <div
      className="footer"
      style={
      activeTheme
        ? { 'background-color': 'white' }
        : { 'background-color': '#001529' }
    }
    >
      <Typography.Title
        level={5}
        style={
        activeTheme
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
  );
}

export default Footer;
