import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Badge,
  Dropdown,
  Button,
  Avatar,
  List,
  Menu,
} from "antd";

import {
  MoreOutlined,
  BellFilled,
  ClockCircleFilled,
} from "@ant-design/icons";

import avtar from "../../../assets/images/team-2.jpg";
import tym from "../../../assets/images/38064371 (2).jpg";
import comment from "../../../assets/images/38064371 (3).jpg";
import approved from "../../../assets/images/check.png";
import refuse from "../../../assets/images/cancel.png";
import evaluate from "../../../assets/images/star.png";

import { NotificationAPI } from "../../../apis/user/auth/notification/notification.api";
import {
  GetNotification,
  SetNotification,
} from "../../../app/reducers/notification/notification.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import moment from "moment";
import SubMenu from "antd/es/menu/SubMenu";
import { deleteToken, getToken } from "../../../helper/userToken";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => window.scrollTo(0, 0));
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [countNotification, setCountNotification] = useState(0);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await NotificationAPI.fetchNotification();
        dispatch(SetNotification(response.data.data.data));
      } catch (error) {}
    };
    
  const tokenValue = getToken();

  if (tokenValue) {
    setUser(jwtDecode(tokenValue))
  }
    fetchNotification();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCountNotification = async () => {
      try {
        const response = await NotificationAPI.fetchCountNotification();
        setCountNotification(response.data);
      } catch (error) {}
    };

    fetchCountNotification();
  }, [dispatch]);
  const dataNotification = useAppSelector(GetNotification);
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleItemHover = (itemId) => {
    setHoveredItem(itemId);
  };
  const AvatarMap = {
    1: comment,
    2: approved,
    3: evaluate,
    4: tym,
    5: refuse,
  };

  const deleteNotification = async (id) => {
    try {
      const response = await NotificationAPI.delete(id);
      if (response.status === 200) {
        const updatedData = dataNotification.filter((item) => item.id !== id);
        dispatch(SetNotification(updatedData));
        const newResponse = await NotificationAPI.fetchNotification();
        const newData = newResponse.data.data.data;
        dispatch(SetNotification(newData));
        const newCount = countNotification - 1;
        setCountNotification(newCount);
      }
    } catch (error) {}
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={6}></Col>
        <Col span={18} className="header-control">
          {/* chuông */}
          <Badge size="small" count={countNotification}>
            <Dropdown
              overlay={
                <List
                  style={{ width: "300px" }}
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
                      >
                      <List.Item.Meta
                        avatar={
                          <div
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}>
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
                        title={item.contentActivity}
                        description={
                          <>
                            <ClockCircleFilled />{" "}
                            {moment(item.createdDate).format("DD/MM/YYYY")}
                          </>
                        }
                      />
                      {hoveredItem === item.id && (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                key="delete"
                                onClick={() => deleteNotification(item.id)}>
                                <a href="# ">Xóa</a>
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}>
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
              }
              trigger={["click"]}
              visible={isOpen}
              onVisibleChange={toggleNotifications}
              placement="bottomRight"
              overlayClassName="notification-dropdown">
              <a
                href="#pablo"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}>
                <BellFilled />
              </a>
            </Dropdown>
          </Badge>

          {/* fake user login */}
          
          <Menu
            mode="horizontal">
            <SubMenu
              title={
                <span>
                  <span>{user === null ? "Không có tài khoản" : user.name}</span>
                </span>
              }>
              {user !== null &&
                <Menu.Item key={"logout"} onClick={() => {
                  deleteToken();
                  navigate(`/author-switch`);
                }}>
                  Đăng xuất
                </Menu.Item>
              }
            </SubMenu>
          </Menu>
          {/* fake user login */}
        </Col>
      </Row>
    </>
  );
}

export default Header;
