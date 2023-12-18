import { useEffect, useState } from "react";
import { Row, Col, Badge, Dropdown, Avatar, List, Spin, Button } from "antd";
import { BellFilled, ClockCircleFilled, MoreOutlined } from "@ant-design/icons";
import avtar from "../../assets/images/team-2.jpg";
import approved from "../../assets/images/check.png";
import refuse from "../../assets/images/cancel.png";
import { NotificationAPI } from "../../apis/president/notification/president-notification.api";
import moment from "moment";
import { deleteToken, getToken } from "../../helper/userToken";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  GetNotification,
  SetNotification,
} from "../../app/reducers/notification/president/notification-president.reducer";
import {
  GetCountNotification,
  SetCountNotification,
} from "../../app/reducers/notification/president/count-notification-president.reducer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { formatDateTime } from "../../pages/util/DateUtil";

function Header({ onSlidebar, onPress, name, subName }) {
  useEffect(() => window.scrollTo(0, 0));
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [notificationHasData, setNotificationHasData] = useState(false);
  const [current, setCurrent] = useState(0);
  const dispatch = useAppDispatch();
  const [hasData, setHasData] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const tokenValue = getToken();

    if (tokenValue) {
      setUser(jwtDecode(tokenValue));
    }
  }, []);

  const fetchNotification = async () => {
    const response = await NotificationAPI.fetchAll({
      page: current,
      size: 10,
    });
    dispatch(SetNotification(response.data.data.data));
    setCurrent(response.data.data.currentPage);
    if (response.data.data.totalPages - current <= 1) {
      setNotificationHasData(false);
    } else {
      setNotificationHasData(true);
    }
  };

  const fetchCountNotification = () => {
    return NotificationAPI.fetchCountNotification().then((response) => {
      dispatch(SetCountNotification(response.data));
      if (response.data > 0) {
        setHasData(true);
      } else {
        setHasData(false);
      }
    });
  };

  useEffect(() => {
    fetchNotification();
    fetchCountNotification();
  }, []);

  useEffect(() => {
    fetchCountNotification();
  }, [current]);

  const dataNotification = useAppSelector(GetNotification);

  const dataCountNotification = useAppSelector(GetCountNotification);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = () => {
    NotificationAPI.markAllAsRead().then(() => {
      setIsOpen(!isOpen);
      fetchCountNotification();
      NotificationAPI.fetchAll({
        page: 0,
        size: 10,
      }).then((response) => {
        dispatch(SetNotification(response.data.data.data));
      });
    });
  };

  const loadMoreItems = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
    }, 500);
    setCurrent(current + 1);
  };

  const handleItemClick = (item) => {
    navigate(`/president/history-honey`);
    NotificationAPI.readOne(item.id).then(() => {
      NotificationAPI.fetchAll({
        page: 0,
        size: 10,
      }).then((response) => {
        dispatch(SetNotification(response.data.data.data));
      });
      fetchCountNotification();
      setIsOpen(!isOpen);
    });
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

  const handleItemHover = (itemId) => {
    setHoveredItem(itemId);
  };
  const AvatarMap = {
    DA_PHE_DUYET_PRESIDENT: approved,
    TU_CHOI_PRESIDENT: refuse,
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
                      height: "450px",
                      overflow: "scroll",
                    }}
                    className="header-notifications-dropdown shadow-lg"
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
                              {/* {moment(item.createdDate).format("DD/MM/YYYY")} */}
                              {formatDateTime(item.createdDate)}
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
