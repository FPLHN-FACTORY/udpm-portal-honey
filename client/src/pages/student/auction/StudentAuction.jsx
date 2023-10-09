import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";
import "./auction.css";
import { SendOutlined } from "@ant-design/icons";

export default function StudentAuction() {
  const liveChat = [
    {
      id: 1,
      name: "Nguyễn Thị Thùy Dương",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      message: "Hello, how are you?",
      time: "10:00",
      type: 0, //0 = chat 1 = đấu giá
    },
    {
      id: 2,
      name: "Nguyễn Thị Thùy Dương",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      message: "Đấu giá 100 điểm",
      time: "10:00",
      type: 1, //0 = chat 1 = đấu giá
    },
  ];

  return (
    <div className="ui-auction" style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Sider style={{ paddingTop: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <img
              width={"150px"}
              height={"150px"}
              src={require("../../../assets/images/balo-student.png")}
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
            {liveChat.map((e) => {
              return (
                <div
                  key={e.id}
                  style={{
                    margin: "10px 0px",
                    backgroundColor: "#3d31311f",
                    padding: "10px",
                    borderRadius: "10px",
                  }}>
                  <p
                    style={{
                      lineHeight: "0",
                      fontSize: "19px",
                      color: "green",
                      textAlign: "center",
                      // with: "100px",
                      backgroundColor: "red",
                    }}>
                    {e.time}
                  </p>
                  <img
                    alt="avatar"
                    src={e.avatar}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
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
