import { Button, Card, Row, Space, Spin, Table } from "antd";
import React, { useState } from "react";
import ModalConfirm from "./ModalConfirm";
import { Link } from "react-router-dom";

export default function ListDataImport() {
  const [open, setOpen] = useState(false);

  const dataSource = [
    {
      key: "1",
      stt: "1",
      tenDangNhap: "tuannvph25577",
      email: "tuannvph25577@fpt.edu.vn",
      status: true,
    },
    {
      key: "2",
      stt: "2",
      tenDangNhap: "haipxph26772",
      email: "haipxph26772@fpt.edu.vn",
      status: false,
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "tenDangNhap",
      key: "ten dang nhap",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return record.status === true ? (
          <span style={{ color: "green" }}>Thành công</span>
        ) : (
          <span style={{ color: "red" }}>Thất bại</span>
        );
      },
    },
  ];

  return (
    <div>
      <Spin spinning={false}>
        {/* <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
          aaa
        </Card> */}

        <Card style={{ borderTop: "5px solid #FFCC00" }}>
          <Row style={{ marginBottom: "32px" }}>
            <b style={{ fontSize: "25px" }}>Dữ liệu import</b>
          </Row>
          <Table dataSource={dataSource} columns={columns} />
          <Space
            style={{
              justifyContent: "right",
              display: "flex",
              marginTop: "32px",
            }}
          >
            <Button className="button-css">CLOSE</Button>
           
              <Button className="button-css" onClick={() => setOpen(true)}>
                ADD
              </Button>
           
            {open && <ModalConfirm open={open} setOpen={setOpen} />}
          </Space>
        </Card>
      </Spin>
    </div>
  );
}
