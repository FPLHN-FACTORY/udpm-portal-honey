import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Badge,
  Dropdown,
  Avatar,
  List,
  Button,
  Menu,
  Spin,
} from "antd";

import { BellFilled, ClockCircleFilled, MoreOutlined } from "@ant-design/icons";

import avtar from "../../assets/images/team-2.jpg";

import { deleteToken, getToken } from "../../helper/userToken";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { NotificationAPI } from "../../apis/censor/notification/censor-notification.api";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  GetNotification,
  SetNotification,
} from "../../app/reducers/notification/censor/notification-censor.reducer";
import {
  GetCountNotification,
  SetCountNotification,
} from "../../app/reducers/notification/censor/count-notification-censor.reducer";
import React from "react";
import approved from "../../assets/images/check.png";
// const data = [
//   {
//     id: 1,
//     title:
//       "New message from SophieNew message from SophieNew message from SophieNew message from Sophie",
//     description: (
//       <>
//         <ClockCircleFilled /> 2 days ago
//       </>
//     ),
//     avatar: avtar,
//     smallAvatar: anh1,
//   },
//   {
//     id: 2,
//     title: "New album by Travis Scott",
//     description: (
//       <>
//         <ClockCircleFilled /> 2 days ago
//       </>
//     ),
//     avatar: avtar,
//     smallAvatar: anh1,
//   },
//   {
//     id: 3,
//     title: "Payment completed",
//     description: (
//       <>
//         <ClockCircleFilled /> 2 days ago
//       </>
//     ),
//     avatar: avtar,
//     smallAvatar: anh2,
//   },
// ];

function Header({ onSlidebar, onPress, name, subName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [notificationHasData, setNotificationHasData] = useState(false);
  const [current, setCurrent] = useState(0);
  const dispatch = useAppDispatch();
  const [hasData, setHasData] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNotification = async () => {
    const response = await NotificationAPI.fetchAll({
      page: current,
      size: 10,
    });
    console.log("====================================");
    console.log(response.data.data.data);
    console.log("====================================");
    dispatch(SetNotification(response.data.data.data));
    setCurrent(response.data.data.currentPage);
    if (response.data.data.totalPages - current <= 1) {
      setNotificationHasData(false);
    } else {
      setNotificationHasData(true);
    }
    if (response.data.data.totalPages > 1) {
      setHasData(true);
    } else {
      setHasData(false);
    }
  };

  const fetchCountNotification = () => {
    return NotificationAPI.fetchCountNotification().then((response) => {
      dispatch(SetCountNotification(response.data));
    });
  };

  useEffect(() => {
    fetchNotification();
    fetchCountNotification();
  }, []);
  useEffect(() => {
    fetchCountNotification();
  }, [current]);

  useEffect(() => {
    const tokenValue = getToken();

    if (tokenValue) {
      setUser(jwtDecode(tokenValue));
    }
  }, []);

  const dataNotification = useAppSelector(GetNotification);

  const dataCountNotification = useAppSelector(GetCountNotification);

  console.log("====================================");
  console.log(dataCountNotification);
  console.log("====================================");

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleItemHover = (itemId) => {
    setHoveredItem(itemId);
  };

  const markAsRead = () => {
    NotificationAPI.markAllAsRead().then(() => {
      fetchCountNotification();
      fetchNotification();
    });
  };

  const loadMoreItems = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
    }, 500);
    setCurrent(current + 1);
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          type="ghost"
          onClick={() => {
            navigate(`/author-switch?Token=${getToken()}`);
          }}
        >
          Đổi quyền
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          type="ghost"
          onClick={() => {
            deleteToken();
            navigate(`/home`);
          }}
        >
          Đăng xuất
        </div>
      ),
    },
  ];

  const handleItemClick = (item) => {
    navigate(`/censor/request-manager/detail/${item.idHistoryDetail}`);
    NotificationAPI.readOne(item.id).then(() => {
      fetchNotification();
      fetchCountNotification();
      setIsOpen(!isOpen);
    });
  };

  const AvatarMap = {
    "ADMIN_CHO_PHE_DUYET": approved,
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} className="header-control">
          {/* chuông */}
          <Badge size="small" count={dataCountNotification}>
            <Dropdown
              overlay={
                <>
                  {hasData ? (
                    <div
                      style={{
                        backgroundColor: "white",
                        marginTop: "20px",
                        marginBottom: "-10px",
                      }}
                    >
                      <Button
                        type="link"
                        style={{ width: "100%", textAlign: "left" }}
                        onClick={() => markAsRead()}
                      >
                        <u>Đánh dấu tất cả đã đọc</u>
                      </Button>
                    </div>
                  ) : null}
                  <List
                    style={{
                      width: "300px",
                      height: "600px",
                      overflow: "scroll",
                    }}
                    className="header-notifications-dropdown"
                    itemLayout="horizontal"
                    dataSource={dataNotification}
                    renderItem={(item) => (
                      <List.Item
                        className={`notification-item ${
                          hoveredItem === item.id ? "hovered" : ""
                        }`}
                        onMouseEnter={() => handleItemHover(item.id)}
                        onMouseLeave={() => handleItemHover(null)}
                        onClick={() => handleItemClick(item)}
                        style={{ cursor: "pointer" }}
                      >
                        <List.Item.Meta
                          avatar={
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <Avatar
                                shape="circle"
                                src={avtar}
                                style={{ width: "50px", height: "50px" }}
                              />
                              <Avatar
                                shape="circle"
                                src={AvatarMap[item.type]}
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  position: "absolute",
                                  bottom: "-5px",
                                  right: 0,
                                }}
                              />
                            </div>
                          }
                          title={
                            <span
                              style={{
                                fontWeight:
                                  item.status === "CHUA_DOC" ? "bold" : "400",
                                overflowWrap: "break-word",
                              }}
                            >
                              {item.title}
                              {item.status === "CHUA_DOC" ? (
                                <div
                                  style={{
                                    width: "10px",
                                    height: "10px",
                                    backgroundColor: "blue",
                                    borderRadius: "55%",
                                    float: "right",
                                    marginRight: "-8px",
                                    marginTop: "-35px",
                                  }}
                                />
                              ) : null}
                            </span>
                          }
                          description={
                            <>
                              <ClockCircleFilled />{" "}
                              {moment(item.createdDate).format("DD/MM/YYYY")}
                            </>
                          }
                        />
                        {hoveredItem === item.id && (
                          <Dropdown
                            // overlay={
                            //   <Menu>
                            //     <Menu.Item
                            //       key="delete"
                            //       onClick={() => deleteNotification(item.id)}
                            //     >
                            //       <a href="# ">Xóa</a>
                            //     </Menu.Item>
                            //   </Menu>
                            // }
                            trigger={["click"]}
                          >
                            <Button
                              shape="circle"
                              style={{
                                border: "none",
                                boxShadow: "none",
                                right: "0",
                              }}
                              className="notification-options absolute "
                              icon={<MoreOutlined />}
                            />
                          </Dropdown>
                        )}
                      </List.Item>
                    )}
                  />
                  {notificationHasData ? (
                    <div
                      style={{
                        textAlign: "center",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        marginTop: "-15px",
                      }}
                    >
                      <Button
                        type="link"
                        onClick={loadMoreItems}
                        style={{
                          backgroundColor: "white",
                          width: "300px",
                        }}
                        disabled={loadingMore}
                      >
                        {loadingMore ? <Spin /> : "Xem thêm"}
                      </Button>
                    </div>
                  ) : (
                    <div
                      style={{
                        textAlign: "center",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        marginTop: "-35px",
                      }}
                    >
                      <Button
                        type="link"
                        style={{
                          backgroundColor: "white",
                          width: "300px",
                        }}
                        disabled
                      >
                        Bạn đã xem hết thông báo
                      </Button>
                    </div>
                  )}
                </>
              }
              trigger={["click"]}
              visible={isOpen}
              onVisibleChange={toggleNotifications}
              placement="bottomRight"
              overlayClassName="notification-dropdown"
            >
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <BellFilled />
              </a>
            </Dropdown>
          </Badge>
          {/* fake user login */}

          <Dropdown menu={{ items }} placement="bottom">
            <span className="mx-1 cursor-pointer">
              {user === null ? "Không có tài khoản" : user.name}
            </span>
          </Dropdown>
          {/* fake user login */}
        </Col>
      </Row>
    </>
  );
}

export default Header;
