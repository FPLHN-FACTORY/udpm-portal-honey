import React, { useState } from "react";
import { Button, Card, Col, Modal, Row } from "antd";
import DialogTransaction from "../transaction/DialogTransaction";
const StudentChest = ({ setClose, transaction, open }) => {
  const [open1, setOpen] = useState(false);
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
  //   const data = useAppSelector(GetUser);

  //   window.addEventListener("beforeunload", () => {
  //     getStompClient().send(
  //       `/user/transaction/${transaction.idTransaction}/accept`,
  //       {},
  //       ""
  //     );
  //   });

  //   useEffect(() => {
  //     if (open) {
  //       getStompClient().subscribe(
  //         `/user/transaction/${transaction.idTransaction}/accept`,
  //         (result) => {
  //           if (result.body === "") {
  //             setClose(false);
  //           }
  //         }
  //       );
  //       getStompClient().send(
  //         `/user/transaction/${transaction.idTransaction}/accept`,
  //         {},
  //         JSON.stringify({
  //           ...transaction,
  //           formUser: data.name,
  //         })
  //       );
  //     }
  //   }, [transaction, open]);

  //   function cancelTransaction() {
  //     getStompClient().send(
  //       `/user/transaction/${transaction.idTransaction}/accept`,
  //       {},
  //       ""
  //     );
  //   }

  return (
    <>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button> */}
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <DialogTransaction key={"a"} transaction={"a"} />
      </Modal>

      <div className="dialog-transaction" style={{ minWidth: "800px" }}>
        <Card>
          <div className="bar-transaction" />
          <Row
            style={{
              padding: "5px 15px 0px 15px",
            }}
          >
            <Col span={12} className="col-title">
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
    </>
  );
};
export default StudentChest;
