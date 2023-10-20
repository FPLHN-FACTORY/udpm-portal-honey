import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import "./AuctionRoom.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetAuction,
  SetAuction,
} from "../../../app/reducers/auction/auction.reducer";
import { StudentAuctionAPI } from "../../../apis/student/auction/auction.api";

export default function StudentAuctionRoom() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const listAuction = useAppSelector(GetAuction);

  const loadData = () => {
    StudentAuctionAPI.fetchAll().then((res) => {
      dispatch(SetAuction(res.data.data));
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

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
          {listAuction.map((response) => (
            <Col span={12} className="col-room">
              <div
                className="auction-room"
                onClick={() => {
                  nav(`/student/auction-room-inside/${response.id}`);
                }}
              >
                <p>Phiên đấu giá biển số {response.stt}</p>
                <p className="loai-diem">
                  <img
                    width={"40px"}
                    height={"36px"}
                    src={require("../../../assets/images/transaction-honey.png")}
                    alt="anh-loai-diem"
                    className="image-category"
                  />
                  {response.categoryName}
                </p>
                <p>
                  Phí: <span>{response.honey}</span>
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}
