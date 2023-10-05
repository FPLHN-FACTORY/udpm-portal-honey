import { Button, Card, Col, Row, Space, Table, Tag } from "antd";
import "./auction-management.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFilter,
  faPenToSquare,
  faRectangleList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function AuctionMangement() {
  const data = [
    {
      stt: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      status: "1",
      tags: ["nice", "developer"],
    },
    {
      stt: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      status: "2",
      tags: ["loser"],
    },
    {
      stt: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      status: "1",
      tags: ["cool", "teacher"],
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => (
        <Tag
          color={text === "1" ? "green" : "red"}
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            borderRadius: "10px",
            width: "50%",
            textAlign: "center",
          }}
        >
          {text === "1" ? "Đang sử dụng" : "Không sử dụng"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      key: "action",
      width: "10px",
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{
              backgroundColor: "#FF9900",
              color: "white",
              height: "35px",
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </Button>
          <Button
            style={{
              backgroundColor: "#0066CC",
              color: "white",
              height: "35px",
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Card style={{ borderTop: "5px solid #FFCC00" }}>
        <Space
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <span style={{ fontSize: "18px" }}>
            <FontAwesomeIcon icon={faFilter} size="xl" />
            <b style={{ marginLeft: "5px", fontWeight: "500" }}>Bộ lọc</b>
          </span>
        </Space>
        <Space
          style={{
            justifyContent: "center",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <Row>
            <Col span={12}>
              <Button
                style={{
                  marginRight: "8px",
                  backgroundColor: "#0066CC",
                  color: "white",
                }}
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col span={12}>
              <Button
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#FF9900",
                  color: "white",
                }}
              >
                Làm mới
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
        <Space
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <span style={{ fontSize: "18px" }}>
            <FontAwesomeIcon icon={faRectangleList} size="xl" />
            <b style={{ marginLeft: "5px", fontWeight: "500" }}>
              Danh sách đấu giá
            </b>
          </span>
        </Space>

        <div
          style={{
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Table columns={columns} dataSource={data} />
        </div>
      </Card>
    </>
  );
}
