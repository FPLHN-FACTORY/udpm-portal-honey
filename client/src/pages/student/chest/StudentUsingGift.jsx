import React, { useState } from "react";
import { message, Modal, Form, Input, InputNumber, Slider } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { SetGiftArchive } from "../../../app/reducers/archive-gift/gift-archive.reducer";
import { SetArchiveCountGift } from "../../../app/reducers/archive-gift/archive-count-gift.reducer";

const UsingGift = (props) => {
  const { archivegift, filter } = props;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchData = () => {
    ArchiveAPI.getGift(filter).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
    });
    ArchiveAPI.detailArchiveGift(archivegift.idGift).then((response) => {
      let quantity = parseInt(response.data.quantity);
      dispatch(SetArchiveCountGift(quantity));
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          ...values,
          archiveGiftId: archivegift.id,
          quantity: soLuong,
        };
        ArchiveAPI.openGift(data)
          .then((result) => {
            if (result.data.success) {
              message.success("Đã gửi yêu cầu lên giảng viên");
              handleCancel();
            }
          })
          .catch((error) => {
            message.error(error.response.data.message);
          })
          .finally(() => {
            fetchData();
          });
      })
      .catch((errorInfo) => {
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const [soLuong, setSoLuong] = useState(1);

  return (
    <div>
      <div onClick={showModal}>Sử dụng</div>
      <Modal
        title="Sử dụng quà tặng"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <b>
            <span style={{ color: "red" }}>* </span> Số lượng
          </b>
          <Slider
            value={soLuong}
            onChange={(e) => {
              setSoLuong(e);
            }}
            max={parseInt(archivegift.quantity)}
          />
          <b>
            <span style={{ color: "red" }}>* </span> Mã môn học
          </b>
          <Form.Item
            name="maMon"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã môn học!",
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            ]}
          >
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
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsingGift;
