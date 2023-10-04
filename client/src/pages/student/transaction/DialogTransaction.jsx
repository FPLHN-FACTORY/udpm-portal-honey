import { Button, Card, Col, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import "./DialogTransaction.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var stompClient = null;
const DialogTransaction = ({ setClose, idTransaction, open }) => {
  const chessSquares = Array.from({ length: 48 }, (_, i) => i);
  const chessSquares2 = Array.from({ length: 12 }, (_, i) => i);
  const [chest, setChest] = useState([]);
  const [chestTo, setChestTo] = useState({
    id: null,
    name: null,
    listItem: [],
    honey: 0,
    lock: false,
  });
  const [chestFrom, setChestFrom] = useState({
    id: null,
    listItem: [],
    honey: 0,
    lock: false,
  });

  const socket = new SockJS("http://localhost:2508/ws-honey-end-point");
  stompClient = Stomp.over(socket);

  useEffect(() => {
    if (open) {
      window.addEventListener("beforeunload", () => {
        stompClient.send(`/user/transaction/${idTransaction}/accept`, {}, "");
      });

      socket.onclose = () => {
        setClose(false);
        message.error("Mất kết nối đến WebSocket");
      };

      // stompClient.debug = () => {};

      stompClient.connect({}, () => {
        stompClient.subscribe(
          `/user/transaction/${idTransaction}/accept`,
          (result) => {
            if (result.body === "") {
              setClose(false);
            }
          }
        );
        stompClient.send(
          `/user/transaction/${idTransaction}/accept`,
          {},
          idTransaction
        );
      });
      return () => {
        stompClient.disconnect();
      };
    }
  }, [idTransaction, open]);

  function cancelTransaction() {
    stompClient.send(`/user/transaction/${idTransaction}/accept`, {}, "");
  }

  return (
    <div className="dialog-transaction" style={{ minWidth: "800px" }}>
      <Card>
        <Button className="close-button" onClick={() => cancelTransaction()}>
          X
        </Button>
        <div className="bar-transaction" />
        <Row
          style={{
            padding: "5px 15px 0px 15px",
          }}>
          <Col span={12} className="col-title">
            <div className="tag-backgroup">
              <b className="text-title">Triệu Văn Tưởng</b>
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
          <Col span={12} className="chest-transaction">
            <Row className="row-items">
              {chessSquares2.map((square) => (
                <Col key={square} span={4}>
                  <div className="chess-square">
                    <div className="item"></div>
                  </div>
                </Col>
              ))}
            </Row>
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                <img
                  className="honey-balo"
                  src={require("../../../assets/images/transaction-honey.png")}
                  alt="honey"
                />
                <input className="input-honey" disabled value={10000} />
              </div>
              <div className="tag-backgroup" style={{ margin: "5px 0px" }}>
                <b className="text-title">Vật phẩm của bạn</b>
              </div>
              <Row className="row-items">
                {chessSquares2.map((square) => (
                  <Col key={square} span={4}>
                    <div className="chess-square">
                      <div className="item"></div>
                    </div>
                  </Col>
                ))}
              </Row>
              <div className="my-10">
                <img
                  className="honey-balo"
                  src={require("../../../assets/images/transaction-honey.png")}
                  alt="honey"
                />
                <input className="input-honey" />
              </div>
            </div>
          </Col>
          <Col span={12}>
            <Row className="row-chest">
              {chessSquares.map((square) => (
                <Col key={square} span={4}>
                  <div className="chess-square">
                    <div className="item">
                      <img
                        className="img-item"
                        src={require("../../../assets/images/tim.jpg")}
                        alt="anh"
                      />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="div-button">
              <Button className="button-khoa">Khóa</Button>
              <Button className="button-xac-nhan">Xác nhận</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DialogTransaction;
