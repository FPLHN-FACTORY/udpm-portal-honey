import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Result,
  Select,
  Tooltip,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { ConversionAPI } from "../../../apis/censor/conversion/conversion.api";
import { useAppDispatch } from "../../../app/hooks";
import { UpdateConversion } from "../../../app/reducers/conversion/conversion.reducer";
const ModalUpdateConversion = (props) => {
  const { conversion } = props;
  const [fillCategory, setFillCategory] = useState([]);
  const [fillName, setFillName] = useState({ nameCate: "", nameGift: "" });
  const [pointCategory, setPoinCategory] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  form.setFieldsValue(conversion);

  useEffect(() => {
    fechCategory();
  }, []);

  const fechCategory = () => {
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };

  const handleConversationUpdate = async () => {
    if (!pointCategory) {
      message.error("không được để trống");
      return;
    } else if (pointCategory < 0) {
      message.error("Điểm phải dương");
      return;
    }

    const ratio = parseFloat(pointCategory);

    const dataToSend = {
      ratio: ratio,
      code: code,
      categoryId: selectCategory,
    };
    await ConversionAPI.update(dataToSend, conversion.id)
      .then((result) => {
        dispatch(UpdateConversion(result.data.data));
        message.success("Update thành công");
        handleCancel(false);
      })
      .catch((error) => {
        if (error.message && error.message.data && error.message.data.message) {
          message.error(error.response.data.message);
        } else {
          message.error("lỗi");
        }
      });
  };
  return (
    <>
      <Tooltip title="Update">
        <EditOutlined
          onClick={showModal}
          style={{ color: "#FF3300" }}
          className="icon"
        />
      </Tooltip>
      <Modal
        title="Cập nhật quy đổi"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          onFinish={handleOk}
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div style={{ marginBottom: "20px", marginTop: "30px" }}>
            <span
              className="text-xl"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                marginRight: "18px",
              }}
            >
              {" "}
              Code:
            </span>

            <Input
              style={{ borderRadius: "10px", width: "58%", marginLeft: "20px" }}
              placeholder="Enter code"
              defaultValue={conversion.code}
              onBlur={(e) => setCode(e.target.value)}
            />
          </div>
          <div>
            <span
              className="text-xl"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                marginRight: "10px",
              }}
            >
              {" "}
              Category:
            </span>
            <Select
              showSearch
              placeholder="Category"
              optionFilterProp="children"
              style={{ width: "33%", marginRight: "20px" }}
              size="large"
              defaultValue={conversion.categoryId}
              onChange={(e, label) => {
                setSelectCategory(e);
                setFillName({ ...fillName, nameCate: label.label });
              }}
              options={fillCategory.map((item) => {
                return { label: item.name, value: item.id };
              })}
            />
            =
            <Input
              style={{
                borderRadius: "10px",
                width: "18%",
                marginLeft: "20px",
              }}
              placeholder=""
              defaultValue={conversion.ratio}
              onChange={(e) => setPoinCategory(e.target.value)}
            />
            <span
              className="text-xl"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {" "}
              Mật ong
            </span>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              onClick={handleCancel}
              className="bg-#1d4ed8-400 text-white"
              style={{ marginTop: "30px", marginLeft: "50px" }}
            >
              Đóng
            </Button>
            <Button
              type="primary"
              onClick={handleConversationUpdate}
              className="bg-#1d4ed8-400 text-white"
              style={{ marginLeft: "20px", backgroundColor: "#FF9900" }}
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalUpdateConversion;
