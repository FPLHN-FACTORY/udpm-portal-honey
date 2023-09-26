import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
} from "antd";
import React, { useState } from "react";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
import localization from "moment/locale/vi";
import TabPane from "antd/es/tabs/TabPane";

export default function TransactionHistory() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <Spin spinning={loading}>
      <div className="add-point create-transaction">
        <Card title="Lịch sử giao dịch">
          <div
            className="my-15"
            style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "10px", width: "30%" }}>
              <p style={{ margin: 0, fontWeight: "500" }}>UserName</p>
              <Input placeholder="Tìm kiếm user name" />
            </div>
            <div style={{ marginRight: "10px" }}>
              <p style={{ margin: 0, fontWeight: "500" }}>Từ ngày</p>
              <Input type="date" />
            </div>
            <div style={{ marginRight: "10px" }}>
              <p style={{ margin: 0, fontWeight: "500" }}>Đến ngày</p>
              <div style={{ display: "flex" }}>
                <Input type="date" style={{ marginRight: "10px" }} />
                <Button
                  className="search-button"
                  type="primary"
                  style={{ margin: 0 }}>
                  Lọc
                </Button>
              </div>
            </div>
          </div>
         
        </Card>
      </div>
    </Spin>
  );
}
