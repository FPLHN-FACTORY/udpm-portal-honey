import React, { useState } from "react";
import { Button, Space, Table, Tooltip } from "antd";
import SweetAlert from "../../../components/alert/SweetAlert";
import ModalDetail from "./ModalDetail";
const openModalDetail = () => {
  <ModalDetail></ModalDetail>;
};
const columns = [
  {
    title: "STT",
    dataIndex: "stt",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: () => <div>Hành động</div>,
    key: "action",
    render: (_, record) => (
      <Space size="small">
        {/* <Tooltip title="Chi tiết">
          <Button onClick={openModalDetail}> Detail</Button>
        </Tooltip> */}
        <ModalDetail></ModalDetail>
        <Tooltip title="Đổi">
          <SweetAlert></SweetAlert>
        </Tooltip>
      </Space>
    ),
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}
const ApprovalPoint = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const start = () => {
    setTimeout(() => {
      setSelectedRowKeys([]);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
export default ApprovalPoint;
