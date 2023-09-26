import {
  FormOutlined,
  PlusCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
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
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
import { useNavigate } from "react-router-dom";

export default function AddRequestConversion(props) {
  const requestConversion = props;
  const [listConversion, setListConversion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchByName, setSearchByName] = useState("");
  const [fillCategory, setFillCategory] = useState([]);
  const [fillGift, setFillGift] = useState([]);
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [fillUserApi, setFillUserApi] = useState([]);
  const [fillPoint, setFillPoint] = useState({ point: 0 });
  const [categoryType, setCategoryType] = useState();
  const [inputNumberValue, setInputNumberValue] = useState(0);
  const [filteredConversions, setFilteredConversions] = useState([]);

  const [form] = Form.useForm();
  form.setFieldsValue(requestConversion);

  let navigate = useNavigate();

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
    setInputNumberValue("");
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
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };

  const fechGift = () => {
    GiftAPI.fetchAllGift().then((response) => {
      setFillGift(response.data.data);
    });
  };

  const handleAddToComboBox = (record) => {
    setSelectedConversion(record);
  };

  useEffect(() => {
    fetchData(currentPage - 1, searchByName);
  }, [currentPage, searchByName]);

  const handleOnChangePage = (page) => {
    fetchData(page - 1, searchByName);
    setCurrentPage(page);
  };

  const fetchData = (currentPage, searchByName) => {
    ConversionAPI.searchByName(currentPage, searchByName).then((response) => {
      setListConversion(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    });
  };

  const onSubmitCreate = () => {
    //lấy  name gift theo id
    const selectedGiftId = selectedConversion
      ? selectedConversion.giftId
      : undefined;
    const selectedGift = fillGift.find((gift) => gift.id === selectedGiftId);
    const selectedGiftName = selectedGift ? selectedGift.name : "";

    if (!fillCategory || !fillGift || !inputNumberValue) {
      message.error("bạn phải điền đầu đủ thông tin");
      return;
    } else if (
      (selectedConversion ? selectedConversion.ratio : 0) *
        parseInt(inputNumberValue) >
      fillPoint.point
    ) {
      message.error("Bạn không đủ điểm để đổi quà trong ranh này.");
      return;
    } else if (inputNumberValue <= 0) {
      message.error("gói quà phải >= 0");
      return;
    }

    console.log("Tên quà đã chọn:", selectedGiftName);
    const dataToAdd = {
      honeyId: fillPoint.id,
      studentId: fillUserApi.idUser,
      honeyPoint:
        parseInt(selectedConversion ? selectedConversion.ratio : 0) *
        parseInt(inputNumberValue),
      giftId: selectedConversion ? selectedConversion.giftId : 0,
      nameGift: selectedGiftName,
      categoryId: selectedConversion ? selectedConversion.categoryId : 0,
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

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tỉ lệ",
      dataIndex: "ratio",
      key: "ratio",
      render: (text, record) => (
        <span>
          {" "}
          {` ${parseInt(text)} điểm ${getCategoryNameById(
            record.categoryId
          )} đổi được 0.25 điểm ${getGiftNameById(record.giftId)}`}{" "}
        </span>
      ),
    },
    {
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record, index) => (
        <Space size="small">
          <ModalDetailConversion conversion={record} icon={<FormOutlined />} />
          <Tooltip title="Chọn">
            <Button onClick={() => handleAddToComboBox(record, index)}>
              <PlusCircleOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card className="mb-2">
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "10px", width: "40%" }}
              onChange={(e) => setSearchByName(e.target.value)}
              placeholder="Tìm kiếm tên hoặc mã..."
            />
          </div>
        </form>
      </Card>
      <Card
        className="content-card"
        title="Thông tin sinh viên"
        // extra={<Segmented className="font-bold select-category" />}
        extra={
          <Segmented
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
        <Row className="mx-10">
          <Col
            className="py-25"
            span={12}
            style={{ borderRight: "1px solid #F0F0F0" }}
          >
            <Row className="font-semibold">
              {Object.keys(fillUserApi).length > 0 ? (
                <>
                  <Col span={12}>
                    <div>
                      MSSV: <Tag>{fillUserApi.name}</Tag>
                    </div>
                    <div className="m-25">
                      Họ và tên: <Tag>{fillUserApi.userName}</Tag>
                    </div>
                    <div>
                      Email: <Tag>{fillUserApi.email}</Tag>
                    </div>
                  </Col>

                  <Col span={12}>
                    <div>
                      Số điểm:{" "}
                      <Tag>{fillPoint.point ? fillPoint.point : 0}</Tag>
                    </div>
                    <div className="m-25">
                      Khóa: <Tag>{fillUserApi.khoa}</Tag>
                    </div>
                    <div>
                      Số điện thoại: <Tag>{fillUserApi.phone}</Tag>
                    </div>
                  </Col>
                </>
              ) : (
                <div>Không có sv</div>
              )}
            </Row>
          </Col>
          <Col className="py-25" span={12} style={{ paddingLeft: "25px" }}>
            <Form>
              <Row>
                <Col span={14} className=" font-semibold">
                  <div>
                    Loại điểm:{" "}
                    <Select
                      disabled
                      showSearch
                      placeholder="Cayegory"
                      optionFilterProp="children"
                      style={{ width: "33%", marginLeft: "20px" }}
                      size="small"
                      value={
                        selectedConversion
                          ? selectedConversion.categoryId
                          : undefined
                      }
                      // onChange={(value, label) => {
                      //   setFillName({ ...fillName, nameGift: label.label });
                      // }}
                      options={fillCategory.map((item) => {
                        return { label: item.name, value: item.id };
                      })}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "7px",
                    }}
                  >
                    Loại quà:
                    <Select
                      disabled
                      showSearch
                      placeholder="Gift"
                      optionFilterProp="children"
                      style={{ width: "33%", marginLeft: "20px" }}
                      size="small"
                      value={
                        selectedConversion
                          ? selectedConversion.giftId
                          : undefined
                      }
                      // onChange={(value, label) => {
                      //   setFillName({ ...fillName, nameGift: label.label });
                      // }}
                      options={fillGift.map((item) => {
                        return { label: item.name, value: item.id };
                      })}
                    />
                  </div>
                </Col>

                <Col span={4} className=" font-semibold">
                  <div>
                    <div>
                      <Input
                        size="small"
                        style={{ height: "25px", width: "40px" }}
                        defaultValue={inputNumberValue}
                        onChange={(e) => setInputNumberValue(e.target.value)}
                      />
                      Gói quà
                    </div>
                  </div>
                  <div style={{ marginTop: "40px" }}>
                    <Tag>{getpointGift ? getpointGift : 0}</Tag> điểm
                  </div>
                </Col>
              </Row>

              <div className="text-right">
                <Button
                  htmlType="submit"
                  className="search-button"
                  type="dashed"
                  onClick={onSubmitCreate}
                >
                  Send
                  <SendOutlined className="m-0 pl-5" />
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <div className="mt-5">
          <Table
            columns={columns}
            dataSource={filteredConversions}
            rowKey="id"
            pagination={false}
          />
        </div>
        <div className="mt-5 text-center">
          <Pagination
            simple
            current={currentPage}
            onChange={handleOnChangePage}
            total={totalPages * 10}
          />
        </div>
      </Card>
    </>
  );
}
