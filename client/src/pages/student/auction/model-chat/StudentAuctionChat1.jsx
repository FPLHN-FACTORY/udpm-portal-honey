import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import "../auction.css";
import { SendOutlined } from "@ant-design/icons";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { GetUser, SetUser } from "../../../../app/reducers/users/users.reducer";
import { ProfileApi } from "../../../../apis/student/profile/profileApi.api";
import moment from "moment";

var stompClient = null;

export default function StudentAuctionChat1() {
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
      username: "vinh",
      id: " user.idUser",
      email: "ádas",
      date: moment(new Date()).format("HH:mm:ss"),
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2zKknGBmI8uhRwR0kPT8DrCGrM25sHdPTw&usqp=CAU",
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

  return (
    <div className="ui-auction" style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Sider style={{ paddingTop: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <img
              width={"150px"}
              height={"150px"}
              src={require("../../../../assets/images/balo-student.png")}
              alt="icon"
            />
            <div>
              <h2 className="name-item">Balo siêu vip</h2>
            </div>
          </div>
        </Sider>
        <Layout>
          <Header>Khung chat</Header>
          <Content>
            <div className="chat-box">
              <div className="chat-content">
                <ul className="chat-messages">
                  {publicChats.map((chat, index) => (
                    <li
                      className={`message ${
                        chat.senderName === userData.username && "self"
                      }`}
                      key={index}
                    >
                      {chat.senderName !== userData.username && (
                        <div className="avatar">
                          <img
                            alt="avatar"
                            src={chat.avatar}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                          />
                          <span>{chat.senderName}</span>
                        </div>
                      )}
                      <div className="message-data">
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
              value={userData.message}
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
