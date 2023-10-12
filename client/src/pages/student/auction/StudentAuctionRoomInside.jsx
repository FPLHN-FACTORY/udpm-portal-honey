import { Button, Card, Col, Modal, Row, Tabs } from "antd";
import React, { useState } from "react";
import "./AuctionRoomInside.css";
import { DollarOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function StudentAuctionRoomInside() {
  const nav = useNavigate();
  const divArray = Array.from({ length: 20 }, (_, index) => index);

  const chessSquares = Array.from({ length: 300 }, (_, i) => i);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        closeIcon={
          <span className="custom-close-icon">X</span>
        }
      >
        <div
          className="modal-create-auction"
          style={{ minWidth: "800px", Height: "1000px" }}
        >
          <Card>
            <div className="bar-transaction" />
            <Row
              style={{
                padding: "5px 15px 0px 15px",
              }}
            >
              <Col span={12}>
                <div className="tag-backgroup">
                  <b className="text-title"></b>
                </div>
              </Col>
              <Col span={12} className="col-title-balo">
                <div>
                  <b className="title-balo">
                    <img
                      className="img-balo"
                      height={"30px"}
                      src={require("../../../assets/images/balo-student.png")}
                      alt="balo"
                    />
                    TÚI ĐỒ
                  </b>
                </div>
              </Col>
            </Row>
            <Row className="row-content">
              <Col span={7} className="chest-transaction">
                <Row className="row-items">
                  <Col span={4}>
                    <div className="chess-square-note">
                      <div className="item">
                        <img
                          src={require("../../../assets/images/ui-student/avata-item.png")}
                          alt=""
                        />
                      </div>
                      <span className="name-item">Siêu nhân đỏ</span>
                      <hr
                        style={{
                          height: "2px",
                          width: "85%",
                          backgroundColor: "black",
                        }}
                      />
                      <div className="div-button">
                        <Button className="button-xac-nhan">Tạo bàn</Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col span={17}>
                <Row className="row-chest">
                  {chessSquares.map((square) => (
                    <Col key={square} span={4}>
                      <div className="chess-square">
                        <div className="item"></div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </div>
      </Modal>
      <div className="auction-main-inside">
        <Card title={""} className="cartAllConversion">
          <div className="title">
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
                onClick={showModal}
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
    </>
  );
}
