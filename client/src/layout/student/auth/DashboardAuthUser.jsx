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
import { Layout, Space, message } from "antd";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import "./index.css";
import {
  connectStompClient,
  getStompClient,
} from "../../../helper/stomp-client/config";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

function DashboardAuthUser({ children }) {
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

  const [open, setOpen] = useState(false);
  return (
    <div className="main-ui-student" style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}>
          <Layout>
            <Content
              style={{
                paddingTop: "20px",
                height: "70vh",
                paddingRight: "60px",
                paddingLeft: "60px",
              }}>
              <div class="outer-hexagon">
                <div class="inner-hexagon"></div>
              </div>
            </Content>
            <Footer
              style={{
                paddingBottom: "20px",
                height: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "end",
              }}>
              <button className="btn-doi-qua btn-student" />
              <button className="btn-cua-hang btn-student" />
              <button className="btn-doi-qua btn-student" />
            </Footer>
          </Layout>
        </Space>
      </div>
    </div>
  );
}
export default DashboardAuthUser;
