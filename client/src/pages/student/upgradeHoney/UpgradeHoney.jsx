import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";
import React from "react";

export default function UpgradeHoney() {
  return (
    <div style={{ height: "100%" }}>
      <Layout style={{ height: "100%" }}>
        <Layout>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
        <Sider>Sider</Sider>
      </Layout>
    </div>
  );
}
