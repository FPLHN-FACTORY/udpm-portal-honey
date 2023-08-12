import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Column } from "@ant-design/plots";
function BarChart() {
  const data = [
    {
      country: "Chưa hoàn thành",
      year: "Huy",
      value: 502,
    },
    {
      country: "Chưa hoàn thành",
      year: "Hải",
      value: 635,
    },
    {
      country: "Chưa hoàn thành",
      year: "Hùng",
      value: 809,
    },
    {
      country: "Chưa hoàn thành",
      year: "Âhfdal",
      value: 947,
    },
    {
      country: "Chưa hoàn thành",
      year: "fdsafdsaf",
      value: 1402,
    },
    {
      country: "Chưa hoàn thành",
      year: "fdasf",
      value: 3634,
    },
    {
      country: "Chưa hoàn thành",
      year: "dsafsd",
      value: 5268,
    },
    {
      country: "Đã hoàn thành",
      year: "Huy",
      value: 106,
    },
    {
      country: "Đã hoàn thành",
      year: "Hải",
      value: 107,
    },
    {
      country: "Đã hoàn thành",
      year: "Hùng",
      value: 111,
    },
    {
      country: "Đã hoàn thành",
      year: "Âhfdal",
      value: 133,
    },
    {
      country: "Đã hoàn thành",
      year: "fdsafdsaf",
      value: 221,
    },
    {
      country: "Đã hoàn thành",
      year: "fdasf",
      value: 767,
    },
    {
      country: "Đã hoàn thành",
      year: "dsafsd",
      value: 1766,
    },
    {
      country: "Thành phần khác",
      year: "Huy",
      value: 163,
    },
    {
      country: "Thành phần khác",
      year: "Hải",
      value: 203,
    },
    {
      country: "Thành phần khác",
      year: "Hùng",
      value: 276,
    },
    {
      country: "Thành phần khác",
      year: "Âhfdal",
      value: 408,
    },
    {
      country: "Thành phần khác",
      year: "fdsafdsaf",
      value: 547,
    },
    {
      country: "Thành phần khác",
      year: "fdasf",
      value: 729,
    },
    {
      country: "Thành phần khác",
      year: "dsafsd",
      value: 628,
    },
  ];
  const config = {
    data,
    xField: "year",
    yField: "value",
    seriesField: "country",
    isPercent: true,
    isStack: true,
    label: {
      position: "middle",
      content: (item) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: "#fff",
      },
    },
  };
  return <Column {...config} />;
}

export default BarChart;
