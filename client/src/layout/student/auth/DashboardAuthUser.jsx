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
import { Col, Layout, Row, Space, message } from "antd";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import soundClick from "../../../assets/sounds/sound_click.mp3";
import "./index.css";
import {
  connectStompClient,
  getStompClient,
} from "../../../helper/stomp-client/config";
import { Content, Footer } from "antd/es/layout/layout";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function DashboardAuthUser({ children }) {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState();
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
              }}>
              Từ chối
            </button>
            <button
              className="chap-nhan"
              onClick={() => {
                message.destroy();
                onsubmitTransaction(transactionReq);
              }}>
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
    navigate("/student/auction");
  };
  const hanlderClickNangCap = () => {
    playSound();
  };
  const hanlderClickGiaoDich = () => {
    playSound();
  };
  const hanlderClickKhoDo = () => {
    playSound();
    navigate("/student/chest");
  };
  const hanlderClickCaiDat = () => {
    playSound();
  };
  const hanlderClickHomThu = () => {
    playSound();
  };
  const hanlderClickAmThanh = () => {
    localStorage.setItem("onMusic", !onMusic);
    setOnMusic(!onMusic);
    playSound();
  };
  const hanlderClickDoiQua = () => {
    playSound();
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
  return (
    <div className="main-ui-student" style={{ display: "flex" }}>
      {children !== undefined ? (
        <div className="frame">
          <div className="card-close-container" onClick={returnHome}>
            <CloseOutlined className="card-close-icon" />
          </div>

          <div
            className="content-student"
            style={{
              border: "10px ridge #F6C714",
              width: "85%",
              height: "80vh",
              position: "absolute",
              top: "10%",
              left: "7%",
            }}>
            {children}
          </div>
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
                }}>
                <Row>
                  <Col span={12}>
                    <div onClick={hanlderClickProfile} className="container">
                      <div class="outer-hexagon">
                        <div class="inner-hexagon"></div>
                      </div>
                      <div class="tag-name">Nguyễn Văn Kiên</div>
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
                      <button
                        onClick={hanlderClickHomThu}
                        class="btn-hom-thu btn-student btn-icon"
                      />
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
                }}>
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
