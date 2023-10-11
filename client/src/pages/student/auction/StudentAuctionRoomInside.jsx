import { Card, Col, Row } from "antd";
import React from "react";
import "./AuctionRoomInside.css";
import { DollarOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function StudentAuctionRoomInside() {
  const nav = useNavigate();
  const divArray = Array.from({ length: 20 }, (_, index) => index);
  return (
    <div className="auction-main-inside">
      <Card title={""} className="cartAllConversion">
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ fontSize: "20px", color: "#A55600" }}>
            <img
              src={require("../../../assets/images/honey.png")}
              alt="Gift"
              height={30}
              width={30}
            />
            <span className="auction-text">Các phiên đấu giá</span>

            <img
              src={require("../../../assets/images/honey.png")}
              alt="Gift"
              height={30}
              width={30}
            />
          </p>
          <div>
            {" "}
            <img
              src={require("../../../assets/images/ui-student/btn-add-auction-inside.png")}
              alt="Gift"
              height={30}
              width={30}
              className="btn-add-auction-inside"
            />
          </div>
        </div>

        <Card className="cardGift">
          <Row justify="start">
            {divArray.map((_, index) => (
              <Col span={6} className="col-aucion">
                <div
                  className="auction-room-inside"
                  onClick={() => {
                    nav("/student/auction");
                  }}
                >
                  <span className="user-online">
                    <div />
                    200 <UserOutlined style={{ fontSize: "20px" }} />
                  </span>
                  <span className="time">10:40</span>

                  <img
                    src={require("../../../assets/images/ui-student/avata-item.png")}
                    alt=""
                    width={100}
                    height={60}
                    style={{ marginTop: "-60px" }}
                  />
                  <p className="name-gift-acution"> Vật phẩm đấu giá</p>
                  <span className="price">
                    {" "}
                    <DollarOutlined /> 10000 - 50000
                  </span>
                </div>
              </Col>
            ))}
          </Row>
        </Card>
      </Card>
    </div>
  );
}
