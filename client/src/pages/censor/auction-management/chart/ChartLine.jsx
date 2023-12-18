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
      setData(response.data.data);
    });
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
