import React, { useState } from "react";
import { Button, Form, Input, Modal, Tooltip } from "antd";

const ModalDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Chi tiết">
        <Button onClick={showModal}>Detail</Button>
      </Tooltip>

      <Modal
        title="Basic Modal"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          // Customize the footer with only Cancel button
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item label="Code" name="code">
            <Input />
          </Form.Item>

          <Form.Item label="Name" name="name">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalDetail;
