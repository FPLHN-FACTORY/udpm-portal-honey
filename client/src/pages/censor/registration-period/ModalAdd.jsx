import { DatePicker, Space, Form, Input, Modal, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { useState } from "react";
import { CensorRegistrationPeriodAPI } from "../../../apis/censor/registration-period/registration-period.api";
import { AddRegistrationPeriod } from "../../../app/reducers/registration-period/registration-period.reducer";
import "./index.css";
const ModalThem = (props) => {
  const { modalOpen, setModalOpen, category } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [name, setName] = useState("");
  const [numberArticles, setNumberArticles] = useState(null);

  form.setFieldsValue(category);
  const handleDateChange = (dates) => {
    const [fromDate, toDate] = dates;
    setFromDate(fromDate.valueOf());
    setToDate(toDate.valueOf());
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "numberArticles") {
      setNumberArticles(value);
    }
  };
  const onFinish = () => {
    let isValid = true;

    if (!name) {
      isValid = false;
      message.error("Name is not null!!");
    }

    if (!fromDate || !toDate) {
      isValid = false;
      message.error("Date is not null!!");
    }

    const parsedNumberArticles = parseFloat(numberArticles);
    if (isNaN(parsedNumberArticles) || parsedNumberArticles <= 0) {
      isValid = false;
      message.error("Number articles must not be less than 0!!");
    }

    const data = {
      name: name,
      fromDate: fromDate,
      toDate: toDate,
      numberArticles: numberArticles,
    };
    if (isValid) {
      CensorRegistrationPeriodAPI.create(data)
        .then((result) => {
          dispatch(AddRegistrationPeriod(result.data.data));
          message.success("Success!");
          setModalOpen(false);
          form.setFieldValue(null);
        })
        .catch((err) => {
          message.error("Error", err);
        });
    }
  };
  const onFinishFailed = () => {
    message.error("Error, please reinform!!");
  };
  const onCancel = () => {
    setModalOpen(false);
    form.setFieldValue(null);
  };
  const validateNumberArticles = (rule, value, callback) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      callback("Number of articles must be a valid number greater than 0");
    } else {
      callback();
    }
  };

  return (
    <>
      <Modal
        title="Create Registration Period"
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
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            // maxWidth: 600,
            marginRight: "20px",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            rules={[
              {
                required: true,
                message: "Please enter registration period name",
              },
              {
                pattern:
                  /^[a-zA-Z0-9\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/,
                message: "Name cannot contain special characters or symbols",
              },
              {
                min: 6,
                message: "Name must be at least 6 characters long",
              },
            ]}
          >
            <Input name="name" value={name} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Date" style={{ width: "100%" }}>
            <Space direction="vertical">
              <DatePicker.RangePicker onChange={handleDateChange} />
            </Space>
          </Form.Item>

          <Form.Item
            label="Number Article"
            rules={[
              {
                required: true,
                message: "Please enter registration period name",
              },
              {
                validator: validateNumberArticles,
              },
            ]}
          >
            <Input
              name="numberArticles"
              value={numberArticles}
              onChange={handleInputChange}
            />
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
