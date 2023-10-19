import { Badge, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";

export default function TabsRequest({ selectIndex, type }) {
  const navigate = useNavigate();
  const [tatCa, setTatCa] = useState(0);
  const [congDiem, setCongDiem] = useState(0);
  const [giaoDich, setGiaoDich] = useState(0);
  const [doiQua, setDoiQua] = useState(0);

  useEffect(() => {
    RequestManagerAPI.conuntRequest(null).then((response) => {
      if (response.data.success) {
        setTatCa(response.data.data);
      }
    });
    RequestManagerAPI.conuntRequest(0).then((response) => {
      if (response.data.success) {
        setCongDiem(response.data.data);
      }
    });
    RequestManagerAPI.conuntRequest(1).then((response) => {
      if (response.data.success) {
        setGiaoDich(response.data.data);
      }
    });
    RequestManagerAPI.conuntRequest(2).then((response) => {
      if (response.data.success) {
        setDoiQua(response.data.data);
      }
    });
  }, []);

  useEffect(() => {
    switch (type) {
      case "CONG_DIEM":
        setCongDiem(congDiem - 1);
        setTatCa(tatCa - 1);
        break;
      case "GIAO_DICH":
        setGiaoDich(giaoDich - 1);
        setTatCa(tatCa - 1);
        break;
      case "DOI_QUA":
        setDoiQua(doiQua - 1);
        setTatCa(tatCa - 1);
        break;

      default:
        break;
    }
  }, [type]);

  return (
    <Space.Compact
      className="tab-request"
      style={{ marginBottom: 12, width: "100%" }}>
      <Radio.Group value={selectIndex} style={{ width: "100%" }}>
        <Radio.Button
          style={{ width: "50%" }}
          value={0}
          onClick={() => navigate("/censor/request-manager")}>
          Tất cả <Badge showZero count={tatCa} />
        </Radio.Button>
        {/* <Radio.Button
          style={{ width: "40%" }}
          value={1}
          onClick={() => navigate("/censor/request-manager/add-point")}>
          Yêu cầu cộng điểm <Badge showZero count={congDiem} />
        </Radio.Button> */}
        <Radio.Button
          style={{ width: "50%" }}
          value={2}
          onClick={() => navigate("/censor/request-manager/transaction")}>
          Yêu cầu giao dịch <Badge showZero count={giaoDich} />
        </Radio.Button>
      </Radio.Group>
    </Space.Compact>
  );
}
