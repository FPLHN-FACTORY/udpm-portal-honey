import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';
import { AuctionChartAPI } from '../../../../apis/censor/auction/auctionLine.api';

export const DemoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    AuctionChartAPI.fetchLine().then((response) => {
      console.log(response.data.data);
      setData(response.data.data);
    });
    // fetch('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
    //   .then((response) => response.json())
    //   .then((json) => )
    //   .catch((error) => {
    //     console.log('fetch data failed', error);
    //   });
  };
  const config = {
    data,
    xField: 'date',
    yField: 'quantity',
    seriesField: 'giftName',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
};
