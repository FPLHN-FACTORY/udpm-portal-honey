import { Button, Card, Col, Layout, Modal, Row } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useState } from "react";
import "./UpgradeHoney.css";

const chessSquares = Array.from({ length: 1000 }, (_, i) => i);

const dataHoney = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: "Honey " + (i + 1),
}));
const itemUpdate = Array.from({ length: 20 }, (_, i) => i);

export default function UpgradeHoney() {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemLevel, setItemLevel] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [successRate, setSuccessRate] = useState(0.5);

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const hideConfirmModal = () => {
    setIsConfirmModalVisible(false);
  };

  const showResultModal = () => {
    setIsResultModalVisible(true);
  };

  const hideResultModal = () => {
    setIsResultModalVisible(false);
    setIsAnimating(false);

    if (isSuccess) {
      setSuccessRate(successRate - 0.05);
      setItemLevel(itemLevel + 1);
    }
  };

  const handleConfirm = () => {
    hideConfirmModal();

    const isSuccess = Math.random() < successRate;
    setIsSuccess(isSuccess);

    setIsAnimating(true);

    setTimeout(() => {
      if (isSuccess) {
        setResultMessage("Bạn đã đập thành công!");
      } else {
        setResultMessage("Bạn đã thất bại.");
      }

      setIsAnimating(false);
      showResultModal();
    }, 2000);
  };
  return (
    <div style={{ height: "100%" }} className="upgrade-honey">
      <Layout style={{ height: "100%" }}>
        <Layout>
          <Content>
            <Row>
              <Col span={12} style={{ height: "100%" }}>
                <div className="content-honey">
                  <p>Chọn loại honey để nâng cấp</p>
                  <div className="row-chest">
                    {dataHoney.map((data) => (
                      <Card className="card-honey" key={data.id}>
                        <Row justify="start">
                          <Col span={24} className="col-honey">
                            <div className="auction-honey">
                              <img
                                src={require("../../../assets/images/balo-student.png")}
                                alt=""
                                style={{
                                  width: "50px",
                                  height: "50px",
                                }}
                              />
                              <span className="name-honey">
                                {data.name} - Phí - 1000
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                  </div>
                </div>
              </Col>

              <Col span={12} style={{ height: "100%" }}>
                <div className="content-honey">
                  <p>Chọn vật phẩm để nâng cấp</p>
                  <div className="chest-honey">
                    <Row>
                      {itemUpdate.map((item) => (
                        <Col key={item} span={6}>
                          <div className="item-square"></div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Content>
          <Footer
            style={{
              width: "100%",
              padding: "0",
              borderTop: "5px solid black",
            }}
          >
            <div style={{ height: "100%" }}>
              <Card>
                <div className="bar-transaction" />
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
                <Row className="row-content">
                  <Col span={24}>
                    <Row className="row-chest">
                      {chessSquares.map((square) => (
                        <Col key={square} span={3}>
                          <div className="chess-square">
                            <div className="item">
                              <img
                                src={require("../../../assets/images/ui-student/avata-item.png")}
                                alt=""
                              />
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              </Card>
            </div>
          </Footer>
        </Layout>
        <Sider>
          <Modal
            title={`Xác nhận đập đồ (${(successRate * 100).toFixed(2)}%)`}
            visible={isConfirmModalVisible}
            onOk={handleConfirm}
            onCancel={hideConfirmModal}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            Bạn có muốn đập đồ không?
          </Modal>

          <Modal
            title={isSuccess ? "Thành công" : "Thất bại"}
            visible={isResultModalVisible}
            onOk={hideResultModal}
            okText="OK"
          >
            {resultMessage}
          </Modal>
          <div className="dapdo">
            <div className="middapdo">
              <div className="gift-box-container">
                <h3>Lúc đầu</h3>
                <div
                  className={`chess-square-note ${isAnimating ? "shake" : ""}`}
                >
                  <div className="item">
                    <img
                      src={require("../../../assets/images/ui-student/avata-item.png")}
                      alt=""
                    />
                  </div>
                </div>
                <p className="name-item">Siêu nhân đỏ</p>
                <p className="quantity-item">
                  Tỉ lệ thành công: {(successRate * 100).toFixed(2)}%
                </p>
                <p className="quantity-item">Phí đập:</p>
                <hr
                  style={{
                    height: "2px",
                    width: "90%",
                    backgroundColor: "black",
                    margin: "20px",
                  }}
                />
                <h3>Lúc sau</h3>
                <div
                  className={`chess-square-note ${isAnimating ? "shake" : ""}`}
                >
                  <div className={`item item-${itemLevel}`}>
                    <img
                      src={require("../../../assets/images/ui-student/avata-item.png")}
                      alt=""
                    />
                  </div>
                </div>
                <span className="name-item">Siêu nhân đỏ</span>
              </div>
            </div>
            <div className="div-button">
              <Button
                className="use-button"
                onClick={showConfirmModal}
                disabled={isAnimating}
              >
                Đập đồ
              </Button>
            </div>
          </div>
        </Sider>
      </Layout>
    </div>
  );
}
