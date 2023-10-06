import {
  FormOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Row,
  Segmented,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { ConversionAPI } from "../../../apis/censor/conversion/conversion.api";
import ModalDetailConversion from "../../student/RequestConversion/ModalDetail";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
import { useNavigate } from "react-router-dom";
import "./RequestConversion.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetConversion,
  SetConversion,
} from "../../../app/reducers/conversion/conversion.reducer";

export default function AddRequestConversion(props) {
  const requestConversion = props;
  const [listConversion, setListConversion] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    size: 5,
    textSearch: "",
  });
  const [fillCategory, setFillCategory] = useState([]);
  const [fillGift, setFillGift] = useState([]);
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [fillUserApi, setFillUserApi] = useState([]);
  const [fillPoint, setFillPoint] = useState({ point: 0 });
  const [categoryType, setCategoryType] = useState();
  const [inputNumberValue, setInputNumberValue] = useState(0);
  const [filteredConversions, setFilteredConversions] = useState([]);

  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [cardBackgroundColor, setCardBackgroundColor] = useState("#F8DA95");
  const [addDiscribe, setAddDiscribe] = useState([]);
  const [selectedGiftName, setSelectedGiftName] = useState("");

  const [form] = Form.useForm();
  form.setFieldsValue(requestConversion);

  let navigate = useNavigate();

  const dispatch = useAppDispatch();
  const data = useAppSelector(GetConversion);

  useEffect(() => {
    if (categoryType) {
      // Sử dụng categoryType để lọc danh sách dữ liệu
      const filteredData = listConversion.filter(
        (conversion) => conversion.categoryId === categoryType
      );
      setFilteredConversions(filteredData);
    } else {
      // Nếu không có categoryType hoặc categoryType không được chọn, hiển thị toàn bộ danh sách
      setFilteredConversions(listConversion);
    }
  }, [categoryType, listConversion]);

  useEffect(() => {
    fechCategory();
    fechGift();
  }, []);

  useEffect(() => {
    fechUserApiById();
  }, []);

  const getpointGift = parseInt(inputNumberValue) * 0.25;

  const onchageCtae = (value) => {
    setCategoryType(value);
    const data = {
      categoryId: value,
      studentId: fillUserApi.idUser,
    };
    getPoint(data);
    setSelectedConversion(null);
    setInputNumberValue("0");
  };

  const getPoint = (data) => {
    ResquestConversion.getPointHoney(data)
      .then((response) => {
        setFillPoint(response.data.data ? response.data.data : "0");
        console.log("Điểm từ API:", response.data.data);
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
      console.log(response.data.data.idUser);
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
      setCardBackgroundColor("#F8DA95"); // Đặt lại màu nền mặc định
    } else {
      setSelectedConversion(conversion);
      setSelectedCardIndex(index);
      setCardBackgroundColor("#CCCC99");
      const selectedGiftId = conversion.giftId;
      const selectedGift = fillGift.find((gift) => gift.id === selectedGiftId);
      setSelectedGiftName(selectedGift ? selectedGift.name : ""); // Set the selected gift name
    }
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const fetchData = (filter) => {
    ConversionAPI.fetchAllPage(filter).then((response) => {
      dispatch(SetConversion(response.data.data.data));
      setTotalPages(response.data.data.totalPages);
    });
  };

  useEffect(() => {
    fetchDataConversion();
  }, []);
  const fetchDataConversion = () => {
    ConversionAPI.fetchAllConversion().then((response) => {
      setListConversion(response.data.data);
    });
  };

  const onSubmitCreate = () => {
    // lấy  name gift theo id
    const selectedGiftId = selectedConversion
      ? selectedConversion.giftId
      : undefined;
    const selectedGift = fillGift.find((gift) => gift.id === selectedGiftId);
    const selectedGiftName = selectedGift ? selectedGift.name : "";

    if (!categoryType) {
      message.error("Vui lòng chọn loại điểm");
      return;
    }

    if (!selectedConversion) {
      message.error("Vui lòng chọn một mục trong danh sách chọn");
      return;
    } else if (
      (selectedConversion ? selectedConversion.ratio : 0) > fillPoint.point
    ) {
      message.error("Bạn không đủ điểm để đổi quà trong ranh này.");
      return;
    }
    console.log("Tên quà đã chọn:", selectedGiftName);
    const dataToAdd = {
      honeyId: fillPoint.id,
      studentId: fillUserApi.idUser,
      honeyPoint: parseInt(selectedConversion ? selectedConversion.ratio : 0),
      giftId: selectedConversion ? selectedConversion.giftId : 0,
      nameGift: selectedGiftName,
      categoryId: selectedConversion ? selectedConversion.categoryId : 0,
      note: addDiscribe,
    };
    createRequest(dataToAdd);
    console.log(dataToAdd);
  };

  const createRequest = (addRequest) => {
    ResquestConversion.createRequest(addRequest)
      .then((response) => {
        if (response.data.success) {
          message.success("Đổi quà thành công");
          navigate("/student/create-conversion/history");
        } else {
          message.error("Đổi qu thất bại!");
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

  // Function to get the name of the Gift based on its ID
  const getGiftNameById = (giftId) => {
    const gift = fillGift.find((item) => item.id === giftId);
    return gift ? gift.name : "";
  };
  const getGiftImageById = (giftId) => {
    const gift = fillGift.find((item) => item.id === giftId);
    return gift ? gift.image : "";
  };

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
      {/* <Button type="primary" onClick={showModal}>
          Quy đổi quà
        </Button> */}
      <Modal
        title="Điền tên giảng viên hướng dẫn "
        open={isModalOpen}
        onOk={onSubmitCreate}
        onCancel={handleCancel}
        // footer={null}
      >
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          style={{ width: "465px", height: "100px" }}
          onChange={(e) => setAddDiscribe(e.target.value)}
        />
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
              {filteredConversions.map((conversion, index) => (
                <Col
                  span={1.5}
                  className="colGift"
                  style={{
                    marginRight: "10px",

                    marginBottom: "10px",
                  }}
                >
                  <Tooltip
                    title={`${parseInt(conversion.ratio)} mật 
                    ${getCategoryNameById(
                      conversion.categoryId
                    )} để đổi 0.25 ${getGiftNameById(conversion.giftId)} `}
                    overlayStyle={{
                      color: "orange",
                      background: "gold !important",
                    }}
                  >
                    <div
                      className="gift"
                      onClick={() => {
                        handleAddToComboBox(conversion, index);
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
                      <img
                        src={require("../../../assets/images/gift.png")}
                        // src={require(`url(data:image/jpeg;base64,${btoa(
                        //   String.fromCharCode.apply(
                        //     null,
                        //     new Uint8Array(
                        //       getGiftImageById(conversion.giftId)
                        //         .split(",")
                        //         .map(Number)
                        //     )
                        //   )
                        // )})`)}
                        alt="Gift"
                        style={{ marginLeft: "75px", display: "block" }}
                        height={40}
                        width={40}
                      />
                      <span
                        style={{
                          fontWeight: "1000",
                          color: "rgb(165, 86, 0)",
                        }}
                      >
                        {" "}
                        {getGiftNameById(conversion.giftId)}
                      </span>

                      {/* {parseInt(conversion.ratio)} */}
                    </div>
                  </Tooltip>
                </Col>
              ))}
            </Row>
          </Card>
        </Card>
        <div style={{ textAlign: "center" }}>
          <Button
            className="btnXacNhan"
            style={{ marginTop: "20px" }}
            onClick={onSubmitCreate}
          >
            XÁC NHẬN
          </Button>
        </div>
      </Card>
    </>
  );
}
