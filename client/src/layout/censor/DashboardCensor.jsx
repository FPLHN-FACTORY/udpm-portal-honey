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
import logo from "../../assets/images/logo/logo-udpm-3.png";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Drawer, Row, Menu, Col } from "antd";
import Header from "../../components/censor/Header";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodePullRequest,
  faGift,
  faKaaba,
  faPlusCircle,
  faScaleUnbalanced,
  faStar,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
const { Header: AntHeader, Content } = Layout;

function DashboardAuthUser({ children }) {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState();
  const [visible, setVisible] = useState(false);
  const openDrawer = () => setVisible(!visible);
  const [count, setCount] = useState(250);
  const onSlidebar = () => {
    if (count === 70) setCount(250);
    else setCount(70);
  };

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location]);
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");
  let title = "";
  if (pathname.includes("censor/category")) {
    title = "Quản lý thể loại";
  }
  if (pathname.includes("censor/gift")) {
    title = "Quản lý vật phẩm";
  }
  if (pathname.includes("censor/add-point")) {
    title = "Tặng quà";
  }
  if (pathname.includes("censor/request-manager")) {
    title = "Quản lý yêu cầu";
  }
  if (pathname.includes("censor/request-item")) {
    title = "Quản lý yêu cầu";
  }
  if (pathname.includes("censor/request-manager/random-add-point")) {
    title = "Tặng quà";
  }
  if (pathname.includes("censor/chest")) {
    title = "Quản lý rương";
  }
  if (pathname.includes("censor/auction-management")) {
    title = "Quản lý đấu giá";
  }
  if (pathname.includes("censor/upgrade-rate")) {
    title = "Quản lý nâng cấp";
  }
  if (pathname.includes("censor/event")) {
    title = "Module sự kiện";
  }
  if (pathname.includes("censor/project")) {
    title = "Module xưởng dự án";
  }
  if (pathname.includes("censor/history-portal")) {
    title = "Lịch sử";
  }

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
      <Link to="/censor/category">Quản lý thể loại</Link>,
      "/censor/category",
      <FontAwesomeIcon icon={faKaaba} />
    ),
    getItem(
      <Link to="/censor/gift">Quản lý vật phẩm</Link>,
      "/censor/gift",
      <FontAwesomeIcon icon={faGift} />
    ),
    // getItem(
    //   "Tặng quà",
    //   "Tặng quà",
    //   <FontAwesomeIcon icon={faPlusCircle} />,
    //   [
    //     getItem(
    //       <Link to={"/censor/add-point"}>Tặng quà</Link>,
    //       "/censor/add-point"
    //     ),
    // getItem(
    //   <Link to={"/censor/add-point/history"}>Lịch sử</Link>,
    //   "/censor/add-point/history"
    // ),
    //   ]
    // ),
    getItem(
      "Quản lý yêu cầu",
      "Quản lý yêu cầu",
      <FontAwesomeIcon icon={faCodePullRequest} />,
      [
        getItem(
          <Link to={"/censor/request-manager"}>Yêu cầu</Link>,
          "/censor/request-manager"
        ),
        getItem(
          <Link to={"/censor/request-manager/approved-history"}>Lịch sử</Link>,
          "/censor/request-manager/approved-history"
        ),
      ]
    ),
    getItem(
      "Tặng quà",
      "Tặng quà",
      <FontAwesomeIcon icon={faCodePullRequest} />,
      [
        getItem(
          <Link to={"/censor/request-manager/random-add-point"}>
            Tặng quà
          </Link>,
          "/censor/request-manager/random-add-point"
        ),
        getItem(
          <Link to={"/censor/add-point/history"}>Lịch sử</Link>,
          "/censor/add-point/history"
        ),
      ]
    ),
    getItem(
      <Link to="/censor/chest">Quản lý rương</Link>,
      "/censor/chest",
      <FontAwesomeIcon icon={faToolbox} />
    ),
    getItem(
      "Quản lý đấu giá",
      "Quản lý đấu giá",
      <FontAwesomeIcon icon={faScaleUnbalanced} />,
      [
        getItem(
          <Link to="/censor/auction-management">Quản lý đấu giá</Link>,
          "/censor/auction-management"
        ),
        getItem(
          <Link to={"/censor/auction-management/chart"}>Thống kê</Link>,
          "/censor/auction-management/chart"
        ),
      ]
    ),
    getItem(
      <Link to="/censor/upgrade-rate">Quản lý nâng cấp</Link>,
      "/censor/upgrade-rate",
      <FontAwesomeIcon icon={faStar} />
    ),
    // getItem(
    //   "Cổng thông tin",
    //   "Cổng thông tin",
    //   <FontAwesomeIcon icon={faCodePullRequest} />,
    //   [
    //     getItem(
    //       <Link to={"/censor/event"}>Module sự kiện</Link>,
    //       "/censor/event"
    //     ),
    //     getItem(
    //       <Link to={"/censor/project"}>Module dự án</Link>,
    //       "/censor/project"
    //     ),
    //     getItem(
    //       <Link to={"/censor/history-portal"}>Lịch sử</Link>,
    //       "/censor/history-portal"
    //     ),
    //   ]
    // ),
  ];
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout
      id="authe"
      style={{ background: "#f2f3f8" }}
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

          <Menu mode="inline" items={items} selectedKeys={selectedKey} />
        </Sider>
      </div>
      <Layout>
        <AntHeader style={{ zIndex: 1000, position: "fixed", width: "100%" }}>
          <Row>
            <Col span={8}>
              <Row>
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
                  >
                    {title}
                  </h1>
                </Col>
              </Row>
            </Col>
            <Col span={16} className="flex items-center justify-end">
              <Row className="w-full">
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
            style={{ paddingLeft: "80px", marginTop: "125px" }}
          >
            {children}
          </Content>
        ) : (
          <Content
            className="content-ant"
            style={{ paddingLeft: "250px", marginTop: "125px" }}
          >
            {children}
          </Content>
        )}
      </Layout>
    </Layout>
  );
}
export default DashboardAuthUser;
