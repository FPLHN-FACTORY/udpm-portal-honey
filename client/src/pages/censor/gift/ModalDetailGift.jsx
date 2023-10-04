import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { UpdateGift } from "../../../app/reducers/gift/gift.reducer";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";

const ModalDetailGift = (props) => {
  const onFinishFailed = () => {
    message.error("Error");
  };

  const { Option } = Select;
  const { visible, onCancel, onUpdate, gift } = props;
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [isLimitedQuantity, setIsLimitedQuantity] = useState(true);

  useEffect(() => {
    if (gift && gift.quantity !== null) {
      setIsLimitedQuantity(true);
      console.log(gift);
    } else {
      setIsLimitedQuantity(false);
      form.setFieldsValue({ quantityLimit: 1 });
    }
  }, [gift]);

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  const dispatch = useAppDispatch();

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        let quantity;
        if (isLimitedQuantity) {
          quantity = parseInt(formValues.quantityLimit);
        } else {
          quantity =
            formValues.quantity !== null ? parseInt(formValues.quantity) : "";
        }
        console.log(gift.id);
        GiftAPI.update(
          {
            ...formValues,
            image: image,
            gift: gift ? gift.id : null,
            status: formValues.status,
            quantity: quantity,
            type: formValues.type,
          },
          gift ? gift.id : null
        )
          .then((response) => {
            dispatch(UpdateGift(response.data.data));
            message.success("Cập nhật thành công!");
            onUpdate();
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
    <Modal
      title="Chi tiết thể loại"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          quantity: gift && gift.quantity !== null ? gift.quantity : "",
          quantityLimit: gift && gift.quantity !== null ? gift.quantity : "",
          name: gift && gift.name ? gift.name : "",
          code: gift && gift.code ? gift.code : "",
          status: gift && gift.status !== null ? gift.status : 0,
          type: gift && gift.type ? gift.type : 0,
        }}
        autoComplete="off"
      >
        <Form.Item label="Ảnh" name="image">
          <Input
            hidden
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => handleFileInputChange(event)}
          />
          <label htmlFor="image"></label>
        </Form.Item>

        <Form.Item label="Code" name="code">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Tên Quà không để trống",
            },
            {
              min: 4,
              message: "Tên Quà phải tối thiểu 4 kí tự",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Số lượng" name="quantity">
          <Radio.Group
            onChange={(e) => setIsLimitedQuantity(e.target.value !== null)}
          >
            <Radio value={""}>Vô hạn</Radio>
            <Radio value={gift && gift.quantity !== null ? gift.quantity : 1}>
              Giới hạn
            </Radio>
          </Radio.Group>
        </Form.Item>
        {isLimitedQuantity && (
          <Form.Item
            label="Số lượng giới hạn"
            name="quantityLimit"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng giới hạn",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        )}

        <Form.Item
          label="Loại"
          name="type"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn loại",
            },
          ]}
        >
          <Select placeholder="Chọn loại">
            <Option value={0}>Quà tặng</Option>
            <Option value={1}>Vật phẩm nâng cấp</Option>
            <Option value={2}>Dụng cụ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Phê duyệt"
          name="status"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn tùy chọn phê duyệt",
            },
          ]}
        >
          <Radio.Group
            value={gift !== null ? gift.status : undefined}
            onChange={(e) => form.setFieldsValue({ status: e.target.value })}
          >
            <Radio value={0}>Không phê duyệt</Radio>
            <Radio value={1}>Cần phê duyệt</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            style={{ marginRight: "20px" }}
            onClick={handleCancel}
            className="submit-button"
          >
            Đóng
          </Button>
          <Button htmlType="submit" className="submit-button ml-2">
            OK
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetailGift;
