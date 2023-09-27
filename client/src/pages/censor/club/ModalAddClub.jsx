import { Form, Input, Modal, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { ClubAPI } from '../../../apis/censor/club/club.api';
import {
  UpdateClub,
  AddClub,
} from "../../../app/reducers/club/club.reducer";

import { useEffect } from "react";
const ModalThem = (props) => {
  const onFinishFailed = () => {
    message.error("Error");
  };

  const { modalOpen, setModalOpen, club, onSave } = props;
  const [form] = Form.useForm();

  form.setFieldsValue(club);
  const dispatch = useAppDispatch();
  form.setFieldsValue(club);
  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        console.log(formValues);
        if (club === null) {
          console.log(formValues);
          ClubAPI.create(formValues)
            .then((result) => {
              console.log(result);
              dispatch(AddClub(result.data.data));
              message.success("Thành công!");
              setModalOpen(false);
              form.resetFields();
              const newClub = {
                id: result.data.data.id,
                name: result.data.data.name,
              };
              onSave && onSave(newClub);
            })
            .catch((err) => {
              message.error("Lỗi: " + err.message);
            });
        } else {
          console.log(club.id);
          ClubAPI.update(formValues, club.id)
            .then((response) => {
              dispatch(UpdateClub(response.data.data));
              message.success("Thành công!");
              setModalOpen(false);
              form.resetFields();
            })
            .catch((err) => {
              message.error("Lỗi: " + err.message);
            });
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

  return (
    <>
      <Modal
        title="Thể loại bài viết"
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
          <Form.Item label="Mã" name="code">
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
                pattern:
                  /^[a-zA-Z0-9\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/,
                message: "Tên Quà không bao gồm các ký tự đặc biệt",
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <button onClick={onCancel} className="submit-button">
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
