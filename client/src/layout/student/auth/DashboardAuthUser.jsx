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
import logo from "../../../assets/images/logo/logo-udpm-3.png";
import soundTransaction from "../../../assets/sounds/transaction-notification.mp3";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Drawer, Row, Menu, Col, message, Modal } from "antd";
import Header from "../../../components/user/auth/Header";
import {
  GiftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import "./index.css";
import DialogTransaction from "../../../pages/student/transaction/DialogTransaction";
import { getStompClient } from "../../../helper/stomp-client/config";

const { Header: AntHeader, Content } = Layout;

function DashboardAuthUser({ children }) {
  const [visible, setVisible] = useState(false);
  const openDrawer = () => setVisible(!visible);
  const [count, setCount] = useState(250);
  const onSlidebar = () => {
    if (count === 70) setCount(250);
    else setCount(70);
  };

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  const [collapsed, setCollapsed] = useState(false);
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      <Link to={"/student/profile"}>Hồ sơ</Link>,
      "1",
      <ProfileOutlined />
    ),
    getItem(
      <Link to={"/student/transaction/create"}>Tạo giao dịch</Link>,
      "0",
      <TransactionOutlined />
    ),
    getItem("Đổi quà", "3", <GiftOutlined />, [
      getItem(<Link to={"/student/create-conversion"}>Tạo yêu cầu</Link>, "1"),
      getItem(
        <Link to={"/student/create-conversion/history"}>Lịch sử đổi</Link>,
        "2"
      ),
    ]),
  ];
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const [idTransaction, setIdTransaction] = useState();
  useEffect(() => {
    getStompClient().connect({}, () => {
      ProfileApi.getUserLogin().then((response) => {
        getStompClient().subscribe(
          `/user/${response.data.data.idUser}/transaction`,
          (result) => {
            if (!open) {
              const transactionReq = JSON.parse(result.body);
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
                          onsubmitTransaction(transactionReq.idTransaction);
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
          }
        );
      });
    });
    return () => {
      getStompClient().disconnect();
    };
  }, []);

  function onsubmitTransaction(idTransaction) {
    setIdTransaction(idTransaction);
    message.destroy(idTransaction);
    setOpen(true);
  }

  const [open, setOpen] = useState(false);

  return (
    <Layout
      id="authe"
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}>
      <Modal centered open={open} onOk={null} onCancel={null} width={900}>
        <DialogTransaction
          open={open}
          idTransaction={idTransaction}
          setClose={setOpen}
        />
      </Modal>
      <Drawer
        id="drawer_ui"
        title={false}
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={"left"}
        width={250}
        style={{ background: "#fff", overflowX: "hidden" }}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}>
        <Layout
          id="layout_drawer"
          style={{ background: "#fff", overflowX: "hidden" }}
          className={` bg-white layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}>
          <Row className="flex justify-center align-middle mt-5 pb-8">
            <div className="brand text-center">
              <Link to="/" className="active">
                <img
                  src={logo}
                  style={{
                    height: "80px",
                  }}
                  alt="Logo"
                />
              </Link>
            </div>
          </Row>
          <Menu mode="inline" items={items} onClick={openDrawer} />
        </Layout>
      </Drawer>
      <div className="bg-white">
        <Sider
          id="sildebar_ui"
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          className={`sider-primary ant-layout-sider-primary`}
          style={{
            background: "#fff",
            position: "fixed",
            left: 0,
            zIndex: 999,
            height: "100%",
          }}>
          <Row
            className="flex justify-center align-middle  mt-5 pb-8"
            style={{ height: "80px" }}
          />

          <Menu mode="inline" items={items} />
        </Sider>
      </div>
      <Layout className="pb-14">
        <AntHeader style={{ zIndex: 1000, position: "fixed", width: "100%" }}>
          <Row>
            <Col span={8}>
              <Row>
                {!collapsed ? (
                  <Col span={12}>
                    <div className="brand text-center">
                      <Link to="/" className="active">
                        <img
                          src={logo}
                          style={{
                            height: "60px",
                          }}
                          alt="Logo"
                        />
                      </Link>
                    </div>
                  </Col>
                ) : (
                  <Col span={4}></Col>
                )}
                <Col span={12} className="flex items-center">
                  <button
                    className="buttonSlider desktop"
                    onClick={toggleCollapse}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </button>
                  <button className="buttonSlider mobile" onClick={openDrawer}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </button>
                </Col>
              </Row>
            </Col>
            <Col span={16}>
              <Row>
                <Col span={15}></Col>
                <Col span={9}>
                  <Header
                    onPress={openDrawer}
                    onSlidebar={onSlidebar}
                    name={pathname}
                    subName={pathname}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </AntHeader>
        {collapsed ? (
          <Content
            className="content-ant"
            style={{ paddingLeft: "6%", marginTop: "7%" }}>
            {children}
          </Content>
        ) : (
          <Content
            className="content-ant"
            style={{ paddingLeft: "19%", marginTop: "9%" }}>
            {children}
          </Content>
        )}
      </Layout>
    </Layout>
  );
}
export default DashboardAuthUser;
