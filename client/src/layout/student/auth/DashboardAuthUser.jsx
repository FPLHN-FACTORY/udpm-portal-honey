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
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Drawer, Row, Menu, Col } from "antd";
import Header from "../../../components/user/auth/Header";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
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
    getItem("Giao dịch điểm", "0", <TransactionOutlined />, [
      getItem(
        <Link to={"/student/transaction/create"}>Tạo giao dịch</Link>,
        "1"
      ),
      getItem(<Link to={"/student/transaction"}>Lịch sử giao dịch</Link>, "2"),
    ]),
    getItem(
      <Link to={"/student/profile"}>
        <ProfileOutlined style={{ fontSize: 20 }} />
        <span style={{ marginLeft: 15, marginRight: 15 }}>Hồ sơ</span>
      </Link>,
      "3"
    ),
  ];
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout
      id="authe"
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
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
        } `}
      >
        <Layout
          id="layout_drawer"
          style={{ background: "#fff", overflowX: "hidden" }}
          className={` bg-white layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
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
          }}
        >
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
                    onClick={toggleCollapse}
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </button>
                  <button className="buttonSlider mobile" onClick={openDrawer}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </button>
                  <h1
                    style={{
                      marginLeft: "20px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                    }}
                  ></h1>
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
            style={{ paddingLeft: "4%", marginTop: "7%" }}
          >
            {children}
          </Content>
        ) : (
          <Content
            className="content-ant"
            style={{ paddingLeft: "16%", marginTop: "9%" }}
          >
            {children}
          </Content>
        )}
      </Layout>
    </Layout>
  );
}
export default DashboardAuthUser;
