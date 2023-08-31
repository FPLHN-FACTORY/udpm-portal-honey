import React from "react";
import { Tabs } from "antd";
import TableSliderPoint from "./TableSliderPoint";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: `Tab 1`,
    // children: `Content of Tab Pane 1`,
    children: <TableSliderPoint></TableSliderPoint>,
  },
  {
    key: "2",
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];
const ChangePoint = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default ChangePoint;
