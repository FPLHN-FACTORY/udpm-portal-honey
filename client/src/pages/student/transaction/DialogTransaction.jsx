import {
  Button,
  Card,
  Col,
  Modal,
  Popconfirm,
  Row,
  Select,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./DialogTransaction.css";
import { getStompClient } from "../../../helper/stomp-client/config";
import { useRef } from "react";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
import TextArea from "rc-textarea";

const DialogTransaction = ({ setOpen, transaction, open }) => {
  const [chestItem, setChestItem] = useState([]);
  const chessSquares2 = Array.from({ length: 12 }, (_, i) => i);

  const subscriptionRef = useRef(null);

  window.addEventListener("beforeunload", () => {
    cancelTransaction();
  });

  useEffect(() => {
    if (open) {
      const subscription = getStompClient().subscribe(
        `/portal-honey/transaction/${transaction.idTransaction}/cancel`,
        (result) => {
          const isCancel = JSON.parse(result.body);
          if (isCancel) {
            message.warning("Giao dịch đã bị hủy!");
            setOpen(false);
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

  function cancelTransaction() {
    getStompClient().send(
      `/action/transaction/${transaction.idTransaction}/cancel`,
      {},
      "lll"
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [categorys, setCategorys] = useState([]);
  const [cateSelect, setCateSelect] = useState(null);
  const [honey, setHoney] = useState(null);

  useEffect(() => {
    if (cateSelect) {
      TransactionApi.getHoney(cateSelect.value).then((res) => {
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
  }, [cateSelect]);

  function fetchData() {
    TransactionApi.getCategory().then((response) => {
      if (response.data.success) {
        const result = response.data.data;
        setCategorys(
          result.map((data) => {
            return {
              value: data.id,
              label: data.name,
              image: imageRender(data.image),
            };
          })
        );
        if (result.length > 0) {
          setCateSelect({
            value: result[0].id,
            label: result[0].name,
            image: imageRender(result[0].image),
          });
        }
      }
    });
  }

  function imageRender(image) {
    if (image) {
      const byteArray = image ? image.split(",").map(Number) : [];
      const base64ImageData = btoa(
        String.fromCharCode.apply(null, new Uint8Array(byteArray))
      );
      const imageUrl = `data:image/jpeg;base64,${base64ImageData}`;
      return imageUrl;
    } else {
      return "data/image";
    }
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
                <b className="text-title">Vật phẩm của bạn</b>
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
                      src={cateSelect?.image}
                      alt="balo"
                    />
                    {honey?.point} điểm {cateSelect?.label}
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
                {chessSquares2.map((square) => (
                  <Col key={square} span={4}>
                    <div className="chess-square">
                      <div className="item"></div>
                    </div>
                  </Col>
                ))}
              </Row>
              <div style={{ textAlign: "center" }}>
                {categorys.length > 0 && (
                  <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                    <img
                      className="honey-balo"
                      src={cateSelect?.image}
                      alt="honey"
                    />
                    <input className="input-honey" />
                    <span style={{ fontWeight: "900", color: "#464239" }}>
                      <Select
                        labelInValue
                        defaultValue={cateSelect}
                        onChange={(value) => {
                          const selectedCategory = categorys.find(
                            (category) => category.value === value.value
                          );
                          if (selectedCategory) {
                            setCateSelect({
                              ...value,
                              image: selectedCategory.image,
                            });
                          }
                        }}
                        className="select-category"
                        style={{
                          width: 100,
                        }}
                        options={[...categorys]}
                      />
                    </span>
                  </div>
                )}
                <div className="tag-backgroup" style={{ margin: "5px 0px" }}>
                  <b className="text-title">{transaction.formUser}</b>
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
                  <input className="input-honey" disabled value={10000} />
                  <span style={{ fontWeight: "900", color: "#464239" }}>
                    &nbsp; ĐỒNG
                  </span>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <Row className="row-chest">
                {chestItem.map((item) => (
                  <Col key={item.id} span={4}>
                    <Popconfirm
                      icon={<></>}
                      title={
                        <input
                          style={{ width: "100%" }}
                          className="input-honey"
                          placeholder="Nhập số lượng"
                        />
                      }
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
                              src={imageRender(item.image)}
                              alt="anh"
                            />
                          </div>
                        </div>
                      </Tooltip>
                    </Popconfirm>
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
    </Modal>
  );
};

export default DialogTransaction;
