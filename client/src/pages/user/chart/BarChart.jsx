import React from "react";
import { Chart } from "react-google-charts";

const dataNew = [
  ["Name", "Popularity"],
  ["Cesar", 370],
  ["Rachel", 600],
  ["Patrick", 700],
  ["Eric", 1500],
];

const options = {
  legend: { position: "none" },
};

function BarChart() {
  return (
    <div className="ml-14">
      <h2>Biểu đồ thống kê tiến độ từng người</h2>
      <Chart
        // className="-pt-10"
        chartType="BarChart"
        width="100%"
        height="400px"
        data={dataNew}
        options={options}
      />
    </div>
  );
}

export default BarChart;
