import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import "./auction.css";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetUser, SetUser } from "../../../app/reducers/users/users.reducer";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import moment from "moment";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var stompClient = null;
export default function StudentAuction() {
  const [publicChats, setPublicChats] = useState([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(GetUser);
  const getProfile = () => {
    return ProfileApi.getUserLogin().then((response) => {
      dispatch(SetUser(response.data.data));
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [userData, setUserData] = useState({
    id: "",
    username: "",
    connected: false,
    email: "",
    message: "",
    avatar: "",
    date: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    const socket = new SockJS("http://localhost:2508/ws-honey-end-point");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/topic/public", onMessageReceived);
    userJoin();
  };

  const userJoin = () => {
    console.log(userData);
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    console.log(payload);
    switch (payloadData.status) {
      case "JOIN":
        break;
      case "MESSAGE":
        if (publicChats.length > 0) {
          let dataPrevious = publicChats[publicChats.length - 1];

          if (payloadData.idUser === dataPrevious.idUser) {
            payloadData.checkHideShowAvatar = false;
          } else {
            payloadData.checkHideShowAvatar = true;
          }
        } else {
          payloadData.checkHideShowAvatar = true;
        }
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      default:
        break;
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({
      ...userData,
      message: value,
      username: user.name,
      id: user.idUser,
      email: user.email,
      date: moment(new Date()).format("HH:mm:ss"),
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqekwL2LW2-NBO_FE2f2IjZQnp_1xl-shGcg&usqp=CAU",
    });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        idUser: userData.id,
        senderName: userData.username,
        email: userData.email,
        message: userData.message,
        avatar: userData.avatar,
        date: moment(new Date()).format("HH:mm:ss"),
        status: "MESSAGE",
      };
      console.log(chatMessage);
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  useEffect(() => connect(), []);

  const item = {
    name: "Balo siêu vip",
    description:
      "Balo là một loại túi lớn được thiết kế đặc biệt để đeo trên vai hoặc lưng, thường được sử dụng để mang theo đồ đạc cá nhân khi di chuyển.",
    image: require("../../../assets/images/balo-student.png"),
  };

  return (
    <div className="ui-auction" style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Sider style={{ position: "relative" }}>
          <span className="user-online">
            <div />
            200 <UserOutlined style={{ fontSize: "20px" }} />
          </span>
          <span className="time">10:40</span>

          <div className="mid-center" style={{ textAlign: "center" }}>
            <img width={"200px"} height={"200px"} src={item.image} alt="icon" />
            <div>
              <h2 className="name-item" style={{ color: "#FF9933" }}>{item.name}</h2>
              <p className="item-description" style={{ color: "#D1D1D1" }}>{item.description}</p>
            </div>
            <div>
              <h2 className="gia">
                <img
                  className="pb-5"
                  width={"40px"}
                  src={require("../../../assets/images/Honeycomb.webp")}
                  alt="diem"
                /><span className="pr-5" style={{ textShadow: "0 0 black", color: "#FF9933" }}>Giá khởi điểm: </span><span style={{ textShadow: "0 0 black", color: "#EBA937", fontSize: "36px" }}> 100 điểm</span>
              </h2>
            </div>
            <div>
              <h2 className="gia">
                <img
                  className="pb-5"
                  width={"40px"}
                  src={require("../../../assets/images/Honeycomb.webp")}
                  alt="diem"
                />
                <span className="pr-5" style={{ textShadow: "0 0 black", color: "#FF9933" }}>Giá hiện tại: </span><span style={{ textShadow: "0 0 black", color: "#EBA937", fontSize: "36px" }}> 100 điểm</span>
              </h2>
            </div>
            <div>
              <h2 className="gia">
                <img
                  className="pb-5"
                  width={"40px"}
                  src={require("../../../assets/images/Honeycomb.webp")}
                  alt="diem"
                />
                <span className="pr-5" style={{ textShadow: "0 0 black", color: "#FF9933" }}>Bước giá: </span><span style={{ textShadow: "0 0 black", color: "#EBA937", fontSize: "36px" }}> 10 điểm</span>
              </h2>
            </div>
          </div>
          <div className="input-dau-gia">
            <input className="input-message" style={{ borderRadius: "5px" }} />
            <button className="send-message" style={{ fontSize: "25px", borderRadius: "5px" }}>Xác nhận</button>
          </div>
        </Sider>
        <Layout>
          <Header><img
            src={require("../../../assets/images/khung-chat.png")}
            alt="khung chat"
          /></Header>
          <Content>
            <div className="chat-box">
              <div className="chat-content">
                <ul className="chat-messages">
                  {publicChats.map((chat, index) => (
                    <li
                      className={`message ${chat.senderName === userData.username && "self"
                        }`}
                      key={index}
                    >
                      {chat.senderName !== userData.username && (
                        <div className="avatar">
                          {chat.checkHideShowAvatar && (
                            <span>
                              {" "}
                              <img
                                alt="avatar"
                                src={chat.avatar}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />{" "}
                              <span>{chat.senderName}</span>
                            </span>
                          )}
                        </div>
                      )}
                      <div className="message-data">
                        {" "}
                        <p
                          style={{
                            lineHeight: "0",
                            fontSize: "19px",
                            color: "green",
                            textAlign: "center",
                            backgroundColor: "red",
                          }}
                        >
                          {chat.date}
                        </p>
                        {chat.message}
                      </div>
                      {chat.senderName === userData.username && (
                        <div className="avatar self">
                          <img
                            alt="avatar"
                            src={chat.avatar}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Content>
          <Footer>
            <input
              className="input-message"
              value={userData.message} style={{ borderRadius: "5px" }}
              onChange={handleMessage}
              placeholder="Nhập tin nhắn..."
            />
            <button className="send-message" onClick={sendValue}>
              <SendOutlined />
            </button>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
