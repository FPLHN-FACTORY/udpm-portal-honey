import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Badge,
  Dropdown,
  Button,
  Avatar,
  Input,
  List,
  Menu,
} from "antd";

import {
  SearchOutlined,
  MoreOutlined,
  BellFilled,
  ClockCircleFilled,
  UserOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
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
import { Modal } from "@coreui/coreui";
import SubMenu from "antd/es/menu/SubMenu";
import { setToken } from "../../../helper/userToken";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import { SetUser } from "../../../app/reducers/users/users.reducer";
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
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await NotificationAPI.fetchNotification();
        dispatch(SetNotification(response.data.data.data));
      } catch (error) {}
    };

    fetchNotification();
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
  const handleItemClick = (item) => {
    if (item.type === 5) {
      navigate(`/my-article/${item.articlesId}`);
    } else {
      navigate(`/user/article/${item.articlesId}`);
    }
  };
  const handleFakeLogin = ({ key }) => {
    setToken(key);
    ProfileApi.getUserLogin().then((response) => {
      dispatch(SetUser(response.data.data));
    });
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
                      onClick={() => handleItemClick(item)}>
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
            style={{ width: "300px" }}
            onClick={handleFakeLogin}
            mode="horizontal">
            <SubMenu
              title={
                <span>
                  <UserOutlined />
                  <span>Sign in</span>
                </span>
              }>
              <Menu.Item key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0Y2YyMWY0LWYzZTAtNDkwZS1iMWNjLTA4ZGJiNzQzZGQ3ZCIsIm5hbWUiOiJUcmlldSBWYW4gVHVvbmcgUEggMiA2IDEgNCA5IiwiZW1haWwiOiJ0dW9uZ3R2cGgyNjE0OUBmcHQuZWR1LnZuIiwidXNlck5hbWUiOiJ0dW9uZ3R2cGgyNjE0OSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMU0hTd1cxb3B2ZVRzTjI4RGdHS0pLSWNYekpsY3hJd090c0VfbGZsZjk4SXc9czk2LWMiLCJpZFRyYWluaW5nRmFjaWxpdHkiOiI3OTZhNGZhNC04YWFiLTQyYzQtOWYzNS04NzBiYjAwMDVhZjEiLCJsb2NhbEhvc3QiOiJodHRwOi8vbG9jYWxob3N0Ojg4ODgiLCJyb2xlIjoiQURNSU4iLCJyb2xlTmFtZXMiOiJRdeG6o24gdHLhu4sgdmnDqm4iLCJuYmYiOjE2OTUwMzA5NjksImV4cCI6MTc2ODY0Mzc2OSwiaWF0IjoxNjk1MDMwOTY5LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0OTA1MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ5MDUzIn0.Zxmp3Ax5QVp2PK3b5BNfhcgs7c9bbWCYGF6R0QExd5s">
                Tài khoản 1
              </Menu.Item>
              <Menu.Item key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzNGM2MTNkLThhYTUtNDg2NS1iMWJkLTA4ZGJiNzQzZGQ3ZCIsIm5hbWUiOiJOZ3V54buFbiBWxINuIFR14bqlbiIsImVtYWlsIjoidHVhbm52cGgyNTU3N0BmcHQuZWR1LnZuIiwidXNlck5hbWUiOiJ0dWFubnZwaDI1NTc3IiwicGljdHVyZSI6IkltYWdlcy9EZWZhdWx0LnBuZyIsImlkVHJhaW5pbmdGYWNpbGl0eSI6Ijc5NmE0ZmE0LThhYWItNDJjNC05ZjM1LTg3MGJiMDAwNWFmMSIsImxvY2FsSG9zdCI6Imh0dHBzOi8vbG9jYWxob3N0OjMwMDAiLCJyb2xlIjoiUEFSVElDSVBBTlQiLCJyb2xlTmFtZXMiOiJUaMOtIHNpbmgiLCJuYmYiOjE2OTU4Mjk4MDEsImV4cCI6MTcyNzM2NTgwMSwiaWF0IjoxNjk1ODI5ODAxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0OTA1MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ5MDUzIn0.1mm_fSj9CiJZSjS9J7RfLiOpHLJMmSQzkX_PZIpauSk">
                Tài khoản 2
              </Menu.Item>
            </SubMenu>
          </Menu>
          {/* fake user login */}

          <Input
            className="header-search"
            placeholder="Type here..."
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  );
}

export default Header;
