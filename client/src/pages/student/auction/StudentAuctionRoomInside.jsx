import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./AuctionRoomInside.css";
import { DollarOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetAuction,
  SetAuction,
} from "../../../app/reducers/auction/auction.reducer";
import { StudentAuctionAPI } from "../../../apis/student/auction/auction.api";
import { Base64Image } from "../../util/ByteArrayToImage";
import { GetUser } from "../../../app/reducers/users/users.reducer";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { CountdownTimer } from "../../util/CountdownTimer";

export default function StudentAuctionRoomInside() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(GetUser);

  const [search, setSearch] = useState({
    id: id,
    name: "",
    nameGift: "",
    startingPrice: null,
    lastPrice: null,
    jump: null,
    idCategory: "",
  });

  const [getOneAuction, setGetOneAuction] = useState(null);
  const [listAuctionRoom, setListAuctionRoom] = useState([]);
  const [listArchiveUser, setListArchiveUser] = useState([]);
  const [archiveGift, setArchiveGift] = useState(null);

  const loadData = () => {
    setSearch({
      ...search,
      idCategory: getOneAuction.honeyCategoryId,
    });
    StudentAuctionAPI.fetchAllRoom(search).then((res) => {
      setListAuctionRoom(res.data.data);
    });
  };

  const getOneAuctionById = () => {
    StudentAuctionAPI.getOne(id).then((res) => {
      setGetOneAuction(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    if (getOneAuction != null) {
      loadData();
    }
    if (getOneAuction == null) {
      getOneAuctionById();
    }
  }, [id, getOneAuction]);

  const archiveData = () => {
    ArchiveAPI.findAllUser(user.idUser, getOneAuction.honeyCategoryId).then(
      (res) => {
        setListArchiveUser(res.data.data);
      }
    );
  };

  useEffect(() => {
    if (getOneAuction != null) {
      archiveData();
    }
  }, [user, getOneAuction]);

  useEffect(() => {
    getOneAuctionById();
  }, []);

  useEffect(() => {
    window.addEventListener("load", () => {
      setGetOneAuction(null);
    });
  }, []);

  console.log(listArchiveUser);

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

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Xác nhận",
            content: (
              <span>
                {" "}
                Bạn có muốn đấu giá{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  {archiveGift.nameGift}
                </span>{" "}
                và mất{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {getOneAuction.honey}
                </span>{" "}
                mật phí quản lý ?
              </span>
            ),
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => resolve(values),
            onCancel: () => reject(),
          });
        });
      })
      .then((values) => {
        // Lấy giá trị từ form khi người dùng đã hoàn thành
        const { startingPrice, time, honey, jump } = values;
        if (startingPrice === undefined) {
          message.error("Vui lòng nhập giá trị khởi điểm hợp lệ.");
          return;
        } else if (isNaN(Number(startingPrice)) || Number(startingPrice) < 0) {
          message.error("Vui lòng nhập giá trị khởi điểm lớn hơn hoặc bằng 0.");
          return;
        }

        if (time === undefined) {
          message.error("Vui lòng thời hạn.");
          return;
        }

        if (archiveGift === null) {
          message.error("Vui lòng chọn vật phẩm để đấu giá.");
          return;
        }
        const dataUpload = {
          idUser: user.idUser,
          idAuction: getOneAuction.id,
          honey: getOneAuction.honey,
          idGift: archiveGift.idGift,
          jump: jump,
          startingPrice: startingPrice.trim(),
          time: time,
          name: archiveGift.nameGift,
          idCategory: archiveGift.idCategory,
        };

        StudentAuctionAPI.addAuction(dataUpload).then(
          (response) => {
            console.log(response.data.data);
            setIsModalOpen(false);
            loadData();
            setArchiveGift(null);
            form.resetFields();
          },
          (error) => {
            message.error(error.response.data.message);
          }
        );
      })
      .catch((errorInfo) => {
        console.log("Lỗi xảy ra:", errorInfo);
      });
  };

  const handleArchiveGift = (item) => {
    Modal.confirm({
      title: "Xác nhận",
      content: (
        <span>
          Bạn có muốn đấu giá món đồ{" "}
          <span style={{ color: "blue", fontWeight: "bold" }}>
            {item.nameGift}
          </span>
          ?
        </span>
      ),
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: () => {
        setArchiveGift(item);
      },
    });
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
        closeIcon={<span className="custom-close-icon">X</span>}
      >
        <div
          className="modal-create-auction"
          style={{ minWidth: "800px", Height: "1000px" }}
        >
          <Form form={form}>
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
                        {archiveGift === null ? (
                          <div>
                            <div className="item">
                              <img
                                src={require("../../../assets/images/ui-student/avata-item.png")}
                                alt=""
                              />
                            </div>
                            <span className="name-item">Siêu nhân đỏ</span>
                          </div>
                        ) : (
                          <div>
                            <div className="item">
                              <Base64Image
                                base64String={archiveGift.image}
                                css={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <span className="name-item">
                              {archiveGift.nameGift}
                            </span>
                          </div>
                        )}

                        <hr
                          style={{
                            height: "2px",
                            width: "85%",
                            backgroundColor: "black",
                          }}
                        />

                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Giá khởi điểm :
                            </span>
                          }
                          colon={false}
                          name="startingPrice"
                          style={{ marginTop: "30px" }}
                        >
                          <Input type="number" className="input-auction" />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Bước nhảy :
                            </span>
                          }
                          colon={false}
                          name="jump"
                        >
                          <Input type="number" className="input-auction" />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Thời hạn :
                            </span>
                          }
                          colon={false}
                          name="time"
                          style={{ marginRight: "auto", marginLeft: "0px" }}
                        >
                          <Radio.Group
                            style={{ marginLeft: "5px", marginTop: "30%" }}
                          >
                            <Space direction="vertical">
                              <Radio value={8}>08 giờ</Radio>
                              <Radio value={16}>16 giờ</Radio>
                              <Radio value={24}>24 giờ</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Phí quản lý :
                            </span>
                          }
                          colon={false}
                          name="honey"
                          initialValue={
                            getOneAuction != null && getOneAuction.honey
                          }
                          style={{ marginRight: "auto", marginLeft: "0px" }}
                        >
                          <span
                            style={{
                              color: "#FFCC00",
                              marginRight: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {getOneAuction != null && getOneAuction.honey}
                          </span>
                          <span
                            style={{
                              color: "white",
                              marginRight: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            mật
                          </span>
                        </Form.Item>
                        <div className="div-button">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="button-xac-nhan"
                            onClick={handleSubmit}
                          >
                            Tạo bàn
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col span={17}>
                  <Row className="row-chest">
                    {listArchiveUser.length <= 0 ? (
                      <Col span={24} style={{ textAlign: "center" }}>
                        <div className="item">
                          <img
                            style={{
                              width: "70%",
                              height: "70%",
                              marginTop: "80px",
                            }}
                            src="https://bizweb.dktcdn.net/100/368/179/themes/738982/assets/empty-cart.png?1655829755743"
                            alt="Ảnh mặc định"
                          />
                        </div>
                      </Col>
                    ) : (
                      listArchiveUser.map((square) => (
                        <Col key={square} span={4}>
                          <div
                            className="chess-square"
                            onClick={() => handleArchiveGift(square)}
                          >
                            <div className="item">
                              {square.image == null ? (
                                <>
                                  <img
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                    src="https://png.pngtree.com/png-clipart/20230328/ourlarge/pngtree-game-item-box-png-image_6671647.png"
                                    alt="Ảnh mặc định"
                                  />
                                  <span className="icon-quantity">
                                    {square.quantity}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Base64Image
                                    base64String={square.image}
                                    css={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                  <span
                                    style={{
                                      position: "absolute",
                                      top: "5px",
                                      right: "5px",
                                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                                      color: "#fff",
                                      padding: "5px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    {square.quantity}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </Col>
                      ))
                    )}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Form>
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
              {listAuctionRoom.length <= 0 ? (
                <Col span={24} style={{ textAlign: "center" }}>
                  <div className="item-cart-null">
                    <img
                      style={{
                        width: "68%",
                        marginTop: "30px",
                      }}
                      src="https://bizweb.dktcdn.net/100/333/755/themes/688335/assets/empty_cart.png?1647314197820"
                      alt="Ảnh mặc định"
                    />
                    <span>
                      Hiện không có phiên đấu giá vào vui lòng hãy tạo.
                    </span>
                  </div>
                </Col>
              ) : (
                listAuctionRoom.map((response) => (
                  <Col span={6} className="col-aucion">
                    <div
                      className="auction-room-inside"
                      onClick={() => {
                        nav(`/student/auction/${response.id}`);
                      }}
                    >
                      <span className="user-online">
                        <div />
                        200 <UserOutlined style={{ fontSize: "20px" }} />
                      </span>
                      <span className="time">
                        {" "}
                        <CountdownTimer
                          initialTime={response.toDate - new Date().getTime()}
                        />{" "}
                      </span>

                      {response.image === null ? (
                        <img
                          style={{
                            width: "45%",
                            height: "60%",
                            marginTop: "-60px",
                            borderRadius: "50%",
                          }}
                          src="https://png.pngtree.com/png-vector/20191217/ourlarge/pngtree-bee-holding-a-hammer-illustration-vector-on-white-background-png-image_2079130.jpg"
                          alt="Ảnh đấu giá"
                        />
                      ) : (
                        <Base64Image
                          base64String={response.image}
                          css={{
                            width: "45%",
                            height: "60%",
                            marginTop: "-60px",
                            borderRadius: "50%",
                          }}
                        />
                      )}
                      <p className="name-gift-acution">{response.giftName}</p>
                      <span className="price">
                        {" "}
                        <DollarOutlined />
                        {response.startingPrice}-
                        {response.lastPrice === null ? "?" : response.lastPrice}
                      </span>
                    </div>
                  </Col>
                ))
              )}
            </Row>
          </Card>
        </Card>
      </div>
    </>
  );
}
