import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { UpdateGift } from "../../../app/reducers/gift/gift.reducer";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import TextArea from "antd/es/input/TextArea";

const ModalDetailGift = (props) => {
  const onFinishFailed = () => {
    message.error("Error");
  };

  const { Option } = Select;
  const { visible, onCancel, onUpdate, gift, fetchData } = props;
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [isLimitedQuantity, setIsLimitedQuantity] = useState(true);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    if (gift.image) {
      // Chuyển đổi chuỗi byte thành mảng byte
      const byteArray = gift.image.split(",").map(Number);

      // Tạo một Uint8Array từ mảng byte
      const uint8Array = new Uint8Array(byteArray);

      // Chuyển đổi Uint8Array thành Blob
      const blob = new Blob([uint8Array], { type: "image/jpeg" });

      // Tạo URL dữ liệu từ Blob
      const imageUrl = URL.createObjectURL(blob);

      setSelectedImageUrl(imageUrl);
    }

    fetchCategory();

    if (gift && gift.quantity !== null) {
      setIsLimitedQuantity(true);
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

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setSelectedImageUrl(imageUrl);
    } else {
      setSelectedImageUrl("");
    }
  };

  const fetchCategory = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      setListCategory(response.data.data);
    });
  };

  const dispatch = useAppDispatch();

  const validateQuantity = (rule, value) => {
    const quantityValue = form.getFieldValue("quantity");
    if (quantityValue === 1 && (!value || value <= 0)) {
      return Promise.reject("Số lượng phải lớn hơn 0.");
    }
    return Promise.resolve();
  };

  const validateHoney = (rule, value) => {
    if (!value || value <= 0) {
      return Promise.reject("Điểm (điểm số) phải lớn hơn 0.");
    }
    return Promise.resolve();
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        console.log(formValues);
        let quantity;
        if (isLimitedQuantity) {
          quantity = parseInt(formValues.quantityLimit);
        } else {
          quantity =
            formValues.quantity !== undefined
              ? parseInt(formValues.quantity)
              : null;
        }
        GiftAPI.update(
          {
            ...formValues,
            image: image,
            id: gift ? gift.id : null,
            status: formValues.status,
            quantity: quantity,
            type: formValues.type,
            honey: formValues.honey,
            honeyCategoryId: formValues.honeyCategoryId,
            note: formValues.note,
          },
          gift ? gift.id : null
        )
          .then((response) => {
            dispatch(UpdateGift(response.data.data));
            message.success("Cập nhật thành công!");
            onUpdate();
            fetchData();
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
          span: 7,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
          image: gift && gift.image !== null ? gift.image : null,
          quantity: gift && gift.quantity !== null ? gift.quantity : null,
          quantityLimit: gift && gift.quantity !== null ? gift.quantity : null,
          name: gift && gift.name ? gift.name : "",
          code: gift && gift.code ? gift.code : "",
          status: gift && gift.status !== null ? gift.status : 0,
          type: gift && gift.type ? gift.type : 0,
          honey: gift && gift.honey !== null ? gift.honey : 0,
          honeyCategoryId:
            gift && gift.honeyCategoryId !== null ? gift.honeyCategoryId : null,
          note: gift && gift.note ? gift.note : "",
        }}
        autoComplete="off"
      >
        <div
          onClick={() => {
            document.getElementById("select-avatar").click();
          }}
          className="image-container"
        >
          {<img src={selectedImageUrl} alt="Chọn ảnh" />}
        </div>
        <input
          className="hidden-input"
          id="select-avatar"
          type="file"
          accept="image/*"
          onChange={(event) => handleFileInputChange(event)}
        />

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
            onChange={(e) => {
              setIsLimitedQuantity(e.target.value !== null);
              if (!e.target.value) {
                form.setFieldsValue({ quantityLimit: null });
              }
            }}
          >
            <Radio value={null} defaultChecked={gift && gift.quantity === null}>
              Vô hạn
            </Radio>
            <Radio value={gift && gift.quantity !== null ? gift.quantity : 1}>
              Giới hạn
            </Radio>
          </Radio.Group>
        </Form.Item>
        {isLimitedQuantity ? (
          <Form.Item
            label="Số lượng giới hạn"
            name="quantityLimit"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng giới hạn",
              },
              {
                validator: validateQuantity,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        ) : null}
        <Form.Item
          label="Loại vật phẩm"
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
          label="Loại mật ong"
          name="honeyCategoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn cấp",
            },
          ]}
        >
          <Select placeholder="Chọn cấp bậc">
            {listCategory.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Số mật ong"
          name="honey"
          rules={[
            {
              required: true,
              message: "Điểm Quà không để trống",
            },
            {
              validator: validateHoney,
            },
          ]}
        >
          <Input />
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
          label="Ghi chú"
          name="note"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
            },
          ]}
        >
          <TextArea
            cols="30"
            rows="10"
            style={{ width: "350px", height: "100px" }}
          />
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
