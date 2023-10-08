import React, { useState } from "react";
import { Button, Card, Col, Modal, Radio, Row, Space, Tabs } from "antd";
import "./studentChest.css";
import { useNavigate } from "react-router-dom";
// import DialogTransaction from "../transaction/DialogTransaction";
const StudentChest = ({ setClose, transaction, open }) => {
  const [open1, setOpen] = useState(false);
  const chessSquares = Array.from({ length: 300 }, (_, i) => i);
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

  const [tabPosition, setTabPosition] = useState("right");
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  return (
    <>
      <div
        className="dialog-transaction"
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
                    <span className="quantity-item">Sô lượng: 1</span>
                    <hr
                      style={{
                        height: "2px",
                        width: "85%",
                        backgroundColor: "black",
                      }}
                    />
                    <span className="quantity-item">
                      Sử dụng siêu nhân đỏ đấm chết cm cu nhật
                    </span>
                    <div className="div-button">
                      <Button className="button-khoa">Xóa</Button>
                      <Button className="button-xac-nhan">Sử dụng</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col span={14}>
              <Row className="row-chest">
                {chessSquares.map((square) => (
                  <Col key={square} span={4}>
                    <div className="chess-square">
                      <div className="item"></div>
                    </div>
                  </Col>
                ))}
              </Row>
              {/* 
              <Space
                style={{
                  marginBottom: 24,
                }}
              >
                Tab position:
                <Radio.Group value={tabPosition} onChange={changeTabPosition}>
                  <Radio.Button value="top">top</Radio.Button>
                  <Radio.Button value="bottom">bottom</Radio.Button>
                  <Radio.Button value="left">left</Radio.Button>
                  <Radio.Button value="right">right</Radio.Button>
                </Radio.Group>
              </Space> */}
            </Col>
            <Tabs
              tabPosition={tabPosition}
              items={new Array(5).fill(null).map((_, i) => {
                const id = String(i + 1);
                return {
                  label: `Tất cả`,
                  key: id,
                  // children: `Content of Tab ${id}`,
                };
              })}
              style={{ color: "white", fontWeight: "700" }}
            />
          </Row>
        </Card>
      </div>
    </>
  );
};
export default StudentChest;
