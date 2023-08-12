import { DatePicker, Space, Form, Input, Modal, message, Select } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { CensorRegistrationPeriodAPI } from "../../../apis/censor/registration-period/registration-period.api";
import { UpdateRegistrationPeriod } from "../../../app/reducers/registration-period/registration-period.reducer";
import moment from "moment";
const ModalDetail = (props) => {
  const { modalOpen, setModalOpen, category } = props;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [fromDate, setFromDate] = useState(category.fromDate);
  const [toDate, setToDate] = useState(category.toDate);
  const { Option } = Select;
  console.log(category);
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        code: category.code,
        name: category.name,
        numberArticles: category.numberArticles,
        status: category.status,
      });
    }
  }, [category, form]);

  const handleDateChange = (dates) => {
    const [fromDate, toDate] = dates;
    setFromDate(fromDate.valueOf());
    setToDate(toDate.valueOf());
  };

  const onFinish = () => {
    var formData = form.getFieldValue();
    let isValid = true;

    if (!formData.name) {
      isValid = false;
      message.error("Name is not null!!");
    }

    if (!fromDate || !toDate) {
      isValid = false;
      message.error("Date is not null!!");
    }

    const parsedNumberArticles = parseFloat(formData.numberArticles);
    if (isNaN(parsedNumberArticles) || parsedNumberArticles <= 0) {
      isValid = false;
      message.error("Number articles must not be less than 0!!");
    }
    const data = {
      name: formData.name,
      fromDate: fromDate,
      toDate: toDate,
      numberArticles: parseFloat(formData.numberArticles),
      status: formData.status,
    };

    if (isValid) {
      CensorRegistrationPeriodAPI.update(data, category.id).then(
        (response) => {
          dispatch(UpdateRegistrationPeriod(response.data.data));
          message.success("Success!");
          setModalOpen(false);
        },
        (err) => {
          message.error("Error", err);
        }
      );
    }
  };
  const onFinishFailed = () => {
    message.error("Error, please reinform!!");
  };
  const onCancel = () => {
    setModalOpen(false);
  };
  const validateNumberArticles = (rule, value, callback) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue) || parsedValue <= 0) {
      callback("Number of articles must be a valid number greater than 0");
    } else {
      callback();
    }
  };
  const hihihih = () => {
    const date = {
      fromDate: category.fromDate,
      toDate: category.toDate,
    };
    const fromDateMoment = moment(date.fromDate);
    const toDateMoment = moment(date.toDate);
    return [fromDateMoment, toDateMoment];
  };

  return (
    <>
      <Modal
        title="Update Registration Period"
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
          <Form.Item label="Code" name="code">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter registration period name",
              },
              {
                min: 6,
                message: "Name must be at least 6 characters long",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="date">
            <Space
              direction="vertical"
              style={{
                width: "100%",
              }}
            >
              <DatePicker.RangePicker
                status="warning"
                style={{
                  width: "100%",
                }}
                value={hihihih}
                onChange={handleDateChange}
              />
            </Space>
          </Form.Item>

          <Form.Item
            label="Number Article"
            name="numberArticles"
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
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select defaultValue="select-status">
              <Option value="status" disabled>
                Select status
              </Option>
              <Option value="0">ACTIVE</Option>
              <Option value="1">INACTIVE</Option>
            </Select>
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
export default ModalDetail;
