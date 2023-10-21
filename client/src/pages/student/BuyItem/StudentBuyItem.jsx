import React, { useEffect, useState } from "react";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
import { useNavigate } from "react-router-dom";
import "./StudentBuyItem.css";
import {
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Segmented,
  Tag,
  Tooltip,
  message,
} from "antd";
import { StarTwoTone } from "@ant-design/icons";

export default function StudentBuyItem(props) {
  const requestConversion = props;
  const [fillCategory, setFillCategory] = useState([]);
  const [fillGift, setFillGift] = useState([]);
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [fillUserApi, setFillUserApi] = useState([]);
  const [fillPoint, setFillPoint] = useState({ point: 0 });
  const [categoryType, setCategoryType] = useState();
  const [filteredConversions, setFilteredConversions] = useState([]);

  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [cardBackgroundColor, setCardBackgroundColor] = useState("#F8DA95");
  const [addDiscribe, setAddDiscribe] = useState("");
  const [selectedGiftNote, setSelectedGiftNote] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(0);

  function ImageRenderer({ image }) {
    const byteArray = image ? image.split(",").map(Number) : [];
    const base64ImageData = btoa(
      String.fromCharCode.apply(null, new Uint8Array(byteArray))
    );
    const imageUrl = `data:image/jpeg;base64,${base64ImageData}`;

    return (
      <img
        src={imageUrl}
        style={{ width: "40px", height: "40px" }}
        alt="Hình ảnh"
      />
    );
  }

  const [form] = Form.useForm();
  form.setFieldsValue(requestConversion);

  let navigate = useNavigate();

  useEffect(() => {
    if (categoryType) {
      const filteredData = fillGift.filter(
        (gift) => gift.honeyCategoryId === categoryType
      );
      setFilteredConversions(filteredData);
    } else {
      setFilteredConversions(fillGift);
    }
  }, [categoryType, fillGift]);

  useEffect(() => {
    fechCategory();
    fechGift();
  }, []);

  useEffect(() => {
    fechUserApiById();
  }, []);

  const onchageCtae = (value) => {
    setCategoryType(value);
    const data = {
      categoryId: value,
      studentId: fillUserApi.idUser,
    };
    getPoint(data);
    setSelectedConversion(null);
    const selectedCategory = fillCategory.find(
      (category) => category.id === value
    );

    if (selectedCategory) {
      const newCategoryStatus = selectedCategory.categoryStatus;
      console.log(`Status category : ${newCategoryStatus}`);
      setCategoryStatus(newCategoryStatus);
    }
  };

  const getPoint = (data) => {
    ResquestConversion.getPointHoney(data)
      .then((response) => {
        setFillPoint(response.data.data ? response.data.data : "0");
      })
      .catch((error) => console.log(error));
  };

  const fechUserApiById = () => {
    ResquestConversion.getUserAPiByid().then((response) => {
      setFillUserApi({
        ...response.data.data,
        khoa: "17.3",
        phone: "0763104018",
      });
    });
  };

  const fechCategory = () => {
    ResquestConversion.fetchAllCategory().then((response) => {
      setFillCategory(response.data.data);
    });
  };

  const fechGift = () => {
    GiftAPI.fetchAllGift().then((response) => {
      setFillGift(response.data.data);
    });
  };

  const handleAddToComboBox = (conversion, index) => {
    setSelectedConversion(conversion);
    if (selectedCardIndex === index) {
      setSelectedCardIndex(-1);
      setCardBackgroundColor("#F8DA95");
    } else {
      setSelectedConversion(conversion);
      setSelectedCardIndex(index);
      setCardBackgroundColor("#CCCC99");
      setSelectedGiftNote(conversion.note);
    }
  };

  useEffect(() => {
    fechGift();
  }, []);

  const onSubmitCreate = () => {
    if (!categoryType) {
      message.error("Vui lòng chọn loại điểm");
      return;
    }

    if (!selectedConversion) {
      message.error("Vui lòng chọn một mục trong danh sách chọn");
      return;
    } else if (!addDiscribe.trim()) {
      message.error("Bạn chưa nhập mô tả");
      return;
    } else if (
      (selectedConversion ? selectedConversion.honey : 0) > fillPoint.point
    ) {
      message.error("Bạn không đủ điểm để đổi quà trong ranh này.");
      return;
    }

    const dataToAdd = {
      honeyId: fillPoint.id,
      studentId: fillUserApi.idUser,
      honeyPoint: parseInt(selectedConversion ? selectedConversion.honey : 0),
      giftId: selectedConversion ? selectedConversion.id : 0,
      nameGift: selectedConversion.name,
      honeyCategoryId: selectedConversion
        ? selectedConversion.honeyCategoryId
        : 0,
      note: addDiscribe,
    };
    createRequest(dataToAdd);
  };

  const createRequest = (addRequest) => {
    ResquestConversion.createRequest(addRequest)
      .then((response) => {
        if (response.data.success) {
          message.success("Đổi quà thành công");
          navigate("/student/create-conversion/history");
        } else {
          message.error("Đổi quà thất bại!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategoryNameById = (categoryId) => {
    const category = fillCategory.find((item) => item.id === categoryId);
    return category ? category.name : "";
  };

  const getGiftNameById = (giftId) => {
    const gift = fillGift.find((item) => item.id === giftId);
    return gift ? gift.name : "";
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(categoryStatus);

  return (
    <>
      <Modal
        title="Nhập mô tả"
        open={isModalOpen}
        onOk={onSubmitCreate}
        onCancel={handleCancel}
        footer={null}
      >
        <textarea
          autoFocus
          name=""
          id=""
          cols="30"
          rows="10"
          style={{ width: "465px", height: "100px" }}
          onChange={(e) => setAddDiscribe(e.target.value)}
        />
        {selectedGiftNote && (
          <div>
            <h4 style={{ color: "red" }}>
              *Sinh viên phải nhập mô tả theo định dạng sau:
            </h4>
            <p>{selectedGiftNote}</p>
          </div>
        )}
        <div style={{ textAlign: "center" }}>
          <Button
            className="btnXacNhan"
            style={{ marginTop: "20px" }}
            onClick={onSubmitCreate}
          >
            XÁC NHẬN
          </Button>
        </div>
      </Modal>
      <Card style={{ marginTop: "20px" }} className="cartAllConversion">
        <p style={{ fontSize: "20px", fontWeight: "700", color: "#A55600" }}>
          <img
            src={require("../../../assets/images/honey.png")}
            alt="Gift"
            height={30}
            width={30}
          />
          Phần quà tự chọn
          <img
            src={require("../../../assets/images/honey.png")}
            alt="Gift"
            height={30}
            width={30}
          />
        </p>
        <Card
          title={
            <Tag className="point">
              {fillPoint.point ? fillPoint.point : parseInt(0)}
            </Tag>
          }
          style={{ marginTop: "20px", backgroundColor: "#ECBB5E" }}
          className="cardAll"
          extra={
            <Segmented
              style={{
                border: "3px solid #5C2400",
                backgroundColor: "#DC8C72",
                color: "black",
              }}
              className="font-bold select-category"
              onChange={(value) => onchageCtae(value)}
              value={categoryType}
              options={fillCategory.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          }
        >
          <Card style={{ background: "#00BFFF", height: "30px" }}></Card>

          <Card
            style={{ background: "#F8DA95", height: "300px" }}
            className="cardGift"
          >
            <Row justify="start">
              {filteredConversions.map((gift, index) => (
                <Col
                  span={1.5}
                  className="colGift"
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Tooltip
                    title={() => {
                      if (categoryStatus === 0 && gift.status === 0) {
                        return `${parseInt(gift.honey)} mật 
                          ${getCategoryNameById(gift.honeyCategoryId)} để đổi ${
                          gift.name
                        } (Không phê duyệt)`;
                      } else if (categoryStatus === 1 || gift.status === 1) {
                        return `${parseInt(gift.honey)} mật 
                          ${getCategoryNameById(gift.honeyCategoryId)} để đổi ${
                          gift.name
                        } (Cần phê duyệt)`;
                      } else {
                        return `${parseInt(gift.honey)} mật 
                          ${getCategoryNameById(gift.honeyCategoryId)} để đổi ${
                          gift.name
                        }`;
                      }
                    }}
                    overlayStyle={{
                      color: "orange",
                      background: "gold !important",
                    }}
                    categoryType={categoryType}
                  >
                    <div
                      className="gift"
                      onClick={() => {
                        handleAddToComboBox(gift, index);
                        showModal(true);
                      }}
                      style={{
                        backgroundColor:
                          selectedCardIndex === index
                            ? cardBackgroundColor
                            : "",
                        boxShadow:
                          selectedCardIndex === index
                            ? "0px 0px 10px gold"
                            : "",
                      }}
                    >
                      <ImageRenderer image={gift.image} />
                      {categoryStatus === 1 || gift.status === 1 ? (
                        <StarTwoTone
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            fontSize: "18px",
                            color: "red",
                          }}
                        />
                      ) : null}
                    </div>
                  </Tooltip>
                </Col>
              ))}
            </Row>
          </Card>
        </Card>
      </Card>
    </>
  );
}