import { Form, Input, Modal, Radio, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import {
  UpdateCategory,
  AddCategory,
} from "../../../app/reducers/category/category.reducer";
import "./index.css";
import { useEffect, useState } from "react";
const ModalThem = (props) => {
  const [listCategory, setListCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const { fetchData } = props;

  useEffect(() => {
    CategoryAPI.fetchAll().then((response) => {
      setListCategory(response.data.data.data);
    });
  }, []);

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
  const onFinishFailed = () => {
    message.error("Error");
  };

  const { modalOpen, setModalOpen, category, onSave } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(category);

  const dispatch = useAppDispatch();
  form.setFieldsValue(category);
  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        const isNameExists = listCategory.some(
          (listCategory) => listCategory.name === formValues.name
        );
        if (isNameExists) {
          message.error("Tên thể loại không được trùng");
          return;
        } else {
          if (category === null) {
            console.log(formValues);
            CategoryAPI.create({ ...formValues, image: image })
              .then((result) => {
                dispatch(AddCategory(result.data.data));
                message.success("Thành công!");
                setModalOpen(false);
                form.resetFields();
                const newCategory = {
                  id: result.data.data.id,
                  name: result.data.data.name,
                  image: image,
                };
                onSave && onSave(newCategory);
                fetchData();
              })
              .catch((err) => {
                message.error("Lỗi: " + err.message);
              });
          } else {
            CategoryAPI.update(formValues, category.id)
              .then((response) => {
                dispatch(UpdateCategory(response.data.data));
                message.success("Thành công!");
                setModalOpen(false);
                form.resetFields();
                fetchData();
              })
              .catch((err) => {
                message.error("Lỗi: " + err.message);
              });
          }
        }
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };

  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const initialValues = {
    categoryStatus: 2,
    transactionRights: 0,
  };

  return (
    <>
      <Modal
        title="Thể loại mật ong"
        open={modalOpen}
        onCancel={onCancel}
        footer={null}
      >
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <Form
          initialValues={initialValues}
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
          // initialValues={{
          //   remember: true,
          // }}
          autoComplete="off"
        >
          {/* <Form.Item label="Mã" name="code">
            <Input disabled />
          </Form.Item> */}
          <div
            onClick={() => {
              document.getElementById("select-avatar").click();
            }}
            className="image-container"
          >
            {image ? <img src={selectedImageUrl} alt="Chọn ảnh" /> : "Chọn ảnh"}
          </div>
          <input
            className="hidden-input"
            id="select-avatar"
            type="file"
            accept="image/*"
            onChange={(event) => handleFileInputChange(event)}
          />
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên bài viết không để trống",
              },
            ]}
          >
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
              <Radio value={2}>Cần phê duyệt</Radio>
              <Radio value={1}>Không phê duyệt</Radio>
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
              <Radio value={0}>Được giao dịch</Radio>
              <Radio value={1}>Không giao dịch</Radio>
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
    </>
  );
};

export default ModalThem;
