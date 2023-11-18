import { EyeFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
const ModalDetailConversion = (props) => {
  const { conversion } = props;
  const [fillCategory, setFillCategory] = useState([]);
  const [fillGift, setFillGift] = useState([]);
  const [fillName, setFillName] = useState({ nameCate: "", nameGift: "" });

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
  console.log(fillName.nameCate);

  form.setFieldsValue(conversion);

  console.log(fillCategory.name);

  const getId = conversion.categoryId;
  useEffect(() => {
    fechCategory();
    fechGift();
  }, []);

  const fechCategory = () => {
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };

  const fechGift = () => {
    GiftAPI.fetchAllGift().then((response) => {
      setFillGift(response.data.data);
    });
  };
  const getCategoryNameById = (categoryId) => {
    const category = fillCategory.find((item) => item.id === categoryId);
    return category ? category.name : "";
  };

  // Function to get the name of the Gift based on its ID
  const getGiftNameById = (giftId) => {
    const gift = fillGift.find((item) => item.id === giftId);
    return gift ? gift.name : "";
  };
  return (
    <>
      <Tooltip title="Chi tiết">
        <EyeFilled
          onClick={showModal}
          style={{ color: "#33CCCC" }}
          className="icon"
        />
      </Tooltip>
      <Modal
        title="Chi tiết quy đổi"
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
              disabled
              placeholder="Category"
              optionFilterProp="children"
              style={{ width: "33%", marginRight: "20px" }}
              size="large"
              value={conversion.categoryId}
              onChange={(e, label) => {
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
                width: "32%",
                marginLeft: "20px",
              }}
              placeholder=""
              value={conversion.ratio}
            />
            <span
              className="text-xl"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {" "}
              Điểm
            </span>
          </div>
          <div style={{ marginTop: "20px" }}>
            <span
              className="text-xl"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                marginRight: "10px",
                marginLeft: "36px",
              }}
            >
              {" "}
              Gift:
            </span>
            <Select
              showSearch
              disabled
              placeholder="Gift"
              optionFilterProp="children"
              style={{ width: "33%", marginRight: "20px" }}
              size="large"
              value={conversion.giftId}
              onChange={(value, label) => {
                setFillName({ ...fillName, nameGift: label.label });
              }}
              options={fillGift.map((item) => {
                return { label: item.name, value: item.id };
              })}
            />
            =
            <Input
              style={{
                borderRadius: "10px",
                width: "32%",
                marginLeft: "20px",
              }}
              placeholder=""
              value={0.25}
            />
            <span
              className="text-xl"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {" "}
              Điểm
            </span>
          </div>
          <h3 style={{ color: "red", textAlign: "center" }}>
            # Đổi {conversion.ratio} mật{" "}
            {getCategoryNameById(conversion.categoryId)} sẽ đổi được 0.25 điểm{" "}
            {getGiftNameById(conversion.giftId)}
          </h3>

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
              style={{ marginTop: "60px", marginLeft: "50px" }}
            >
              Đóng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDetailConversion;
