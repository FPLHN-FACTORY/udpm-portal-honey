import React, { Component } from "react";
import Chart from "react-google-charts";

const pieData = [
  ["Task", "Hours per Day"],
  ["Hoan thanh", 4],
  ["Chua hoan thanh", 2],
];

// "title": tiêu đề của biểu đồ "My Daily Activities"
// "pieHole" để đặt độ lỗ của biểu đồ là 0.4 (tạo thành biểu đồ hình tròn lỗ).
const pieOptions = {
  // title: "My Daily Activities",
  pieHole: 0.4,
};
class DonutChart extends Component {
  render() {
    return (
      <div className=" ">
        <h2>Biểu đồ thống kê tổng tiến độ</h2>
        <Chart
          className="-ml-5 mt-5"
          width={"500px"}
          height={"320px"}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={pieData}
          options={pieOptions}
          rootProps={{ "data-testid": "3" }}
        />
      </div>
    );
  }
}
export default DonutChart;
