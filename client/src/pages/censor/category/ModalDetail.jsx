import { FormOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, Tooltip, message } from "antd";
import { useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { useAppDispatch } from "../../../app/hooks";
import { UpdateCategory } from "../../../app/reducers/category/category.reducer";
const ModalDetail = (props) => {
  const { category } = props;
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
  form.setFieldsValue(category);
  form.setFieldsValue(category);

  const dispatch = useAppDispatch();
  form.setFieldsValue(category);

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        CategoryAPI.update(formValues, category.id)
          .then((response) => {
            dispatch(UpdateCategory(response.data.data));
            message.success("Thành công!");
            setIsModalOpen(false);
            form.resetFields();
          })
          .catch((err) => {
            message.error("Lỗi: " + err.message);
          });
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };
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
          onFinish={onFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          {/* <Form.Item label="Mã" name="code">
            <Input />
          </Form.Item> */}

          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item
            label="Phê duyệt"
            name="categoryStatus"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tùy chọn phê duyệt",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={"1"}>Cần phê duyệt</Radio>
              <Radio value={"0"}>Không phê duyệt</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Giao dịch"
            name="transactionRights"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tùy chọn phê duyệt",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={"0"}>Được giao dịch</Radio>
              <Radio value={"1"}>Không giao dịch</Radio>
            </Radio.Group>
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
            <button
              style={{ width: "60px", height: "38px", marginLeft: "20px" }}
              htmlType="submit"
              className="submit-button ml-2"
            >
              OK
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDetail;
