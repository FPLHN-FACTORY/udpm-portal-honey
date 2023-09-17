import { CheckCircleFilled, MailFilled } from "@ant-design/icons";
import { Card, Col, Row } from "antd";
import moment from "moment/moment";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import localization from "moment/locale/vi";

const now = moment();
export default function ResultTransaction({ data }) {
  const [seconds, setSeconds] = useState(10);
  const formattedTime = now.format("HH:mm dddd DD-MM-YYYY");

  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      const timeout = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      navigate("/student/transaction");
    }
  }, [navigate, seconds]);
  
  return (
    <Fragment>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Card
            className="mt-10 mb-10"
            style={{
              width: "70%",
              boxShadow: "none",
              backgroundColor: "rgba(128, 128, 128, 0.05)",
            }}>
            <div
              style={{
                textAlign: "center",
              }}>
              {data.category.type === 0 ? (
                <CheckCircleFilled
                  style={{
                    fontSize: "50px",
                    color: "#EEB30D",
                    marginBottom: "10px",
                  }}
                />
              ) : (
                <MailFilled
                  style={{
                    fontSize: "50px",
                    color: "#EEB30D",
                    marginBottom: "10px",
                  }}
                />
              )}
              <div
                style={{
                  textTransform: "uppercase",
                  fontWeight: 500,
                  fontSize: "18px",
                }}>
                {data.category.type === 0
                  ? "Chuyển điểm thành công"
                  : "Đã gửi yêu cầu phê duyệt"}
              </div>
              <div
                style={{ color: "#EEB30D", fontWeight: 700, fontSize: "25px" }}>
                {data.honeyPoint} Điểm
              </div>
              <div style={{ fontSize: "15px" }}>{formattedTime}</div>
            </div>
            <Row className="verify-content">
              <Col span={24}>
                <hr />
              </Col>
              <Col span={12}>
                <span>Loại điểm</span>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <span style={{ fontWeight: 500 }}>{data.category.name}</span>
              </Col>
              <Col span={24}>
                <hr />
              </Col>
              <Col span={12}>
                <span>Mã người nhận</span>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <span style={{ fontWeight: 500 }}>{data.student.code}</span>
              </Col>
              <Col span={24}>
                <hr />
              </Col>
              <Col span={12}>
                <span>Tên người nhận</span>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <span style={{ fontWeight: 500 }}>{data.student.name}</span>
              </Col>
              <Col span={24}>
                <hr />
              </Col>
              <Col span={12}>
                <span>Nội dung</span>
              </Col>
              <Col span={12} style={{ textAlign: "end" }}>
                <span style={{ fontWeight: 500 }}>{data.note}</span>
              </Col>
            </Row>
          </Card>
        </div>
        <div className="mt-10" style={{ textAlign: "center", fontWeight: 500 }}>
          <Link to={"/student/transaction"}>
            <span style={{ color: "#EEB30D" }}>
              Quay lại trang chủ ({seconds}s)
            </span>
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
