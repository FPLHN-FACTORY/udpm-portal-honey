import { Card, Col, Row } from "antd";
import React from "react";
import "./AuctionRoom.css";
import { useNavigate } from "react-router-dom";

export default function StudentAuctionRoom() {
  const nav = useNavigate();
  const divArray = Array.from({ length: 3 }, (_, index) => index);
  return (
    <div className="main-ui-room">
      <p>
        <img
          src={require("../../../assets/images/honey.png")}
          alt="Room"
          height={30}
          width={30}
        />
        Phòng đấu giá
        <img
          src={require("../../../assets/images/honey.png")}
          alt="Room"
          height={30}
          width={30}
        />
      </p>
      <Card className="card-room">
        <Row justify="start">
          {divArray.map((_, index) => (
            <Col span={12} className="col-room">
              <div
                className="auction-room"
                onClick={() => {
                  nav("/student/auction-room-inside");
                }}
              >
                <p>Phiên đấu giá biển số</p>
                <p className="loai-diem">
                  <img
                    width={"40px"}
                    height={"36px"}
                    src={require("../../../assets/images/transaction-honey.png")}
                    alt="anh-loai-diem"
                    className="image-category"
                  />
                  SLIVER
                </p>
                <p>
                  Phí: <span>100 mật</span>
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}
