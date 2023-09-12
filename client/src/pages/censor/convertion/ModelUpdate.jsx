import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { ConversionAPI } from "../../../apis/censor/conversion/conversion.api";
const ModalUpdateConversion = (props) => {
  const { conversion } = props;
  const [fillCategory, setFillCategory] = useState([]);
  const [fillGift, setFillGift] = useState([]);
  const [fillName, setFillName] = useState({ nameCate: "", nameGift: "" });
  const [pointGift, setPoinGift] = useState("");
  const [pointCategory, setPoinCategory] = useState("");
  const [selectPointGift, setSelectPoinGift] = useState("");
  const [selectPointCategory, setSelectPoinCategory] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectGift, setSelectGift] = useState("");

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
  const handleCategoryBlur = () => {
    setSelectPoinCategory(pointCategory);
  };

  const handleGiftBlur = () => {
    setSelectPoinGift(pointGift);
  };

  form.setFieldsValue(conversion);

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

  const handleConversationUpdate = async () => {
    const ratio = parseFloat(selectPointCategory) / parseFloat(selectPointGift);

    const code = `${fillName.nameCate}/${fillName.nameGift}${parseInt(
      Math.random() * 100000
    )}`;

    try {
      const dataToSend = {
        ratio: ratio,
        code: code,
        giftId: selectGift,
        categoryId: selectCategory,
      };

      await ConversionAPI.update(dataToSend, conversion.id);
      message.success("Update thành công");
      handleCancel(false);
      console.log("tỉ số và mã đã được lưu vào db");
    } catch (error) {
      message.error("update thất bại");
      console.log("lỗi khi lưu tỉ số và mã", error);
    }
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
                width: "32%",
                marginLeft: "20px",
              }}
              placeholder=""
              defaultValue={conversion.ratio}
              onChange={(e) => setPoinCategory(e.target.value)}
              onBlur={handleCategoryBlur}
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
              placeholder="Gift"
              optionFilterProp="children"
              style={{ width: "33%", marginRight: "20px" }}
              size="large"
              defaultValue={conversion.giftId}
              onChange={(value, label) => {
                setSelectGift(value);
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
              defaultValue={1}
              onChange={(e) => setPoinGift(e.target.value)}
              onBlur={handleGiftBlur}
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
          <form style={{ paddingLeft: "80px" }}>
            <div style={{ marginTop: "50px" }}>
              <div style={{ display: "block", marginBottom: "50px" }}>
                <span style={{ fontSize: "18px", marginRight: "100px" }}>
                  {fillName.nameCate}
                </span>
                <span style={{ fontSize: "18px" }}>{pointCategory}</span>
              </div>

              <div style={{ display: "block", marginBottom: "60px" }}>
                <span style={{ fontSize: "18px", marginRight: "100px" }}>
                  {fillName.nameGift}
                </span>
                <span style={{ fontSize: "18px" }}>{pointGift}</span>
              </div>
            </div>
            {selectPointCategory && selectPointGift && (
              <div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  Tỉ số thu được :
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    marginRight: "20px",
                  }}
                >
                  {selectPointCategory}/{selectPointGift}
                </span>
                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {fillName.nameCate}/{fillName.nameGift}
                  {/* {conversionCode} */}
                </span>
              </div>
            )}
          </form>
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
