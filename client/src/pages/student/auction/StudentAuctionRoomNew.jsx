/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import "./AuctionRoomInside.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faGavel } from "@fortawesome/free-solid-svg-icons";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import {
  GetAuction,
  SetAuction,
  UpdateAuction,
} from "../../../app/reducers/auction/auction.reducer";
import { StudentAuctionAPI } from "../../../apis/student/auction/auction.api";
import { CountdownTimer } from "../../util/CountdownTimer";
import ModalAddAuction from "./model/addAucotionRoom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { GetUser } from "../../../app/reducers/users/users.reducer";

export default function StudentAuctionRoomNew() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(10);
  const listCategory = useAppSelector(GetAuction);
  const user = useAppSelector(GetUser);

  const listType = [
    {
      label: "Quà tặng ",
      value: 0,
    },
    {
      label: "Vật phẩm ",
      value: 1,
    },
    {
      label: "Dụng cụ ",
      value: 2,
    },
    {
      label: "Danh hiệu ",
      value: 3,
    },
  ];

  const [searchParams, setSearchParams] = useState({
    nameGift: "",
    category: "",
    type: "",
    startingPrice: "",
  });

  const loadDataCategory = () => {
    CategoryAPI.fetchAllCategory().then((res) => {
      dispatch(SetAuction(res.data.data.data));
    });
  };

  useEffect(() => {
    loadDataCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listAuctionRoom = useAppSelector(GetAuction);

  const loadData = () => {
    const data = {
      ...searchParams,
      page: current,
      size: size,
    };
    StudentAuctionAPI.fetchRoom(data).then((res) => {
      dispatch(SetAuction(res.data.data.data));
      setTotal(res.data.data.totalPages);
      setCurrent(res.data.data.currentPage);
      if (total > res.data.data.totalPages) {
        setCurrent(0);
      } else {
        setCurrent(res.data.data.currentPage);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, [size, current, searchParams]);

  const onShowSizeChange = (current, pageSize) => {
    setCurrent(0);
    setSize(pageSize);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      width: "7%",
    },
    {
      title: "Tên vật phẩm",
      dataIndex: "giftName",
      key: "giftName",
      align: "center",
    },
    {
      title: "Thời gian còn lại",
      dataIndex: "toDate",
      key: "toDate",
      align: "center",
      width: "17%",
      render: (_, record) => (
        <CountdownTimer initialTime={record.toDate - new Date().getTime()} />
      ),
    },
    {
      title: "Giá cố định",
      dataIndex: "startingPrice",
      key: "startingPrice",
      align: "center",
    },
    {
      title: "Giá hiện tại",
      dataIndex: "lastPrice",
      key: "lastPrice",
      align: "center",
      render: (_, record) => {
        if (record.lastPrice === null) {
          return "?";
        } else {
          return record.lastPrice;
        }
      },
    },
    {
      title: "Loại mật ong",
      dataIndex: "nameCategory",
      key: "nameCategory",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Tooltip placement="top" title={"Đấu giá " + record.name}>
          <Button
            style={{ backgroundColor: "#ffcc00", color: "white" }}
            onClick={() => showModalAuction(record)}
          >
            <FontAwesomeIcon icon={faGavel} />
          </Button>
        </Tooltip>
      ),
    },
  ];

  const buttonClear = () => {
    form.resetFields();
    setSearchParams({
      nameGift: "",
      category: "",
      type: "",
      startingPrice: "",
    });
  };

  const buttonSearch = () => {
    const values = form.getFieldsValue();
    setSearchParams({
      nameGift: values.nameGift,
      category: values.category,
      type: values.type,
      startingPrice: values.startingPrice,
    });
    setCurrent(0);
  };

  // tạo phiên dấu giá
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAuction, setModalAuction] = useState(false);
  const [auction, setAuction] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    loadData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalAuction(false);
  };

  const handleOkAuction = () => {
    const value = form.getFieldValue();

    if (value.lastPrice === null) {
      message.error("Vui lòng nhập giá để đấu giá.");
      return;
    }
    if (value.lastPrice < auction.startingPrice) {
      message.error("Vui lòng nhập giá để đấu giá phải lớn hơn giá khởi điểm.");
      return;
    }
    if (value.lastPrice < auction.lastPrice) {
      message.warning(
        "Vui lòng nhập giá để đấu giá phải lớn hơn giá hiện tại."
      );
      return;
    }
    if (stompClientAll && stompClientAll.connected) {
      stompClientAll.send(
        `/action/update-last-price-auction`,
        {},
        JSON.stringify({
          idAuction: auction.id,
          lastPrice: value.lastPrice,
          idUser: user.idUser,
        })
      );
      form.resetFields();
      message.success("Đấu giá thành công.");
    } else {
      message.error("Không có kết nối STOMP hoặc kết nối không hợp lệ.");
      return;
    }

    setAuction(null);
    setModalAuction(false);
  };
  const showModalAuction = (value) => {
    setModalAuction(true);
    setAuction(value);
  };

  // realtime
  const [stompClientAll, setStompClientAll] = useState(null);
  useEffect(() => {
    const socket = new SockJS(
      "http://localhost:2508/api/portal-honey-websocket-endpoint"
    );
    const stompClient = Stomp.over(socket);

    stompClient.onWebSocketClose(() => {
      message.info("Mất kết nối đến máy chủ !");
    });

    stompClient.connect({}, () => {
      let sessionId = /\/([^\/]+)\/websocket/.exec(
        stompClient.ws._transport.url
      )[1];

      stompClient.subscribe(
        "/portal-honey/update-last-price-auction",
        (message) => {
          let data = JSON.parse(message.body);
          dispatch(UpdateAuction(data.data));
        }
      );

      stompClient.subscribe("/portal-honey/error/" + sessionId, (mes) => {
        var errorObject = JSON.parse(mes.body);
        message.error(errorObject.errorMessage);
      });

      stompClient.subscribe(`/portal-honey/add-auction`, () => {
        // let data = JSON.parse(message.body);
        // dispatch(AddAuction(data.data));
        loadData();
      });

      setStompClientAll(stompClient);
    });

    return () => {
      if (stompClientAll) {
        stompClientAll.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Modal
        title="Đấu giá"
        open={modalAuction}
        onOk={handleOkAuction}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkAuction}>
            Đấu giá
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="lastPrice" label="Mức giá :">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
      <ModalAddAuction
        visible={isModalOpen}
        onOK={handleOk}
        onCancel={handleCancel}
        stompClientAll={stompClientAll}
      />
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

          <Row>
            <Col span={6} style={{ marginLeft: "15px" }}>
              <Card style={{ height: "70vh" }}>
                <div className="sidebar">
                  <FontAwesomeIcon icon={faFilter} size="2xl" />
                  <span
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                      fontSize: "22px",
                    }}
                  >
                    Bộ lọc
                  </span>
                  <Form form={form}>
                    <Row style={{ marginTop: "10px" }}>
                      <Col span={24}>
                        <Form.Item
                          name="nameGift"
                          labelCol={{ span: 9 }}
                          wrapperCol={{ span: 17 }}
                          label={
                            <span style={{ color: "white" }}>Tên vật phẩm</span>
                          }
                        >
                          <Input
                            onKeyPress={(e) => {
                              if (
                                e.key === " " &&
                                e.target.selectionStart === 0
                              ) {
                                e.preventDefault();
                              }
                            }}
                            style={{ textAlign: "center", height: "30px" }}
                            placeholder="Vui lòng nhập Tên."
                          />
                        </Form.Item>

                        <Form.Item
                          name="category"
                          labelCol={{ span: 9 }}
                          wrapperCol={{ span: 17 }}
                          label={
                            <span style={{ color: "white" }}>Loại mật ong</span>
                          }
                        >
                          <Select
                            style={{ textAlign: "center" }}
                            placeholder="Chọn thể loại"
                          >
                            {listCategory?.map((item) => {
                              return (
                                <Select.Option value={item.id}>
                                  {item.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="type"
                          labelCol={{ span: 9 }}
                          wrapperCol={{ span: 17 }}
                          label={
                            <span style={{ color: "white" }}>
                              Loại vật phẩm
                            </span>
                          }
                        >
                          <Select
                            style={{ textAlign: "center" }}
                            placeholder="Thể loại vật phẩm"
                          >
                            {listType?.map((item) => {
                              return (
                                <Select.Option value={item.value}>
                                  {item.label}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          name="startingPrice"
                          labelCol={{ span: 9 }}
                          wrapperCol={{ span: 17 }}
                          label={
                            <span style={{ color: "white" }}>Giá bắt đầu</span>
                          }
                        >
                          <InputNumber
                            style={{
                              textAlign: "center",
                              height: "30px",
                              width: "100%",
                            }}
                            placeholder="Vui lòng nhập giá."
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                  <Row justify={"center"} style={{ marginTop: "10px" }}>
                    <Col>
                      <Button
                        onClick={buttonSearch}
                        style={{
                          marginRight: "8px",
                          height: "35px",
                          backgroundColor: "rgb(55, 137, 220)",
                          color: "white",
                        }}
                      >
                        Tìm kiếm
                      </Button>
                      <Button
                        onClick={buttonClear}
                        style={{
                          marginLeft: "8px",
                          height: "35px",
                          backgroundColor: "#FF9900",
                          color: "white",
                          outline: "none",
                          border: "none",
                        }}
                      >
                        Làm mới
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>

            <Col span={17} style={{ marginLeft: "15px" }}>
              <Card style={{ height: "100%" }} className="table-dau-gia">
                <Row justify="center">
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
                    <Col span={24} style={{ textAlign: "center" }}>
                      <Table
                        columns={columns}
                        dataSource={listAuctionRoom}
                        rowKey={"id"}
                        width={"100%"}
                        scroll={{
                          y: 370,
                        }}
                        pagination={false}
                      />
                      <div
                        className="mt-5 text-center"
                        style={{ marginTop: "30px" }}
                      >
                        <Pagination
                          showSizeChanger
                          onShowSizeChange={onShowSizeChange}
                          onChange={(value) => {
                            setCurrent(value - 1);
                          }}
                          current={current + 1}
                          total={total * size}
                        />
                      </div>
                    </Col>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
