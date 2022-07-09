/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { DollarCircleOutlined } from '@ant-design/icons';
import {
  Row,
  Col,
  Avatar,
  Card,
  Select,
  Typography,
  Input,
  Skeleton,
} from 'antd';
import bitcoin from '../images/bitcoin.png';
import dash from '../images/dash.png';
import bitcoinhash from '../images/bitcoincash.png';
import ethereum from '../images/ethereum.png';
import litecoin from '../images/litecoin.png';
import xrp from '../images/xrp.png';
import Loader from './Loader';
import {
  useGetExchangeQuery,
  useGetListQuery,
} from '../services/cryptoExchangeApi';
import ScrollToTop from '../helpers/ScrollToTop';

const { Meta } = Card;
const { Title } = Typography;
const { Option } = Select;

const Exchanges = () => {
  const [firstCurrency, setFirstCurrency] = useState('');
  const [firstCurrencyID, setFirstCurrencyID] = useState(189);
  const [secondCurrency, setSecondCurrency] = useState('');
  const [secondCurrencyID, setSecondCurrencyID] = useState(199);
  const { data, isFetching, isSuccess } = useGetListQuery();
  const [inputValue, setInputValue] = useState('');
  const { data: exchange } = useGetExchangeQuery({
    firstCurrencyID,
    secondCurrencyID,
  });
  if (!exchange) return <Loader />;
  if (isFetching) return <Loader />;
  const topList = data?.data[0][0].data;
  const exchangeValue = exchange?.data[0][0];
  let first;
  let second;
  let firstImage;
  let secondImage;
  if (isSuccess) {
    first = topList[0];
    second = topList[2];
  }
  const setFirstCurrencyFunction = (value) => {
    setFirstCurrency(value);
    for (const item in topList) {
      if (topList[item].fullname === value) {
        setFirstCurrencyID(String(topList[item].currency_ID));
      }
    }
  };

  const setSecondCurrencyFunction = (value) => {
    setSecondCurrency(value);
    for (const item in topList) {
      if (topList[item].fullname === value) {
        setSecondCurrencyID(String(topList[item].currency_ID));
      }
    }
  };
  const images = [
    { id: '189', img: bitcoin },
    { id: '215', img: bitcoinhash },
    { id: '199', img: dash },
    { id: '195', img: ethereum },
    { id: '191', img: litecoin },
    { id: '197', img: xrp },
  ];
  for (const key in images) {
    if (firstCurrencyID === images[key].id) {
      firstImage = images[key].img;
      secondImage = images[key].img;
    }
  }
  for (const key in images) {
    if (secondCurrencyID === images[key].id) {
      secondImage = images[key].img;
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="exchanges">
      <ScrollToTop />
      <Title level={2} className="exchange-title">
        Crypto Exchange
      </Title>
      <Row justify="center" gutter={[24, 24]} className="crypto-card-container">
        <Col xs={32} m={24} lg={12} className="crypto-card">
          <Select
            style={{ width: '100%' }}
            showSearch
            className="select-news"
            optionFilterProp="children"
            placeholder="Bitcoin"
            onChange={(value) => setFirstCurrencyFunction(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency" disabled>
              Cryptocurrency
            </Option>
            {topList.map((currency, i) => (
              <Option key={i} value={currency.fullname}>
                {currency.fullname}
              </Option>
            ))}
          </Select>
          <Card hoverable className="exchange-card">
            <Skeleton loading={isFetching} avatar active>
              <Meta
                avatar={<Avatar src={firstCurrency ? firstImage : bitcoin} />}
                title={firstCurrency || first.fullname}
                description="This is the description"
              />
            </Skeleton>
            <Input
              size="large"
              placeholder="Enter value"
              onChange={(e) => handleInputChange(e)}
              className="exchange-input"
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={32} m={24} lg={12} className="crypto-card">
          <Select
            style={{ width: '100%' }}
            showSearch
            className="select-news"
            optionFilterProp="children"
            placeholder="DASH"
            onChange={(value) => setSecondCurrencyFunction(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency" disabled>Cryptocurrency</Option>
            {topList.map((currency, i) => (
              <Option key={i} value={currency.fullname}>
                {currency.fullname}
              </Option>
              ))}
          </Select>
          <Card hoverable className="exchange-card">
            <Skeleton loading={isFetching} avatar active>
              <Meta
                avatar={<Avatar src={secondCurrency ? secondImage : dash} />}
                title={secondCurrency || second.fullname}
                description="This is the description"
              />
            </Skeleton>
            <Input
              disabled
              size="large"
              placeholder="Exchange"
              className="exchange-input"
              value={inputValue ? inputValue * exchangeValue.basic : ''}
              prefix={<DollarCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Exchanges;
