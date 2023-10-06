import { Form, Input, Modal, Radio, Select, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { AddGift } from "../../../app/reducers/gift/gift.reducer";
import { useState, useEffect } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";

const ModalThem = (props) => {
  const onFinishFailed = () => {
    message.error("Error");
  };

  const { modalOpen, setModalOpen, gift, onSave } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [image, setImage] = useState([]);
  const [quantityValue, setQuantityValue] = useState(null);
  const [listCategory, setListCategory] = useState([]);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };

  form.setFieldsValue(gift);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCategory();
    if (gift && gift.quantity !== null) {
      setQuantityValue(1);
    } else {
      setQuantityValue(0);
      form.setFieldsValue({ quantityLimit: 1 });
    }
  }, [gift]);

  const fetchCategory = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      setListCategory(response.data.data);
    });
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        let quantity = null;

        if (quantityValue === 1) {
          quantity = parseInt(formValues.quantityLimit, 10);
        }

        if (isNaN(quantity) && quantityValue === 1) {
          message.error("Vui lòng nhập số lượng giới hạn hợp lệ.");
          return;
        }
        GiftAPI.create({ ...formValues, image: image, quantity: quantity })
          .then((result) => {
            dispatch(AddGift(result.data.data));
            message.success("Thành công!");
            setModalOpen(false);
            form.resetFields();
            const newGift = {
              id: result.data.data.id,
              name: result.data.data.name,
              status: result.data.data.status,
              image: image,
              quantity: quantity,
              type: result.data.data.type,
              honey: result.data.data.honey,
              honeyCategoryId: result.data.data.honeyCategoryId,
            };
            onSave && onSave(newGift);
          })
          .catch((err) => {
            message.error("Lỗi: " + err.message);
          });
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };

  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={"Thêm mới quà tặng"}
      visible={modalOpen}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <hr className="border-0 bg-gray-300 mt-3 mb-6" />
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
          quantity: quantityValue,
          quantityLimit: 1,
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
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn tùy chọn số lượng",
            },
          ]}
        >
          <Radio.Group onChange={(e) => setQuantityValue(e.target.value)}>
            <Radio value={0}>Vô hạn</Radio>
            <Radio value={1}>Giới hạn</Radio>
          </Radio.Group>
        </Form.Item>
        {form.getFieldValue("quantity") === 1 && (
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
          label="cấp bậc"
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
          label="Số điểm"
          name="honey"
          rules={[
            {
              required: true,
              message: "Điểm Quà không để trống",
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
          <Radio.Group>
            <Radio value={1}>Cần phê duyệt</Radio>
            <Radio value={0}>Không phê duyệt</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <button
            style={{ marginRight: "20px" }}
            onClick={onCancel}
            className="submit-button"
          >
            Đóng
          </button>
          <button htmlType="submit" className="submit-button ml-2">
            OK
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalThem;
