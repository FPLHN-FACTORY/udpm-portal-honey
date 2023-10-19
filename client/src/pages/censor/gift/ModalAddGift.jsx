import { Form, Input, Modal, Radio, Select, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { AddGift } from "../../../app/reducers/gift/gift.reducer";
import { useState, useEffect } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import TextArea from "antd/es/input/TextArea";
import "./index.css";
import { SemesterAPI } from "../../../apis/censor/semester/semester.api";

const ModalThem = (props) => {
  const onFinishFailed = () => {
    message.error("Lỗi");
  };

  const { modalOpen, setModalOpen, gift, onSave, fetchData } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [image, setImage] = useState([]);
  const [quantityValue, setQuantityValue] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const [timeType, setTimeType] = useState("vĩnh viễn");
  const [listSemester, setListSemester] = useState([]);

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

  form.setFieldsValue(gift);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCategory();
    fetchSemester();
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

  const fetchSemester = () => {
    SemesterAPI.fetchAllSemester().then((response) => {
      setListSemester(response.data.data);
    });
  };

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

  // const validateImage = (rule, value) => {
  //   if (!value) {
  //     return Promise.reject("Vui lòng chọn một hình ảnh.");
  //   }
  //   return Promise.resolve();
  // };

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

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        let quantity = null;

        let fromDate = null;
        let toDate = null;
        let semesterId = null;
        if (quantityValue === 1) {
          quantity = parseInt(formValues.quantityLimit, 10);
        }

        if (timeType === "học kì") {
          const selectedSemester = listSemester.find(
            (semester) => semester.id === formValues.semester
          );

          if (selectedSemester) {
            fromDate = selectedSemester.fromDate;
            toDate = selectedSemester.toDate;
            semesterId = selectedSemester.id;
          }
        } else if (timeType === "thời hạn") {
          fromDate = formValues.start
            ? new Date(formValues.start).getTime()
            : null;
          toDate = formValues.end ? new Date(formValues.end).getTime() : null;
        }

        if (isNaN(quantity) && quantityValue === 1) {
          message.error("Vui lòng nhập số lượng giới hạn hợp lệ.");
          return;
        }

        GiftAPI.create({
          ...formValues,
          image: image,
          quantity: quantity,
          fromDate: timeType === "vĩnh viễn" ? null : fromDate,
          toDate: timeType === "vĩnh viễn" ? null : toDate,
          semesterId: semesterId,
        })
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
    >
      <hr className="border-0 bg-gray-300 mt-3 mb-6" />
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
          quantity: quantityValue,
          quantityLimit: 1,
          timeType: "vĩnh viễn",
        }}
        autoComplete="off"
      >
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
              {
                validator: validateQuantity,
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        )}
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
          label="Loại mật quy đổi"
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
          label="Số mật ong quy đổi"
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
            <Radio value={"vĩnh viễn"}>Vĩnh viễn</Radio>
            <Radio value={"học kì"}>Học kì</Radio>
            <Radio value={"thời hạn"}>Thời hạn</Radio>
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
          label="Yêu cầu phê duyệt"
          name="status"
          initialValue={1}
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
            name="note"
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
