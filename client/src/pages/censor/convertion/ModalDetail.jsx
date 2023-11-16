import { EyeFilled } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
const ModalDetailConversion = (props) => {
  const { conversion } = props;
  const [fillCategory, setFillCategory] = useState([]);
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

  form.setFieldsValue(conversion);

  useEffect(() => {
    fechCategory();
  }, []);

  const fechCategory = () => {
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };

  const getCategoryNameById = (categoryId) => {
    const category = fillCategory.find((item) => item.id === categoryId);
    return category ? category.name : "";
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
                style={{
                  borderRadius: "10px",
                  width: "58%",
                  marginLeft: "20px",
                }}
                placeholder="Enter code"
                defaultValue={conversion.code}
                disabled
              />
            </div>
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
              style={{ width: "30%", marginRight: "20px" }}
              size="large"
              value={conversion.categoryId}
              onChange={(e, label) => {
                setFillName({ ...fillName, nameCate: label.label });
              }}
              options={fillCategory.map((item) => {
                return { label: item.name, value: item.id };
              })}
              disabled
            />
            =
            <Input
              style={{
                borderRadius: "10px",
                width: "18%",
                marginLeft: "20px",
              }}
              placeholder=""
              value={conversion.ratio}
              disabled
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

          <div style={{ marginTop: "20px" }}>
            <h3 style={{ color: "red", textAlign: "center" }}>
              # Đổi {conversion.ratio} mật{" "}
              {getCategoryNameById(conversion.categoryId)} sẽ được quy đổi bằng
              1 điểm
            </h3>
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
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDetailConversion;
