import React, { useState } from "react";
import { Button, message, Modal, Form, Input } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { SetGiftArchive } from "../../../app/reducers/archive-gift/gift-archive.reducer";

const UsingGift = (props) => {
  const { archivegift, filter } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchData = () => {
    ArchiveAPI.getArchive(filter).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = { ...values, archiveGiftId: archivegift.id };
        ArchiveAPI.openGift(data)
          .then((result) => {
            if (result.data.success) {
              message.success("Đã gửi yêu cầu lên giảng viên");
              handleCancel();
            }
          })
          .catch((error) => {
            form.setFields([
              {
                name: "emailGV",
                errors: [error.response.data.message],
              },
            ]);
          })
          .finally(() => {
            fetchData();
          });
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={showModal} className="button-xac-nhan">
        Sử dụng
      </Button>
      <Modal
        title="Sử dụng quà tặng"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form}>
          <b>
            <span style={{ color: "red" }}>* </span> Mã Lớp
          </b>
          <Form.Item
            name="maLop"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã lớp!",
              },
            ]}>
            <Input />
          </Form.Item>
          <b>
            <span style={{ color: "red" }}>* </span> Email giảng viên
          </b>
          <Form.Item
            name="emailGV"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email giảng viên!",
              },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsingGift;
