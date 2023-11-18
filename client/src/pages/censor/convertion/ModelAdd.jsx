import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { ConversionAPI } from "../../../apis/censor/conversion/conversion.api";
import { useAppDispatch } from "../../../app/hooks";
import {
  AddConversion,
  SetConversion,
} from "../../../app/reducers/conversion/conversion.reducer";
import ModalAddCategory from "./ModalAddCategory";

const ModalAddConversion = ({ loadData }) => {
  const dispatch = useAppDispatch();
  const [showModal1, setShowModal] = useState(false);
  const [detailCategory, setDetailCategory] = useState();
  const [fillCategory, setFillCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [pointCategory, setPoinCategory] = useState("");
  const [code, setCode] = useState("");
  const [fillName, setFillName] = useState({ nameCate: "", nameGift: "" });

  useEffect(() => {
    fechCategory();
  }, []);

  const fechCategory = () => {
    ConversionAPI.fetchAllCategory().then((response) => {
      setFillCategory(response.data.data);
    });
  };

  const handleConversation = async () => {
    if (!selectCategory || !pointCategory) {
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

    await ConversionAPI.add(dataToSend)
      .then((result) => {
        dispatch(AddConversion(result.data.data));
        message.success("Add thành công");
        handleCancel(false);
        loadData();
      })
      .catch((error) => {
        if (error.message && error.message.data && error.message.data.message) {
          message.error(error.response.data.message);
        } else {
        }
      });
  };

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
  return (
    <>
      <ModalAddCategory
        modalOpen={showModal1}
        setModalOpen={setShowModal}
        category={detailCategory}
        SetCategory={setDetailCategory}
      />

      <Tooltip title="Add">
        <Button
          className="add-button"
          style={{ padding: "1px 0.7rem", color: "white" }}
          onClick={showModal}
        >
          <PlusOutlined className="icon" />
          Thêm quy đổi
        </Button>
      </Tooltip>
      <Modal
        title="Thêm mới quy đổi"
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
              <div
                style={{
                  marginBottom: "18px",
                }}
              >
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
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                placeholder=""
                optionFilterProp="children"
                style={{ width: "30%", marginRight: "20px" }}
                size="large"
                value={selectCategory}
                onChange={(value, label) => {
                  setSelectCategory(value);
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
                value={pointCategory}
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
            <div>
              <div>
                <div>
                  <Tooltip title="Thêm thể loại">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setDetailCategory(null);
                      }}
                      style={{ border: "none", background: "none" }}
                    >
                      <PlusOutlined className="mr-1" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <form style={{ marginTop: "20px" }}>
            {pointCategory && (
              <div>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  Kết quả sau khi quy đổi:
                </span>
                <span
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {pointCategory} mật ong loại {fillName.nameCate} / 1 điểm
                </span>
              </div>
            )}
          </form>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            style={{ marginTop: "30px" }}
          >
            <Button
              type="primary"
              onClick={handleCancel}
              className="bg-#1d4ed8-400 text-white"
            >
              Đóng
            </Button>

            <Button
              type="primary"
              onClick={handleConversation}
              className="bg-#1d4ed8-400 text-white"
              style={{ marginLeft: "20px", backgroundColor: "#FF9900" }}
            >
              Quy đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAddConversion;
