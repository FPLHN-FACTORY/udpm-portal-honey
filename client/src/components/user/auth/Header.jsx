import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Breadcrumb,
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

import { NavLink, Link, useNavigate } from "react-router-dom";
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

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={6}>
        </Col>
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
                      onClick={() => handleItemClick(item)}
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
                                onClick={() => deleteNotification(item.id)}
                              >
                                <a href="# ">Xóa</a>
                              </Menu.Item>
                            </Menu>
                          }
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
          <Link to="/sign-in" className="btn-sign-in">
            <UserOutlined />
            <span>Sign in</span>
          </Link>
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
