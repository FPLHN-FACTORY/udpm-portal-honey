import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, message } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";

export default function VerifyTransaction({ data, setCurrent, setLoading }) {
  const [codeVerify, setCodeVerify] = useState();
  const [seconds, setSeconds] = useState(180);

  const checkVerify = () => {
    setLoading(true);
    TransactionApi.checkVerify(codeVerify)
      .then((res) => {
        if (res.data) {
          message.success("Xác thực thành công");
          const transactionRequest = {
            idCategory: data.category.id,
            type: data.category.type,
            idHoney: data.honey.id,
            honeyPoint: data.honeyPoint,
            idStudent: data.student.id,
            note: data.note,
          };
          TransactionApi.transaction(transactionRequest)
            .then((res) => {
              if (res.data.success) {
                setCurrent(2);
              }
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {});
        } else {
          message.error("Mã xác minh không chính xác");
        }
      })
      .catch((err) => {
        console.error(err);
        message.error("Xác minh thất bại");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (seconds > 0) {
      const timeout = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [seconds]);

  const reCode = () => {
    if (seconds === 0) {
      setLoading(true);
      TransactionApi.verify()
        .then((response) => {
          if (response.data.success) {
            message.success("Gửi lại mã thành công");
            setSeconds(180);
          } else {
            message.error("Lỗi hệ thống, vui lòng thử lại sau");
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else message.error(`Không thể gửi mã sau (${seconds}s)`);
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Card
          className="mt-25"
          style={{
            width: "70%",
            boxShadow: "none",
            backgroundColor: "rgba(128, 128, 128, 0.05)",
          }}>
          <h4 style={{ margin: 0 }} className="text-center">
            Vui lòng nhập mã xác nhận đã được gửi về email
          </h4>
          <p style={{ margin: 0 }} className="text-center">
            {data.email}{" "}
            <span
              onClick={() => {
                if (seconds === 0) {
                  reCode();
                }
              }}
              style={{
                cursor: seconds === 0 ? "pointer" : "",
                color: "#EEB30D",
                fontWeight: 500,
              }}>
              [Gửi lại {seconds !== 0 ? `${seconds}s` : ""}]
            </span>
          </p>
          <div
            className="mt-10"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Input
              onChange={(e) => {
                setCodeVerify(e.target.value);
              }}
              placeholder="Nhập mã xác nhận"
              style={{ width: "70%", textAlign: "center" }}
            />
          </div>
        </Card>
      </div>
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
          <Row className="verify-content">
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
              <span>Số điểm</span>
            </Col>
            <Col span={12} style={{ textAlign: "end" }}>
              <span style={{ fontWeight: 500 }}>{data.honeyPoint} điểm</span>
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
      <div
        style={{
          marginBottom: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Button
          onClick={() => {
            setCurrent(0);
          }}
          style={{ marginRight: "15px", width: "20%", fontSize: "15px" }}>
          Quay lại
        </Button>
        <Button
          onClick={() => {
            checkVerify();
          }}
          className="send-button"
          type="primary"
          style={{ width: "20%", fontSize: "15px" }}>
          Xác nhận
          <CheckCircleFilled
            className="m-0 pl-5"
            style={{ fontSize: "15px" }}
          />
        </Button>
      </div>
    </Fragment>
  );
}
