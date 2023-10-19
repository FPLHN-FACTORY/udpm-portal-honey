import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { UpdateGift } from "../../../app/reducers/gift/gift.reducer";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import TextArea from "antd/es/input/TextArea";
import { SemesterAPI } from "../../../apis/censor/semester/semester.api";
import moment from "moment";

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
  const [listSemester, setListSemester] = useState([]);
  const [timeType, setTimeType] = useState(null);

  useEffect(() => {
    if (gift.image) {
      const byteArray = gift.image.split(",").map(Number);
      const uint8Array = new Uint8Array(byteArray);
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);

      setSelectedImageUrl(imageUrl);
    }
    const timeType =
      gift.semesterId && gift.fromDate && gift.toDate
        ? "học kì"
        : gift.fromDate && gift.toDate
        ? "thời hạn"
        : "vĩnh viễn";

    setTimeType(timeType);

    fetchCategory();
    fetchSemester();
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
  const fetchSemester = () => {
    SemesterAPI.fetchAllSemester().then((response) => {
      setListSemester(response.data.data);
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

  const validateStartDate = (rule, value) => {
    const endDate = form.getFieldValue("end");
    if (value && endDate && new Date(value) >= new Date(endDate)) {
      return Promise.reject("Thời gian bắt đầu phải trước thời gian kết thúc.");
    }
    return Promise.resolve();
  };

  const validateEndDate = (rule, value) => {
    const startDate = form.getFieldValue("start");
    if (value && startDate && new Date(value) <= new Date(startDate)) {
      return Promise.reject("Thời gian kết thúc phải sau thời gian bắt đầu.");
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

        let updatedFromDate = null;
        let updatedToDate = null;
        let updatedSemesterId = null;

        if (formValues.timeType === "vĩnh viễn") {
          updatedFromDate = null;
          updatedToDate = null;
          updatedSemesterId = null;
        } else if (formValues.timeType === "học kì") {
          const selectedSemester = listSemester.find(
            (semester) => semester.id === formValues.semester
          );

          if (selectedSemester) {
            updatedFromDate = selectedSemester.fromDate;
            updatedToDate = selectedSemester.toDate;
            updatedSemesterId = selectedSemester.id;
          }
        } else if (formValues.timeType === "thời hạn") {
          updatedFromDate = new Date(formValues.start).getTime();
          updatedToDate = new Date(formValues.end).getTime();
          updatedSemesterId = null;
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
            fromDate: updatedFromDate,
            toDate: updatedToDate,
            semesterId: updatedSemesterId,
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
  const fromDate = new Date(Number(gift.fromDate));
  const toDate = new Date(Number(gift.toDate));

  const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
  const formattedToDate = moment(toDate).format("YYYY-MM-DD");

  const initialValues = {
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
    timeType:
      gift.semesterId && gift.fromDate && gift.toDate
        ? "học kì"
        : gift.fromDate && gift.toDate
        ? "thời hạn"
        : "vĩnh viễn",
    semester: gift.semesterId,
    start: formattedFromDate,
    end: formattedToDate,
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
        initialValues={initialValues}
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
          label="Thời gian"
          name="timeType"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thời gian",
            },
          ]}
        >
          <Radio.Group
            value={timeType}
            onChange={(e) => setTimeType(e.target.value)}
          >
            <Radio value="vĩnh viễn">Vĩnh viễn</Radio>
            <Radio value="học kì">Học kì</Radio>
            <Radio value="thời hạn">Thời hạn</Radio>
          </Radio.Group>
        </Form.Item>
        {timeType === "học kì" && (
          <Form.Item
            label="Chọn học kì"
            name="semester"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn học kì",
              },
            ]}
          >
            <Select placeholder="Chọn học kì">
              {listSemester.map((semester) => (
                <Option key={semester.id} value={semester.id}>
                  {semester.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        {timeType === "thời hạn" && (
          <>
            <Form.Item
              label="Thời gian bắt đầu"
              name="start"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian bắt đầu",
                },
                {
                  validator: validateStartDate,
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>

            <Form.Item
              label="Thời gian kết thúc"
              name="end"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian kết thúc",
                },
                {
                  validator: validateEndDate,
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </>
        )}

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
