import { Button, Input, Layout, Row, message } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import "./auction.css";
import {
  FieldTimeOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetUser, SetUser } from "../../../app/reducers/users/users.reducer";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import moment from "moment";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { StudentAuctionAPI } from "../../../apis/student/auction/auction.api";
import { useParams } from "react-router-dom";
import { CountdownTimer } from "../../util/CountdownTimer";

var stompClient = null;
export default function StudentAuction() {
  const { id } = useParams();
  const [publicChats, setPublicChats] = useState([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(GetUser);
  const [getOneAuction, setGetOneAuction] = useState(null);
  const getProfile = () => {
    return ProfileApi.getUserLogin().then((response) => {
      dispatch(SetUser(response.data.data));
    });
  };
  console.log(id);

  const getOneAuctionById = () => {
    StudentAuctionAPI.getOneRoom(id).then((res) => {
      setGetOneAuction(res.data.data);
    });
  };

  useEffect(() => {
    getProfile();
    getOneAuctionById();
  }, [id]);

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
    const socket = new SockJS(
      "http://localhost:2508/api/portal-honey-websocket-endpoint"
    );
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/portal-honey/public", onMessageReceived);
    userJoin();
  };

  const userJoin = () => {
    console.log(userData);
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send(
      "/action/receive-message",
      {},
      JSON.stringify(chatMessage)
    );
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
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
      avatar: user.picture,
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
      stompClient.send(
        "/action/receive-message",
        {},
        JSON.stringify(chatMessage)
      );
      setUserData({ ...userData, message: "" });
    }
  };

  useEffect(() => connect(), []);

  //
  const isNumber = (value) => /^-?\d*\.?\d+$/.test(value);
  const [inputAuction, setInputAuction] = useState("");
  const handleInputChange = (event) => {
    setInputAuction(event.target.value);
  };
  const handleSuccess = () => {
    if (!isNumber(inputAuction)) {
      message.error("Vui lòng nhập là số.");
    }
    console.log(inputAuction);
  };

  return (
    <div className="ui-auction" style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Sider style={{ position: "relative" }}>
          <span className="user-online">
            <div />
            200 <UserOutlined style={{ fontSize: "20px" }} />
          </span>
          <span className="time">
            {getOneAuction != null && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <FieldTimeOutlined
                  style={{ fontSize: "20px", marginRight: "5px" }}
                />
                <CountdownTimer
                  initialTime={getOneAuction.toDate - new Date().getTime()}
                />
              </div>
            )}
          </span>

          <div className="mid-center" style={{ textAlign: "center" }}>
            <img
              width={"130px"}
              height={"130px"}
              src={
                getOneAuction === null
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrgRrpB3oR3RWdUZNy7EhEJxzl7cxGCsUSWg&usqp=CAU"
                  : getOneAuction.image === null
                  ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrgRrpB3oR3RWdUZNy7EhEJxzl7cxGCsUSWg&usqp=CAU"
                  : getOneAuction.image
              }
              style={{ borderRadius: "10px" }}
              alt="icon"
            />
            <div>
              <h2 className="name-item">
                {getOneAuction != null && getOneAuction.name}
              </h2>
              <p className="item-description">
                {getOneAuction != null && getOneAuction.note}
              </p>
            </div>
            <div>
              <p className="gia">
                <img
                  className="pb-5"
                  width={"35px"}
                  src={require("../../../assets/images/transaction-honey.png")}
                  alt="diem"
                />
                Giá khởi điểm:{" "}
                <span>
                  {getOneAuction != null && getOneAuction.startingPrice}
                </span>
              </p>
            </div>
            <div>
              <p className="gia">
                <img
                  className="pb-5"
                  width={"35px"}
                  src={require("../../../assets/images/transaction-honey.png")}
                  alt="diem"
                />
                Giá hiện tại:{" "}
                <span>{getOneAuction != null && getOneAuction.lastPrice}</span>
              </p>
            </div>
            <div>
              <p className="gia">
                Bước giá:{" "}
                <span>{getOneAuction != null && getOneAuction.jump}</span>
              </p>
            </div>
          </div>
          <div className="input-dau-gia">
            <Input
              className="input-message"
              placeholder="Nhập giá muốn đấu giá..."
              value={inputAuction}
              onChange={handleInputChange}
            />
            <Button className="send-message" onClick={handleSuccess}>
              Xác nhận
            </Button>
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
                          {
                            <span>
                              {" "}
                              <img
                                alt="avatar"
                                src={
                                  chat.avatar === "Images/Default.png"
                                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrgRrpB3oR3RWdUZNy7EhEJxzl7cxGCsUSWg&usqp=CAU"
                                    : chat.avatar
                                }
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />{" "}
                              <span>{chat.senderName}</span>
                            </span>
                          }
                        </div>
                      )}
                      <div className="message-data">
                        {" "}
                        <p
                          style={{
                            lineHeight: "0",
                            fontSize: "16px",
                            color: "green",
                            textAlign: "center",
                            width: "100%",
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
                            src={
                              chat.avatar === "Images/Default.png"
                                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtrr2cRLY85meJRaW9Q5mhFnq8mBPYCtg8OA&usqp=CAU"
                                : chat.avatar
                            }
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
            <Input
              className="input-message"
              value={userData.message}
              onChange={handleMessage}
              placeholder="Nhập tin nhắn..."
              onPressEnter={sendValue}
            />
            <Button className="send-message" onClick={sendValue}>
              <SendOutlined />
            </Button>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
