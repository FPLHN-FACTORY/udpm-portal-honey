import { Radio, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function TabsRequest({ selectIndex }) {
  const navigate = useNavigate();
  return (
    <Space.Compact
      className="tab-request"
      style={{ marginBottom: 12, width: "100%" }}>
      <Radio.Group value={selectIndex} style={{ width: "100%" }}>
        <Radio.Button
          style={{ width: "10%" }}
          value={0}
          onClick={() => navigate("/censor/request-manager")}>
          Tất cả
        </Radio.Button>
        <Radio.Button
          style={{ width: "30%" }}
          value={1}
          onClick={() => navigate("/censor/request-manager/add-point")}>
          Yêu cầu cộng điểm
        </Radio.Button>
        <Radio.Button
          style={{ width: "30%" }}
          value={2}
          onClick={() => navigate("/")}>
          Yêu cầu giao dịch
        </Radio.Button>
        <Radio.Button
          style={{ width: "30%" }}
          value={3}
          onClick={() => navigate("/")}>
          Yêu cầu đổi quà
        </Radio.Button>
      </Radio.Group>
    </Space.Compact>
  );
}
