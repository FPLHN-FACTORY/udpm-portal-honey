import React from "react";
import { Space, Table, Tooltip } from "antd";

import SweetAlert from "../../../components/alert/SweetAlert";
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
    key: "",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "",
  },
  {
    title: "Point",
    dataIndex: "point",
    key: "",
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: () => <div>Hành động</div>,
    key: "action",
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Đổi">
          <SweetAlert></SweetAlert>
        </Tooltip>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TableSliderPoint = () => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);
export default TableSliderPoint;
