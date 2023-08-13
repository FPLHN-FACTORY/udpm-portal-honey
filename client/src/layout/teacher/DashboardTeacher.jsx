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
import logo from "../../../src/assets/images/logo/logo-udpm-3.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Drawer, Row, Menu, Col } from "antd";
import Header from "../../components/teacher/Header";
import Footer from "../../components/teacher/Footer";
import Draw from "../../components/teacher/Draw";
import {
  EditOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,

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
  const [fixed, setFixed] = useState(false);

  const handleFixedNavbar = (type) => setFixed(type);

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
      <Link to="/user/create-article">Nothing</Link>,
      "1",
      <EditOutlined />
    ),
  ];
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        open={visible}
        key={"left"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Draw />
        </Layout>
      </Drawer>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={`sider-primary ant-layout-sider-primary`}
        style={{ background: "transparent", overflowX: "hidden" }}
      >
        <Row className="flex justify-between pb-8">
          {!collapsed && (
            <div className="brand text-center">
              <Link to="/" className="active">
                <img
                  src={logo}
                  style={{
                    width: "140px",
                    height: "80px",
                    marginLeft: "17px",
                    marginTop: "-20px",
                  }}
                  alt="Logo"
                />
              </Link>
            </div>
          )}
        </Row>

        <Menu mode="inline" items={items} />
      </Sider>
      <Layout>
        <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
          <Row className="flex justify-between">
            <Col xs={1}>
              <button className="buttonSlider" onClick={toggleCollapse}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button>
            </Col>
            <Col xs={23}>
              <Header
                onPress={openDrawer}
                onSlidebar={onSlidebar}
                name={pathname}
                subName={pathname}
                handleFixedNavbar={handleFixedNavbar}
              />
            </Col>
          </Row>
        </AntHeader>
        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
export default DashboardAuthUser;
