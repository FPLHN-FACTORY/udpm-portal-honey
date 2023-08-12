import React, { memo, useState } from "react";
import { Button, Col, Divider, Dropdown, Row, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import LineChart from "./LineChart";
import CombinedChart from "./MultipChart";
import DonutChart from "./DonutChart";
import BarChart from "./BarChart";
import "./index.css";
const TotalChart = memo(() => {
  const [activeChart, setActiveChart] = useState("article"); // Đặt "article" là giá trị mặc định ban đầu

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#1">
          Tháng
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#2">
          Năm
        </a>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          marginTop: "20px",
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          backgroundColor: "white",
        }}
      >
        <Row className="flex justify-between ">
          <Col xl={1}>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow
              trigger={"click"}
            >
              <Button
                style={{ borderRadius: "20px" }}
                className="ml-4"
                icon={<DownOutlined />}
              >
                Lọc
              </Button>
            </Dropdown>
          </Col>
          <Col xl={23} className="mb-4 ">
            <Space
              className="mr-4"
              style={{ display: "flex", justifyContent: "flex-end" }}
              split={<Divider type="vertical" />}
            >
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("article")}
                className={activeChart === "article" ? "active-button" : ""}
              >
                Bài viết
              </Button>
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("comment")}
                className={activeChart === "comment" ? "active-button" : ""}
              >
                Bình luận
              </Button>
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("status")}
                className={activeChart === "status" ? "active-button" : ""}
              >
                Cảm xúc
              </Button>
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setActiveChart("all")}
                className={activeChart === "all" ? "active-button" : ""}
              >
                Tất cả
              </Button>
            </Space>
          </Col>
        </Row>
        {activeChart === "article" && <LineChart />}
        {activeChart === "comment" && <LineChart />}
        {activeChart === "status" && <LineChart />}
        {activeChart === "all" && <CombinedChart />}
      </div>
      <div
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          marginTop: "20px",
          paddingTop: "20px",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "20px",
          backgroundColor: "white",
        }}
      >
        <Row>
          <Col xs={8}>
            <DonutChart></DonutChart>
          </Col>
          <Col xs={15} className="ml-1">
            <BarChart></BarChart>
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default TotalChart;
