/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from "react";
import { Col, Dropdown, Layout, Menu, Row, Space, message } from "antd";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import soundClick from "../../../assets/sounds/sound_click.mp3";
import "./index.css";
import {
  connectStompClient,
  getStompClient,
} from "../../../helper/stomp-client/config";
import { Content, Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../../helper/userToken";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetUser, SetUser } from "../../../app/reducers/users/users.reducer";
import DialogTransaction from "../../../pages/student/transaction/DialogTransaction";
import { NotificationAPI } from "../../../apis/student/notification/notification.api";
import {
  AddNotification,
  GetNotification,
  SetNotification,
} from "../../../app/reducers/notification/notification.reducer";
import {
  GetCountNotification,
  SetCountNotification,
} from "../../../app/reducers/notification/count-notification.reducer";

function DashboardAuthUser({ children }) {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState();
  const dispatch = useAppDispatch();
  const fetchCountNotification = async () => {
    try {
      const response = await NotificationAPI.fetchCountNotification();
      dispatch(SetCountNotification(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchCountNotification();
  }, [dispatch]);

  const dataCountNotification = useAppSelector(GetCountNotification);

  useEffect(() => {
    connectStompClient();
    getStompClient().connect({}, () => {
      ProfileApi.getUserLogin().then((response) => {
        getStompClient().subscribe(
          `/user/${response.data.data.idUser}/transaction`,
          (result) => {
            if (!open) {
              const transactionReq = JSON.parse(result.body);
              showRequestTransaction(transactionReq);
            }
          }
        );
      });
      getStompClient().subscribe(
        `/portal-honey/create-notification-user`,
        (result) => {
          console.log("====================================");
          console.log(result);
          console.log("====================================");
        }
      );
    });
  }, []);

  function showRequestTransaction(transactionReq) {
    message.warning({
      content: (
        <span className="message-request-transaction">
          Yêu cầu giao dịch
          <br />
          <b>{transactionReq.formUser}</b>
          <div>
            <button
              className="tu-choi"
              onClick={() => {
                message.destroy(transactionReq.idTransaction);
              }}
            >
              Từ chối
            </button>
            <button
              className="chap-nhan"
              onClick={() => {
                message.destroy();
                onsubmitTransaction(transactionReq);
              }}
            >
              Chấp nhận
            </button>
          </div>
        </span>
      ),
      duration: 10,
      key: transactionReq.idTransaction,
    });
  }

  function onsubmitTransaction(transaction) {
    setTransaction(transaction);
    message.destroy(transaction.idTransaction);
    setOpen(true);
  }

  const [onMusic, setOnMusic] = useState(
    localStorage.getItem("onMusic") === "true"
  );
  function playSound() {
    if (onMusic) {
      const audio = new Audio(soundClick);
      audio.play();
    }
  }

  const hanlderClickCuaHang = () => {
    playSound();
  };
  const hanlderClickDauGia = () => {
    playSound();
    navigate("/student/auction-room");
  };
  const hanlderClickNangCap = () => {
    playSound();
    navigate("/student/upgrade-honey");
  };
  const hanlderClickGiaoDich = () => {
    navigate("/student/transaction");
    playSound();
  };
  const hanlderClickKhoDo = () => {
    playSound();
    navigate("/student/chest");
  };

  //fake login
  const token1 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5YjlmYjdlLTkwNjUtNDEwMi1mMDNjLTA4ZGJjZTY5ZTU5NCIsIm5hbWUiOiJ0xrDhu59uZyBoaWhpIiwiZW1haWwiOiJ0dW9uZ3R2cGgyNjE0OUBmcHQuZWR1LnZuIiwidXNlck5hbWUiOiJ0xrDhu59uZyBoaWhpIiwicGljdHVyZSI6IkltYWdlcy9EZWZhdWx0LnBuZyIsImlkVHJhaW5pbmdGYWNpbGl0eSI6Ijc5NmE0ZmE0LThhYWItNDJjNC05ZjM1LTg3MGJiMDAwNWFmMSIsImxvY2FsSG9zdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODg4OCIsInJvbGUiOlsiVEVBQ0hFUiIsIlNUVURFTlQiLCJBRE1JTiJdLCJyb2xlTmFtZXMiOlsiR2nhuqNuZyB2acOqbiIsIlNpbmggdmnDqm4iLCJRdeG6o24gdHLhu4sgdmnDqm4iXSwibmJmIjoxNjk3NTUwODY5LCJleHAiOjE3MDAxNDI4NjksImlhdCI6MTY5NzU1MDg2OSwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDkwNTMiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0OTA1MyJ9.zjVKrdOUc5joBysdG2q8TWAppjZEQSCv4M3dz5I-SnU";
  const token2 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIzNGM2MTNkLThhYTUtNDg2NS1iMWJkLTA4ZGJiNzQzZGQ3ZCIsIm5hbWUiOiJOZ3V54buFbiBWxINuIFR14bqlbiIsImVtYWlsIjoidHVhbm52cGgyNTU3N0BmcHQuZWR1LnZuIiwidXNlck5hbWUiOiJ0dWFubnZwaDI1NTc3IiwicGljdHVyZSI6IkltYWdlcy9EZWZhdWx0LnBuZyIsImlkVHJhaW5pbmdGYWNpbGl0eSI6Ijc5NmE0ZmE0LThhYWItNDJjNC05ZjM1LTg3MGJiMDAwNWFmMSIsImxvY2FsSG9zdCI6Imh0dHBzOi8vbG9jYWxob3N0OjMwMDAiLCJyb2xlIjoiUEFSVElDSVBBTlQiLCJyb2xlTmFtZXMiOiJUaMOtIHNpbmgiLCJuYmYiOjE2OTU4Mjk4MDEsImV4cCI6MTcyNzM2NTgwMSwiaWF0IjoxNjk1ODI5ODAxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0OTA1MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ5MDUzIn0.1mm_fSj9CiJZSjS9J7RfLiOpHLJMmSQzkX_PZIpauSk";

  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);
  const hanlderClickCaiDat = () => {
    playSound();
    setIsSettingMenuOpen(!isSettingMenuOpen);
  };
  const settingMenu = (
    <Menu onClick={hanlderClickCaiDat}>
      <Menu.Item
        key="1"
        onClick={() => {
          setToken(token1);
          getProfile();
        }}
      >
        Tài khoản 1
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setToken(token2);
          getProfile();
        }}
      >
        Tài khoản 2
      </Menu.Item>
    </Menu>
  );
  // ========================

  const hanlderClickHomThu = () => {
    navigate("/student/letter");
    playSound();
  };
  const hanlderClickAmThanh = () => {
    localStorage.setItem("onMusic", !onMusic);
    setOnMusic(!onMusic);
    playSound();
  };
  const hanlderClickDoiQua = () => {
    playSound();
    navigate("/student/create-conversion");
  };
  const hanlderClickProfile = () => {
    playSound();
    navigate("/student/profile");
  };

  const [open, setOpen] = useState(false);

  const returnHome = () => {
    playSound();
    navigate("/student");
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    return ProfileApi.getUserLogin().then((response) => {
      dispatch(SetUser(response.data.data));
    });
  };

  const data = useAppSelector(GetUser);

  return (
    <div className="main-ui-student" style={{ display: "flex" }}>
      {open && (
        <DialogTransaction
          key={transaction.idTransaction}
          open={open}
          setClose={setOpen}
          transaction={transaction}
        />
      )}
      {children !== undefined ? (
        <div style={{ position: "relative" }}>
          <div
            className="card-close-container btn-student"
            onClick={returnHome}
          >
            <img
              width={"50px"}
              src={require("../../../assets/images/ui-student/btn-close.png")}
              alt="icon-btn"
            />
          </div>
          <div className="content-student">{children}</div>
        </div>
      ) : (
        <div style={{ flex: 1 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Layout>
              <Content
                style={{
                  paddingTop: "20px",
                  height: "70vh",
                  paddingRight: "60px",
                  paddingLeft: "60px",
                }}
              >
                <Row>
                  <Col span={12}>
                    <div onClick={hanlderClickProfile} className="container">
                      <div class="outer-hexagon">
                        <div class="inner-hexagon">
                          <img src={data.picture} alt="avatar" />
                        </div>
                      </div>
                      <div class="tag-name">{data.name}</div>
                    </div>
                    <button
                      onClick={hanlderClickKhoDo}
                      class="btn-balo btn-student btn-icon"
                    />
                    <button
                      onClick={hanlderClickNangCap}
                      class="btn-dap-do btn-student btn-icon"
                    />
                    <button
                      onClick={hanlderClickGiaoDich}
                      class="btn-giao-dich btn-student btn-icon"
                    />
                  </Col>
                  <Col span={12}>
                    <div style={{ float: "right" }}>
                      <button
                        onClick={hanlderClickCaiDat}
                        class="btn-cai-dat btn-student btn-icon"
                      />
                      {isSettingMenuOpen && (
                        <Dropdown
                          overlay={settingMenu}
                          placement="bottomRight"
                          visible={isSettingMenuOpen}
                          onVisibleChange={() => {}}
                        >
                          <span />
                        </Dropdown>
                      )}
                      <button
                        onClick={hanlderClickHomThu}
                        class="btn-hom-thu btn-student btn-icon"
                        style={{ position: "relative" }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            textAlign: "center",
                            background: "#0dcaf0",
                            border: "none",
                            borderRadius: "100px",
                            width: "25px",
                            height: "25px",
                            lineHeight: "25px",
                            color: "#ffffff",
                          }}
                        >
                          {dataCountNotification}
                        </span>
                      </button>
                      <button
                        onClick={hanlderClickAmThanh}
                        className={
                          onMusic
                            ? "btn-am-thanh btn-student btn-icon"
                            : "btn-tat-am-thanh btn-student btn-icon"
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </Content>
              <Footer
                style={{
                  paddingBottom: "20px",
                  height: "30vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "end",
                }}
              >
                <button
                  onClick={hanlderClickDauGia}
                  className="btn-dau-gia btn-student"
                />
                <button
                  onClick={hanlderClickCuaHang}
                  className="btn-cua-hang btn-student"
                />
                <button
                  onClick={hanlderClickDoiQua}
                  className="btn-doi-qua btn-student"
                />
              </Footer>
            </Layout>
          </Space>
        </div>
      )}
    </div>
  );
}
export default DashboardAuthUser;
