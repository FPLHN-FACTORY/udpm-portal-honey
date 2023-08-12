import { Form, Input, Modal, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import {
  UpdateCategory,
  AddCategory,
} from "../../../app/reducers/category/category.reducer";
import "./index.css";
const ModalThem = (props) => {
  const { modalOpen, setModalOpen, category, onSave } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  form.setFieldsValue(category);

  const onFinish = () => {
    const formValues = form.getFieldsValue();
    if (category == null) {
      CategoryAPI.create(formValues)
        .then((result) => {
          dispatch(AddCategory(result.data.data));
          message.success("Success!");
          setModalOpen(false);
          form.setFieldValue(null);
          const newCategory = {
            id: result.data.data.id,
            name: result.data.data.name,
          };
          onSave(newCategory);
          setModalOpen(false);
        })
        .catch((err) => {
          message.error("Error", err);
        });
    } else {
      CategoryAPI.update(formValues, category.id).then(
        (response) => {
          dispatch(UpdateCategory(response.data.data));
          message.success("Success!");
          setModalOpen(false);
          form.setFieldValue(null);
        },
        (err) => {
          message.error("Error", err);
        }
      );
    }
  };
  const onFinishFailed = () => {
    message.error("Error");
  };
  const onCancel = () => {
    setModalOpen(false);
    form.setFieldValue(null);
  };

  return (
    <>
      <Modal
        title="Category"
        open={modalOpen}
        onCancel={onCancel}
        footer={null}
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
          }}
          autoComplete="off"
        >
          <Form.Item label="Code" name="code">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter category name",
              },
              {
                pattern:
                  /^[a-zA-Z0-9\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/,
                message: "Name cannot contain special characters or symbols",
              },
              {
                min: 4,
                message: "Name must be at least 4 characters long",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <button onClick={onCancel} className="submit-button">
              Close
            </button>
            <button htmlType="submit" className="submit-button ml-2">
              Submit
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalThem;
