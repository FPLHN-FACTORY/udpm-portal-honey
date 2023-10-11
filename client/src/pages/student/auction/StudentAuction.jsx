import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import "./auction.css";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { getStompClient } from "../../../helper/stomp-client/config";

export default function StudentAuction() {
  const [liveChat, setLiveChat] = useState([]);
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
            <img width={"150px"} height={"150px"} src={item.image} alt="icon" />
            <div>
              <h2 className="name-item">{item.name}</h2>
              <p className="item-description">{item.description}</p>
            </div>
            <div>
              <h2 className="gia">
                <img
                  className="pb-5"
                  width={"40px"}
                  src={require("../../../assets/images/transaction-honey.png")}
                  alt="diem"
                />
                Giá khởi điểm: <span> 100 điểm</span>
              </h2>
            </div>
            <div>
              <h2 className="gia">
                <img
                  className="pb-5"
                  width={"40px"}
                  src={require("../../../assets/images/transaction-honey.png")}
                  alt="diem"
                />
                Giá hiện tại: <span> 100 điểm</span>
              </h2>
            </div>
            <div>
              <h2 className="gia">
                Bước giá: <span> 10 điểm</span>
              </h2>
            </div>
          </div>
          <div className="input-dau-gia">
            <input className="input-message" />
            <button className="send-message">Xác nhận</button>
          </div>
        </Sider>
        <Layout>
          <Header>Khung chat</Header>
          <Content>
            {liveChat.map((e) => {
              return (
                <div className="content-chat">
                  <p>{e.time}</p>
                  <img alt="avatar" src={e.avatar} />
                  <b style={{ marginLeft: "5px", lineHeight: "30px" }}>
                    {e.name}:{" "}
                  </b>
                  {e.type === 0 ? (
                    e.message
                  ) : (
                    <b style={{ color: "#F6C714" }}>{e.message}</b>
                  )}
                </div>
              );
            })}
          </Content>
          <Footer>
            <input className="input-message" />
            <button className="send-message">
              <SendOutlined />
            </button>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}
