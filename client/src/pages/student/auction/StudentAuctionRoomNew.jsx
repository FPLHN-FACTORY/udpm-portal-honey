/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
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
import { AppConfig } from "../../../AppConfig";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default function StudentAuctionRoomNew() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [listCategory, setListCategory] = useState([]);
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
      setListCategory(res.data.data)
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
      size: 3,
    };
    StudentAuctionAPI.fetchRoom(data).then((res) => {
      dispatch(SetAuction(res.data.data.data));
      setTotal(res.data.data.totalPages);
      setCurrent(res.data.data.currentPage);
    });
  };

  useEffect(() => {
    loadData();
  }, [current, searchParams]);

  const buttonClear = () => {
    form.resetFields();
    setSearchParams({
      nameGift: "",
      category: "",
      type: "",
      startingPrice: null,
      endPrice: null
    });
  };

  const buttonSearch = () => {
    const values = form.getFieldsValue();
    if (values) {
      setSearchParams({
        nameGift: values.nameGift ? values.nameGift.trim() : '',
        category: values.category ? values.category.trim() : '',
        type: values.type,
        startingPrice: values.startingPrice,
        endPrice: values.endPrice
      });
      setCurrent(0);
    }
    setIsShowSearch(false);
  };

  // tạo phiên dấu giá
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAuction, setModalAuction] = useState(false);
  const [auction, setAuction] = useState(null);

  // detail phiên đấu giá
  const [detail, setDetail] = useState(null);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const [isShowSearch, setIsShowSearch] = useState(false);

  const showModalDetail = (el) => {
    setIsShowDetail(true);
    setDetail(el);
    setAuction(el)
  }
  const unShowModalDetail = () => {
    setIsShowDetail(false);
  }

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
      Modal.confirm({
        title: "Bạn có chắc chắn muốn đấu giá vật phẩm không?",
        onOk: () => {
        stompClientAll.send(
          `/action/update-last-price-auction`,
          {},
          JSON.stringify({
            idAuction: auction.id,
            lastPrice: value.lastPrice,
            idUser: user.idUser,
            mail: user.email
          })
          );
        }
      })
    } else {
      message.info("Mất kết nối đến máy chủ!");
      return;
    }
    form.setFieldValue("lastPrice", null)
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
      AppConfig.apiUrl + "/portal-honey-websocket-endpoint"
    );
    // const stompClient = Stomp.over(socket);

    const stompClient = Stomp.over(socket, {
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    stompClient.activate();
    stompClient.onWebSocketClose(() => {
      message.info("Mất kết nối đến máy chủ !");
    });

    stompClient.connect({}, () => {
      let sessionId = /\/([^\\/]+)\/websocket/.exec(
        stompClient.ws._transport.url
      )[1];

      stompClient.subscribe(
        "/portal-honey/update-last-price-auction",
        (mes) => {
          let data = JSON.parse(mes.body);
          dispatch(UpdateAuction(data.data));
          form.resetFields();
          message.success("Đấu giá thành công.");
        }
      );

      stompClient.subscribe("/portal-honey/error/" + sessionId, (mes) => {
        var errorObject = JSON.parse(mes.body);
        message.error(errorObject.errorMessage);
      });

      stompClient.subscribe(`/portal-honey/add-auction`, (mes) => {
        message.success("Tạo đấu giá thành công.");
        form.resetFields();
        handleOk();
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
      {
        isShowDetail && 
          <Modal
            title={`Xem chi tiết phòng ${detail.name}`}
            open={isShowDetail}
            width={800}
            onCancel={unShowModalDetail}
            footer={[
              <Button key="cancel" onClick={unShowModalDetail}>
                Hủy
              </Button>,
              <Button type="primary" onClick={() => { setModalAuction(detail); setIsShowDetail(false)}}>
                Đấu giá
              </Button>,
              ]}>
            <hr className="border-0 bg-gray-300 mt-3 mb-3" />

            <Row gutter={16} className="px-4">
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Tên vật phẩm:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ detail.giftName }</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Thể loại:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ detail.nameCategory }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16} className="px-4">
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Số lượng:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ detail.quantity }</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Bước nhảy:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ detail.jump }</span>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={16} className="px-4">
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Người tạo:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ detail.userCreate }</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Người đấu giá hiện tại:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ detail.userAuction ? detail.userAuction : "Chưa có người đấu giá" }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16} className="px-4">
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Giá khởi điểm:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{detail.startingPrice}</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Giá hiện tại:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ detail.lastPrice ? detail.lastPrice : "Chưa có người đấu giá"  }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row gutter={16} className="px-4">
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Thời gian bắt đầu:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ moment(detail.fromDate).format('DD-mm-yyyy, h:mm:ss a') }</span>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} xl={12} xs={24} className="mt-2">
                <Row>
                  <Col span={8} className="pr-5 text-right">
                    <span className="font-semibold text-sm">Ngày kết thúc:</span>
                  </Col>
                  <Col span={16}>
                    <span className="pl-5 text-sm">{ moment(detail.toDate).format('DD-mm-yyyy, h:mm:ss a') }</span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal>
      }
      {
        modalAuction && 
        <Modal
          title="Đấu giá"
          open={modalAuction}
          onOk={handleOkAuction}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button type="primary" onClick={handleOkAuction}>
              Đấu giá
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical">
            <Form.Item 
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn thời gian hết hạn",
                    },
                    {
                      validator: (_, value) => {
                        if ((value + "").trim().length === 0) {
                          return Promise.resolve();
                        }
                        const regex = /^[0-9]+$/;
                        if (!regex.test(value) || value === 0) {
                          return Promise.reject(
                            new Error("Vui lòng nhập một số nguyên dương")
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]} name="lastPrice" label="Mức giá :">
              <Input type="number" style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      }
      {
        isModalOpen && 
        <ModalAddAuction
          visible={isModalOpen}
          onOK={handleOk}
          onCancel={handleCancel}
          stompClientAll={stompClientAll}
        />
      }
      {
        isShowSearch && 
        <Modal
          title={(<><FontAwesomeIcon icon={faFilter} size="2xl" />
          <span
            style={{
              marginLeft: "5px",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            Bộ lọc
          </span></>)}
            open={isShowSearch}
            onCancel={() => {
              setIsShowSearch(false);
              form.resetFields();
            }}
          footer={[
            <Button key="cancel" onClick={() => {
              setIsShowSearch(false);
              form.resetFields();
            }}>
              Hủy
            </Button>,
            <Button
              onClick={() => buttonClear()}
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
            </Button>,
            <Button
              onClick={() => buttonSearch()}
              style={{
                marginRight: "8px",
                height: "35px",
                backgroundColor: "rgb(55, 137, 220)",
                color: "white",
              }}
            >
              Tìm kiếm
            </Button>,
            ]}
          >
          <hr className="border-0 bg-gray-300 mt-3 mb-3" />
                <div className="sidebar">
                  
                  <Form form={form}>
                    <Row style={{ marginTop: "10px" }}>
                      <Col span={24}>
                        <Form.Item
                          name="nameGift"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 18 }}
                          label={
                            <span>Tên vật phẩm</span>
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
                            style={{ height: "30px" }}
                            placeholder="Vui lòng nhập Tên."
                          />
                        </Form.Item>

                        <Form.Item
                          name="category"
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 18 }}
                          label={
                            <span>Loại mật ong</span>
                          }
                        >
                          <Select
                            placeholder="Chọn thể loại"
                          >
                            <Select.Option value={""}>
                              Chọn tất cả
                            </Select.Option>
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
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 18 }}
                          label={
                            <span>
                              Loại vật phẩm
                            </span>
                          }
                        >
                          <Select
                            placeholder="Thể loại vật phẩm"
                          >
                            <Select.Option value={""}>
                              Chọn tất cả
                            </Select.Option>
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
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            label={
                              <span>Giá khởi điểm từ</span>
                            }
                          >
                            <Input
                              style={{
                                height: "30px",
                                width: "100%",
                              }}
                              placeholder="Vui lòng nhập giá từ."
                            />
                          </Form.Item>
                          <Form.Item
                            name="endPrice"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            label={
                              <span>Giá khởi điểm đến</span>
                            }
                          >
                            <Input type="number"
                              style={{
                                height: "30px",
                                width: "100%",
                              }}
                              placeholder="Vui lòng nhập giá từ."
                            />
                          </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
        </Modal>
      }
      <div className="auction-main-inside">
        <Card title={""} className="cartAllConversion border-0 w-full" style={{minHeight: "80vh"}} >
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
              <Tooltip title="Tạo phiên đấu giá">
                <img
                  src={require("../../../assets/images/ui-student/btn-add-auction-inside.png")}
                  alt="Gift"
                  height={30}
                  width={30}
                  className="btn-add-auction-inside cursor-pointer"
                  onClick={showModal}
                />
              </Tooltip>
              <Tooltip title="Tìm kiếm">
                <img
                  src={require("../../../assets/images/search.png")}
                  alt="Gift"
                  height={30}
                  width={30}
                  className="btn-add-auction-inside mx-10 cursor-pointer"
                  onClick={() => setIsShowSearch(true)}
                />
              </Tooltip>
              
            </div>
          </div>

          <Row className="w-full">

            <Col  xl={24} lg={24}>
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
                        
                        <Content className="horor__table pl-[100px] pr-[100px]">
                          <Row className="w-full">
                            <div className="live-leaderboard w-full">
                              <div className="live-leaderboard-table">
                                <div className="live-leaderboard-table-header">
                                  <div className="col-player-rank-header">STT</div>
                                  <div className="col-player-name-header">Tên vật phẩm</div>
                                  <div className="col-player-name-header">Thời gian còn lại</div>
                                  <div className="col-player-name-header">Giá khởi điểm</div>
                                  <div className="col-player-name-header">Giá hiện tại</div>
                                  <div className="col-player-name-header">Loại</div>
                                  <div className="col-player-points-header">Action</div>
                                </div>
                                <div>
                                {listAuctionRoom.map((el) => (
                                  <Link
                                    className="live-leaderboard-player-row">
                                    <div className="col-player-rank-header" onClick={() => {showModalDetail(el)}}>
                                      <span className="col-player-text">{el.stt}</span>
                                      <div className="sub-avatar-fire avatar-fire">
                                        <Avatar className="col-player-avatar"
                                          alt="avatar"
                                          size={50}
                                          src={el.giftImage}
                                        />
                                      </div>
                                    </div>
                                    <div className="col-player-name-header" onClick={() => {showModalDetail(el)}}>
                                      <span className="col-player-text">{el.giftName}</span>
                                    </div>
                                    <div className="col-player-name-header" onClick={() => {showModalDetail(el)}}>
                                      <span className="col-player-text">
                                        <CountdownTimer key={el.id} initialTime={el.toDate - new Date().getTime()} />
                                      </span>
                                    </div>
                                    <div className="col-player-name-header" onClick={() => {showModalDetail(el)}}>
                                      <span className="col-player-text">{el.startingPrice}</span>
                                    </div>
                                    <div className="col-player-name-header" onClick={() => {showModalDetail(el)}}>
                                      <span className="col-player-text">{el.lastPrice == null ? "?" : el.lastPrice}</span>
                                    </div>
                                    <div className="col-player-name-header" onClick={() => {showModalDetail(el)}}>
                                      <span className="col-player-text">{el.nameCategory}</span>
                                    </div>
                                    <div className="col-player-points-header">
                                      <span className="col-player-text">
                                        <Tooltip placement="top" title={"Đấu giá " + el.name}>
                                          <Button
                                            style={{ backgroundColor: "#ffcc00", color: "white" }}
                                            onClick={() => showModalAuction(el)}
                                          >
                                            <FontAwesomeIcon icon={faGavel} />
                                          </Button>
                                        </Tooltip>
                                      </span>
                                    </div>
                                  </Link>
                                  ))}
                                  
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="pagination__ui">
                            <Row>
                              <Col span={10} >
                                <button disabled={current <= 0}
                                  onClick={() => {setCurrent(current - 1)}}
                                  className="button button--left"
                                >
                                  <FontAwesomeIcon icon={faArrowLeft} />
                                  Previous
                                </button> 
                              </Col>
                              <Col span={4} className="d-flex align-items-center justify-content-center">
                                <h3 className="text-center rank__tilte text-white">
                                  {`${current + 1}/${total}`}
                                </h3>
                              </Col>
                              <Col span={10} >
                              <button disabled={current + 1 >= total}
                                onClick={() => {setCurrent(current + 1)}}
                                  className="button button--right"
                                >
                                  Next
                                  <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                              </Col>
                            </Row>
                          </div>
                      </Content>
                    </Col>
                  )}
                </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
