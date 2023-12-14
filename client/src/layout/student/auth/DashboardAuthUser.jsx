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
import {
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  message,
  Button,
  Modal,
  Form,
  Input,
} from "antd";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import soundClick from "../../../assets/sounds/sound_click.mp3";
import soundTransaction from "../../../assets/sounds/transaction-notification.mp3";
import "./index.css";
import {
  connectStompClient,
  getStompClient,
} from "../../../helper/stomp-client/config";
import { Content, Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "../../../helper/userToken";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetUser, SetUser } from "../../../app/reducers/users/users.reducer";
import DialogTransaction from "../../../pages/student/transaction/DialogTransaction";
import { NotificationAPI } from "../../../apis/student/notification/notification.api";
import {
  GetCountNotification,
  SetCountNotification,
} from "../../../app/reducers/notification/count-notification.reducer";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";

function DashboardAuthUser({ children }) {
  const data = useAppSelector(GetUser);
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState();
  const dispatch = useAppDispatch();
  const fetchCountNotification = async () => {
    try {
      const response = await NotificationAPI.fetchCountNotification();
      dispatch(SetCountNotification(response.data));
    } catch (error) {}
  };
  const location = useLocation();
  useEffect(() => {
    fetchCountNotification();
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/student") {
      fetchCountNotification();
    }
  }, [location]);

  const dataCountNotification = useAppSelector(GetCountNotification);

  let userInteracted = false;

  document.addEventListener("click", function (event) {
    addClickEffect(event);
    if (localStorage.getItem("onMusic") === "true") {
      playSound();
    }
    if (!userInteracted) {
      userInteracted = true;
    }
  });

  function addClickEffect(event) {
    const clickEffect = document.createElement("div");
    clickEffect.classList.add("click-effect");
    clickEffect.style.left = event.pageX + "px";
    clickEffect.style.top = event.pageY + "px";

    document.body.appendChild(clickEffect);

    clickEffect.addEventListener("animationend", function () {
      document.body.removeChild(clickEffect);
    });
  }

  function playSoundNotificationTransaction() {
    if (onMusic && userInteracted) {
      const audio = new Audio(soundTransaction);
      audio.play();
    }
  }

  // giao dịch =================================================================
  useEffect(() => {
    connectStompClient();
    getStompClient().connect({}, () => {
      ProfileApi.getUserLogin().then((response) => {
        getStompClient().subscribe(
          `/portal-honey/${response.data.data.idUser}/transaction`,
          (result) => {
            if (!open) {
              const transactionReq = JSON.parse(result.body);
              if (transactionReq.success) {
                playSoundNotificationTransaction();
                showRequestTransaction(transactionReq.data);
              }
            }
          }
        );
      });
      getStompClient().subscribe(
        `/portal-honey/create-notification-user`,
        (result) => {
          dispatch(SetCountNotification(JSON.parse(result.body).data));
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
              className="btn-tu-choi"
              onClick={() => {
                message.destroy(transactionReq.idTransaction);
              }}
            >
              Từ chối
            </button>
            <button
              className="btn-chap-nhan"
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
    const idTransaction = transaction.idTransaction;
    ProfileApi.getUserLogin().then((response) => {
      dispatch(SetUser(response.data.data));
      const nameUser = response.data.data.name;
      const idUser = response.data.data.idUser;
      getStompClient().send(
        `/transaction/accept-transaction/${idTransaction}`,
        {},
        JSON.stringify({ nameUser, idTransaction, idUser })
      );
      setTransaction(transaction);
      message.destroy(idTransaction);
      setOpen(true);
    });
  }

  const requestTransaction = (value) => {
    const idTransaction = uuidv4();
    TransactionApi.searchStudent(value).then(
      (result) => {
        if (result.data.success) {
          const nameUser = data.name;
          const idUser = data.idUser;
          getStompClient().send(
            "/transaction/send-transaction/" + result.data.data,
            {},
            JSON.stringify({ nameUser, idTransaction, idUser })
          );
          setIsModalOpen(false);
          message.success("Đã gửi yêu cầu giao dịch!");
          formFindUser.resetFields();
          const subscription = getStompClient().subscribe(
            `/portal-honey/transaction/${idTransaction}/accept`,
            (result) => {
              if (!open) {
                const transactionReq = JSON.parse(result.body);
                if (transactionReq.success) {
                  setTransaction(transactionReq.data);
                  message.destroy(idTransaction);
                  setOpen(true);
                }
                subscription.unsubscribe();
              }
            }
          );
          setTimeout(() => {
            subscription.unsubscribe();
          }, 10000);
        }
      },
      (error) => {
        message.error(error.response.data.message);
      }
    );
  };

  // =================================================================
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
    navigate("/student/shop");
  };
  const hanlderClickDauGia = () => {
    navigate("/student/auction-new");
  };
  const hanlderClickNangCap = () => {
    navigate("/student/upgrade-honey");
  };
  const hanlderClickGiaoDich = () => {
    ProfileApi.checkCategoryUser().then((response) => {
      if (response.data.data) {
        setIsModalOpen(true);
      } else {
        message.warning("Tính năng sắp ra mắt");
      }
    });
  };
  const hanlderClickKhoDo = () => {
    navigate("/student/chest");
  };

  const hanlderClickTonVinh = () => {
    navigate("/student/hall-of-fame");
  };

  const [isSettingMenuOpen, setIsSettingMenuOpen] = useState(false);
  const hanlderClickCaiDat = () => {
    setIsSettingMenuOpen(!isSettingMenuOpen);
  };
  const settingMenu = (
    <Menu onClick={hanlderClickCaiDat}>
      <Menu.Item
        key="logout"
        onClick={() => {
          deleteToken();
          navigate(`/author-switch`);
        }}
      >
        Đăng xuất
      </Menu.Item>
      {/* <Menu.Item
        key="2"
        onClick={() => {
          setToken(token2);
          getProfile();
        }}>
        Tài khoản 2
      </Menu.Item> */}
    </Menu>
  );
  // ========================

  const hanlderClickHomThu = () => {
    navigate("/student/letter");
  };
  const hanlderClickAmThanh = () => {
    localStorage.setItem("onMusic", !onMusic);
    setOnMusic(!onMusic);
  };
  const hanlderClickProfile = () => {
    navigate("/student/profile");
  };

  const [open, setOpen] = useState(false);

  const returnHome = () => {
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

  const [formFindUser] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    formFindUser.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div className="main-ui-student" style={{ display: "flex" }}>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
          closeIcon={<></>}
          footer={null}
          width={400}
          className="css-modal-confim-buy-gift"
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form
              form={formFindUser}
              onFinish={requestTransaction}
              style={{ width: "90%" }}
            >
              <h2
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  marginTop: "-5px",
                  textAlign: "center",
                }}
              >
                GIAO DỊCH
              </h2>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Vui lòng nhập email sinh viên cần tìm!",
                  },
                ]}
              >
                <Input placeholder="Nhập email sinh viên!" />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  className="btn-xac-nhan"
                >
                  Gửi yêu cầu
                </Button>
                <Button
                  type="primary"
                  className="btn-huy"
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
              </div>
            </Form>
          </div>
        </Modal>
      )}

      {open && (
        <DialogTransaction
          key={"transaction.idTransaction"}
          open={true}
          setOpen={setOpen}
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
                      onClick={hanlderClickGiaoDich}
                      class="btn-giao-dich btn-student btn-icon"
                    />
                    <button
                      onClick={hanlderClickTonVinh}
                      class="btn-dap-do btn-student btn-icon"
                    />
                  </Col>
                  <Col span={12}>
                    <div style={{ float: "right" }}>
                      <button
                        onClick={hanlderClickCaiDat}
                        class="btn-cai-dat btn-student btn-icon"
                      >
                        <Dropdown
                          overlay={settingMenu}
                          placement="bottomRight"
                          visible={isSettingMenuOpen}
                          onVisibleChange={() => {}}
                        >
                          <span />
                        </Dropdown>
                      </button>
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
                  onClick={hanlderClickNangCap}
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
