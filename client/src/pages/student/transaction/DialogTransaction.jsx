import {
  Button,
  Card,
  Col,
  Modal,
  Popconfirm,
  Row,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./DialogTransaction.css";
import { getStompClient } from "../../../helper/stomp-client/config";
import { useRef } from "react";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";

const DialogTransaction = ({ setOpen, transaction, open }) => {
  const [chestItem, setChestItem] = useState([]);
  const oGiaoDich = Array.from({ length: 12 }, (_, i) => i);
  const [inputSoLuong, setInputSoLuong] = useState(null);
  const [ruongDen, setRuongDen] = useState({
    idUser: transaction.idUser,
    item: [],
    honey: 0,
    lock: false,
    xacNhan: false,
  });
  const [ruongDi, setRuongDi] = useState({
    item: [],
    honey: 0,
    lock: false,
    xacNhan: false,
  });

  const subscriptionRef = useRef(null);

  useEffect(() => {
    TransactionApi.getCategory().then((response) => {
      if (response.data.success) {
        setCategory(response.data.data);
      }
    });
    ProfileApi.getUserLogin().then((response) => {
      setRuongDi({ ...ruongDi, idUser: response.data.data.idUser });
    });
    window.addEventListener("beforeunload", () => {
      cancelTransaction();
    });
  }, []);

  useEffect(() => {
    if (open) {
      const subscription = getStompClient().subscribe(
        `/portal-honey/transaction/${transaction.idTransaction}`,
        (result) => {
          const data = JSON.parse(result.body);
          if (data.data.cancel) {
            message.warning("Giao dịch đã bị hủy!");
            setOpen(false);
          } else {
            if (data.success) {
              getItem(data.data);
            }
          }
        }
      );
      subscriptionRef.current = subscription;
    } else {
      const subscription = subscriptionRef.current;
      if (subscription) {
        subscription.unsubscribe();
      }
    }
    return () => {
      const subscription = subscriptionRef.current;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [open]);

  useEffect(() => {
    if (ruongDi.xacNhan && ruongDen.xacNhan) {
      message.success("Giao dịch thành công!");
      setOpen(false);
    }
  }, [ruongDen.xacNhan, ruongDi.xacNhan]);

  const [inputHoney, setInputHoney] = useState(0);

  function getItem(result) {
    if (result.idUser === ruongDen.idUser) {
      const preItem = ruongDen.item;
      if (result.id) {
        const index = preItem.findIndex((item) => item.id === result.id);
        if (index !== -1) {
          preItem[index] = {
            ...preItem[index],
            quantity: preItem[index].quantity + result.quantity,
          };
          if (preItem[index].quantity === 0) {
            preItem.splice(index, 1);
          }
        } else {
          preItem.push({
            id: result.id,
            name: result.name,
            quantity: result.quantity,
            image: result.image,
          });
        }
      }
      setRuongDen({
        ...ruongDen,
        item: preItem,
        honey: result.honey ? result.honey : 0,
        lock: result.lock,
        xacNhan: result.xacNhan,
      });
    }
  }

  function cancelTransaction() {
    getStompClient().send(
      `/transaction/${transaction.idTransaction}/cancel`,
      {}
    );
  }

  const [category, setCategory] = useState(null);
  const [honey, setHoney] = useState({ point: 0 });

  useEffect(() => {
    if (category) {
      TransactionApi.getHoney(category.id).then((res) => {
        if (res.data.success) {
          setHoney(res.data.data);
        }
      });
    }
    TransactionApi.getGift().then((res) => {
      if (res.data.success) {
        setChestItem(res.data.data);
      }
    });
  }, [category]);

  function sendItem(item) {
    if (!isNaN(inputSoLuong)) {
      const inputValue = parseInt(inputSoLuong);
      if (inputValue > 0) {
        if (inputValue <= item.quantity) {
          const preItem = ruongDi.item;
          const index = preItem.findIndex((item2) => item.id === item2.id);
          if (index !== -1) {
            preItem[index] = {
              ...preItem[index],
              quantity: preItem[index].quantity + inputValue,
            };
          } else {
            preItem.push({
              id: item.id,
              name: item.name,
              quantity: inputValue,
              image: item.image,
            });
          }
          setRuongDi({ ...ruongDi, item: preItem });

          const preChestItem = chestItem;
          const indexChest = preChestItem.findIndex(
            (item2) => item.id === item2.id
          );
          preChestItem[indexChest] = {
            ...preChestItem[indexChest],
            quantity: preChestItem[indexChest].quantity - inputValue,
          };
          setChestItem(preChestItem);
          setRuongDi({ ...ruongDi, item: preItem });
          getStompClient().send(
            `/transaction/send-item/${transaction.idTransaction}`,
            {},
            JSON.stringify({
              idUser: ruongDi.idUser,
              ...item,
              quantity: inputValue,
              honey: ruongDi.honey,
              lock: ruongDen.lock,
              xacNhan: ruongDen.xacNhan,
            })
          );
        } else {
          message.error("Số lượng không hợp lệ");
        }
      } else {
        message.error("Vui lòng nhập số lớn hơn 0");
      }
    } else {
      message.error("Vui lòng nhập số!");
    }
  }
  function rollbackItem(item) {
    if (!isNaN(inputSoLuong)) {
      const inputValue = parseInt(inputSoLuong);
      if (inputValue > 0) {
        if (inputValue <= item.quantity) {
          const preItem = ruongDi.item;
          const index = preItem.findIndex((item2) => item.id === item2.id);
          if (index !== -1) {
            preItem[index] = {
              ...preItem[index],
              quantity: preItem[index].quantity - inputValue,
            };
          }
          if (preItem[index].quantity === 0) {
            preItem.splice(index, 1);
          }
          setRuongDi({ ...ruongDi, item: preItem });

          const preChestItem = chestItem;
          const indexChest = preChestItem.findIndex(
            (item2) => item.id === item2.id
          );
          preChestItem[indexChest] = {
            ...preChestItem[indexChest],
            quantity: preChestItem[indexChest].quantity + inputValue,
          };
          setChestItem(preChestItem);
          setRuongDi({ ...ruongDi, item: preItem });
          getStompClient().send(
            `/transaction/send-item/${transaction.idTransaction}`,
            {},
            JSON.stringify({
              idUser: ruongDi.idUser,
              ...item,
              quantity: inputValue - inputValue * 2,
              honey: ruongDi.honey,
              lock: ruongDen.lock,
              xacNhan: ruongDen.xacNhan,
            })
          );
        } else {
          message.error("Số lượng không hợp lệ");
        }
      } else {
        message.error("Vui lòng nhập số lớn hơn 0");
      }
    } else {
      message.error("Vui lòng nhập số!");
    }
  }

  function send(request) {
    getStompClient().send(
      `/transaction/send-item/${transaction.idTransaction}`,
      {},
      JSON.stringify(request)
    );
  }

  function hoanThanh() {
    const data = {
      ruongDen: ruongDen,
      ruongDi: ruongDi,
      idCategory: category.id,
    };
    TransactionApi.doneTransaction(data).then((response) => {
      if (response.data.success && response.data.data) {
        sendXacNhan();
      }
    });
  }

  function sendXacNhan() {
    setRuongDi({ ...ruongDi, xacNhan: true, honey: parseInt(inputHoney) });
    send({
      honey: inputHoney,
      idUser: ruongDi.idUser,
      xacNhan: true,
      lock: ruongDi.lock,
    });
  }

  return (
    <Modal
      open={open}
      closeIcon={<></>}
      footer={null}
      width={850}
      className="css-modal-confim-transaction">
      <div className="dialog-transaction">
        <Card>
          <Button
            className="close-button"
            onClick={() => {
              cancelTransaction();
            }}>
            X
          </Button>
          <div className="bar-transaction" />
          <Row
            style={{
              padding: "5px 15px 0px 15px",
            }}>
            <Col span={12} className="col-title">
              <div className="tag-backgroup">
                <b className="text-title">
                  Vật phẩm của bạn -{" "}
                  {ruongDi.xacNhan
                    ? "Đã xác nhận"
                    : ruongDi.lock
                    ? "Đã khóa"
                    : "Chưa khóa"}
                </b>
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
                {honey ? (
                  <b className="title-honey">
                    <img
                      className="img-honey"
                      height={"25px"}
                      src={category?.image}
                      alt="balo"
                    />
                    {honey?.point} điểm {category?.name}
                  </b>
                ) : (
                  <b className="title-honey">không có điểm</b>
                )}
              </div>
            </Col>
          </Row>
          <Row className="row-content">
            <Col span={12} className="chest-transaction">
              <Row className="row-items">
                {oGiaoDich.map((square, index) => (
                  <Col key={square} span={4}>
                    <div className="chess-square">
                      <div className="item">
                        {ruongDi.item.length - 1 >= index ? (
                          <div className="item">
                            {!ruongDi.lock ? (
                              <Popconfirm
                                icon={<></>}
                                title={
                                  <input
                                    type="number"
                                    onChange={(e) => {
                                      setInputSoLuong(e.target.value);
                                    }}
                                    style={{ width: "150px", color: "black" }}
                                    className="input-honey"
                                    placeholder="Nhập số lượng"
                                  />
                                }
                                onConfirm={() => {
                                  rollbackItem(ruongDi.item[index]);
                                }}
                                okText="Xác nhận"
                                cancelText="Hủy">
                                <Tooltip
                                  placement="right"
                                  title={ruongDi.item[index]?.name}>
                                  <span
                                    style={{
                                      position: "absolute",
                                      bottom: "2px",
                                      right: "7px",
                                      color: "white",
                                    }}>
                                    {ruongDi.item[index]?.quantity}
                                  </span>
                                  <img
                                    className="img-item"
                                    src={ruongDi.item[index]?.image}
                                    alt="anh"
                                  />
                                </Tooltip>
                              </Popconfirm>
                            ) : (
                              <Tooltip
                                placement="right"
                                title={ruongDi.item[index]?.name}>
                                <span
                                  style={{
                                    position: "absolute",
                                    bottom: "2px",
                                    right: "7px",
                                    color: "white",
                                  }}>
                                  {ruongDi.item[index]?.quantity}
                                </span>
                                <img
                                  className="img-item"
                                  src={ruongDi.item[index]?.image}
                                  alt="anh"
                                />
                              </Tooltip>
                            )}
                          </div>
                        ) : (
                          <div className="item"></div>
                        )}
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <div style={{ textAlign: "center" }}>
                {category && (
                  <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                    <img
                      className="honey-balo"
                      src={category?.image}
                      alt="honey"
                    />
                    <input
                      placeholder="nhập số lượng"
                      disabled={ruongDi.lock}
                      onBlur={(e) => {
                        if (!isNaN(e.target.value)) {
                          if (parseInt(e.target.value) <= honey.point) {
                            setInputHoney(e.target.value);
                            send({
                              idUser: ruongDi.idUser,
                              honey: e.target.value,
                            });
                          } else {
                            send({
                              idUser: ruongDi.idUser,
                              honey: 0,
                            });
                            message.error("Số lượng mật không hợp lệ");
                          }
                        } else {
                          send({
                            idUser: ruongDi.idUser,
                            honey: 0,
                          });
                          message.error("Số lượng mật phải là số");
                        }
                      }}
                      className="input-honey"
                    />
                    <span style={{ fontWeight: "900", color: "#fff" }}>
                      &nbsp; {category?.name}
                    </span>
                  </div>
                )}
                <div className="tag-backgroup" style={{ margin: "5px 0px" }}>
                  <b className="text-title">
                    {transaction.formUser} -{" "}
                    {ruongDen.xacNhan
                      ? "Đã xác nhận"
                      : ruongDen.lock
                      ? "Đã khóa"
                      : "Chưa khóa"}
                  </b>
                </div>
                <Row className="row-items">
                  {oGiaoDich.map((square, index) => (
                    <Col key={square} span={4}>
                      <div className="chess-square">
                        <div className="item">
                          {ruongDen.item.length - 1 >= index ? (
                            <div className="item">
                              <Popconfirm
                                icon={<></>}
                                title={
                                  <input
                                    style={{ width: "100%", color: "black" }}
                                    className="input-honey"
                                    placeholder="Nhập số lượng"
                                  />
                                }
                                okText="Xác nhận"
                                cancelText="Hủy">
                                <Tooltip
                                  placement="right"
                                  title={ruongDen.item[index]?.name}>
                                  <span
                                    style={{
                                      position: "absolute",
                                      bottom: "2px",
                                      right: "7px",
                                      color: "white",
                                    }}>
                                    {ruongDen.item[index]?.quantity}
                                  </span>
                                  <img
                                    className="img-item"
                                    src={ruongDen.item[index]?.image}
                                    alt="anh"
                                  />
                                </Tooltip>
                              </Popconfirm>
                            </div>
                          ) : (
                            <div className="item"></div>
                          )}
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="my-10">
                  <img
                    className="honey-balo"
                    src={category?.image}
                    alt="honey"
                  />
                  <b style={{ fontSize: "16px", color: "white" }}>
                    {ruongDen.honey}
                  </b>
                  <span style={{ fontWeight: "900", color: "#fff" }}>
                    &nbsp; {category?.name}
                  </span>
                </div>
              </div>
            </Col>
            <Col span={12}>
              {chestItem.length > 0 ? (
                <Row className="row-chest">
                  {chestItem.map((item) => (
                    <Col key={item.id} span={4}>
                      {item.quantity > 0 && !ruongDi.lock ? (
                        <Popconfirm
                          icon={<></>}
                          title={
                            <input
                              type="number"
                              onChange={(e) => {
                                setInputSoLuong(e.target.value);
                              }}
                              style={{ width: "150px", color: "black" }}
                              className="input-honey"
                              placeholder="Nhập số lượng"
                            />
                          }
                          onConfirm={() => {
                            sendItem(item);
                          }}
                          okText="Xác nhận"
                          cancelText="Hủy">
                          <Tooltip placement="right" title={item.name}>
                            <div className="chess-square">
                              <span
                                style={{
                                  position: "absolute",
                                  bottom: "2px",
                                  right: "7px",
                                  color: "white",
                                }}>
                                {item.quantity}
                              </span>
                              <div className="item">
                                <img
                                  className="img-item"
                                  src={item.image}
                                  alt="anh"
                                />
                              </div>
                            </div>
                          </Tooltip>
                        </Popconfirm>
                      ) : (
                        <Tooltip placement="right" title={item.name}>
                          <div className="chess-square">
                            <span
                              style={{
                                position: "absolute",
                                bottom: "2px",
                                right: "7px",
                                color: "white",
                              }}>
                              {item.quantity}
                            </span>
                            <div className="item">
                              <img
                                className="img-item"
                                src={item.image}
                                alt="anh"
                              />
                            </div>
                          </div>
                        </Tooltip>
                      )}
                    </Col>
                  ))}
                </Row>
              ) : (
                <div
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                  }}>
                  Không có vật phẩm nào
                </div>
              )}
              <div className="div-button">
                <Button
                  disabled={ruongDen.xacNhan || ruongDi.xacNhan}
                  className={
                    ruongDi.lock || ruongDen.xacNhan || ruongDi.xacNhan
                      ? "button-khoa-disabled"
                      : "button-khoa"
                  }
                  onClick={() => {
                    if (!ruongDen.xacNhan) {
                      setRuongDi({
                        ...ruongDi,
                        lock: !ruongDi.lock,
                        honey: parseInt(inputHoney),
                      });
                      send({
                        honey: inputHoney,
                        idUser: ruongDi.idUser,
                        lock: !ruongDi.lock,
                      });
                    }
                  }}>
                  Khóa
                </Button>
                <Button
                  onClick={() => {
                    if (ruongDen.xacNhan) {
                      hoanThanh();
                    } else {
                      sendXacNhan();
                    }
                  }}
                  disabled={!(ruongDen.lock && ruongDi.lock) || ruongDi.xacNhan}
                  className="button-xac-nhan">
                  Xác nhận
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </Modal>
  );
};

export default DialogTransaction;
