import React, { useState } from "react";
import { Button, Col, Drawer, Modal, Row, Tabs } from "antd";
import "./Index.css";

export default function ModalImportExportExcel(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const showModal = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsModalVisible(true);
      setIsAnimating(false);
    }, 2000);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <div className="gift-box-container">
        <img
          src={require("../../../assets/images/ui-student/avata-item.png")}
          alt="Rương đồ"
          className={`gift-box-image ${isAnimating ? "animated" : ""}`}
          onClick={showModal}
        />
        <Button
          className={`use-button ${isAnimating ? "animated" : ""}`}
          onClick={showModal}
          disabled={isAnimating}
        >
          Sử dụng
        </Button>
        <Modal
          title="Quà của bạn"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="ok" type="primary" onClick={handleOk}>
              OK
            </Button>,
          ]}
        >
          <p>Chúc mừng! Bạn đã nhận được quà.</p>
        </Modal>
      </div>
    </div>
  );
}
