import { FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useState } from "react";
const ModalDetailClub = (props) => {
  const { club } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  form.setFieldsValue(club);
  return (
    <>
      <Tooltip title="Chi tiết">
        <Button
          className="detail-button"
          style={{ padding: "1px 0.7rem" }}
          onClick={showModal}
        >
          <FormOutlined className="icon" />
        </Button>
      </Tooltip>
      <Modal
        title="Chi tiết thể loại"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          onFinish={handleOk}
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
          <Form.Item label="Mã" name="code">
            <Input />
          </Form.Item>

          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              onClick={handleCancel}
              className="bg-#1d4ed8-400 text-white"
            >
              Đóng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDetailClub;
