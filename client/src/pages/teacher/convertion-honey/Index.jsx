import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Tag,
  Tooltip,
  Space,
  Table,
  Pagination,
  Segmented,
  message,
  InputNumber,
  Empty,
} from "antd";
import {
  SearchOutlined,
  SendOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { AddPointAPI } from "../../../apis/teacher/add-point/add-point.api";
import { ConvertionHoneyAPI } from "../../../apis/teacher/convertion-honey/convertion-honey.api";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";

export default function ConvertionHoney() {
  const dispatch = useAppDispatch();
  const [totalPages, setTotalPages] = useState(0);
  const [listConversion, setListConversion] = useState([]);
  const [selectedGiftId, setSelectedGiftId] = useState();
  const [selectedRatio, setSelectedRatio] = useState();
  const [quantityGift, setQuantityGift] = useState(0);
  const [selectedConvertion, setSelectedConvertion] = useState({});
  const listCategory = useAppSelector(GetCategory);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filter, setFilter] = useState({ page: 0 });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fillCategory, setFillCategory] = useState([]);
  const [student, setStudent] = useState({});
  const [honeyStudent, setHoneyStudent] = useState({ honey: 0 });
  const [giftOptions, setGiftOptions] = useState([]);
  const [categorySelected, setCategorySelected] = useState();
  const [loading, setLoading] = useState(false);
  const [formSearch] = Form.useForm();
  const [formAddPoint] = Form.useForm();

  useEffect(() => {
    AddPointAPI.getCategory().then((response) => {
      setCategorySelected(response.data.data[0].id);
      dispatch(SetCategory(response.data.data));
    });
  }, [dispatch]);

  useEffect(() => {
    getHoney(student.id, categorySelected);
  }, [categorySelected, student, formSearch]);

  useEffect(() => {
    fechCategory();
  }, []);

  useEffect(() => {
    fetchData(categorySelected);
    setSelectedGiftId(null);
    setSelectedCategoryId(null);
  }, [categorySelected]);

  const onFinishSearch = (value) => {
    setLoading(true);
    AddPointAPI.searchStudent(value.code.trim()).then((response) => {
      if (response.data.success) {
        setStudent(response.data.data);
        getHoney(response.data.data.id, categorySelected);
      } else {
        setStudent({});
        formSearch.setFields([
          {
            name: "code",
            errors: ["Không tìm thấy thông tin sinh viên!"],
          },
        ]);
      }
    });
    setLoading(false);
  };

  const getHoney = (studentId, categoryId) => {
    AddPointAPI.getHoney(studentId, categoryId)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.success) {
          setHoneyStudent(response.data.data);
        } else {
          setHoneyStudent({ point: 0 });
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchData = () => {
    ConvertionHoneyAPI.getConvertion(categorySelected).then((response) => {
      console.log(categorySelected);
      setListConversion(response.data.data.data);
      setTotalPages(response.data.data.totalPages);
    });
  };

  useEffect(() => {
    CategoryAPI.fetchAll().then((response) => {
      const categories = response.data.data.data.map((category) => ({
        label: category.name,
        value: category.id,
      }));
      setCategoryOptions(categories);
    });

    GiftAPI.fetchAllGift().then((response) => {
      const gifts = response.data.data.map((gift) => ({
        label: gift.name,
        value: gift.id,
      }));
      setGiftOptions(gifts);
    });
  }, []);

  const fechCategory = () => {
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };

  const handleSelectButtonClick = (record) => {
    if (record) {
      setSelectedConvertion(record);
      setSelectedCategoryId(record.categoryId);
      setSelectedGiftId(record.giftId);
      setSelectedRatio(record.ratio);
    }
  };

  const handleAddConvertion = async () => {
    const calculatedHoneyPoint = selectedRatio * quantityGift;

    if (calculatedHoneyPoint > honeyStudent.point) {
      message.error("Không đủ điểm để đổi.");
      return;
    }

    const dataAddConvertion = {
      honeyPoint: calculatedHoneyPoint,
      giftId: selectedGiftId,
      studentId: student.id,
      categoryId: selectedCategoryId,
    };

    try {
      await ConvertionHoneyAPI.addConvertion(dataAddConvertion).then(() => {
        message.success("Đổi quà thành công");
        const newHoneyPoint = honeyStudent.point - calculatedHoneyPoint;
        setHoneyStudent({ point: newHoneyPoint });
      });
    } catch (error) {
      message.error("Có lỗi xảy ra khi đổi quà");
      console.error(error);
    }
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
    },
    {
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chọn">
            <Button onClick={() => handleSelectButtonClick(record)}>
              <PlusCircleOutlined />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card className="mb-2 py-1">
        <Form form={formSearch} className="d-flex" onFinish={onFinishSearch}>
          <Button
            htmlType="submit"
            type="primary"
            className="mr-10 search-button"
          >
            Search
          </Button>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Vui lòng nhập user name sinh viên",
              },
            ]}
            className="search-input"
          >
            <Input
              size="small"
              placeholder="Nhập user name sinh viên..."
              style={{ width: "250px", marginTop: "20px" }}
              prefix={<SearchOutlined />}
            />
          </Form.Item>

          <Button className="ml-auto import-button" type="primary">
            Import excel
          </Button>
        </Form>
      </Card>
      {Object.keys(student).length > 0 ? (
        <div>
          <Card
            className="content-card"
            title="Thông tin sinh viên"
            extra={
              <Segmented
                className="font-bold select-category"
                onChange={setCategorySelected}
                value={categorySelected}
                options={listCategory.map((category) => ({
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
                  <Col span={12}>
                    <div>
                      User name: <Tag>{student.userName}</Tag>
                    </div>
                    <div className="m-25">
                      Họ và tên: <Tag>{student.name}</Tag>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      Email: <Tag>{student.email}</Tag>
                    </div>
                    <div className="m-25">
                      Số điểm: <Tag>{honeyStudent.point}</Tag>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="py-25" span={12} style={{ paddingLeft: "25px" }}>
                <Form form={formAddPoint}>
                  <Row>
                    <Col span={14} className=" font-semibold">
                      <div>
                        Loại điểm:{" "}
                        <Select
                          disabled
                          showSearch
                          optionFilterProp="children"
                          style={{ width: "33%", marginLeft: "20px" }}
                          size="small"
                          options={categoryOptions}
                          value={selectedCategoryId}
                          onChange={(value) => setSelectedCategoryId(value)}
                        />
                      </div>
                      <div
                        style={{
                          marginTop: "30px",
                          marginLeft: "7px",
                        }}
                      >
                        Loại quà:
                        <Select
                          disabled
                          showSearch
                          optionFilterProp="children"
                          style={{ width: "33%", marginLeft: "20px" }}
                          size="small"
                          options={giftOptions}
                          onChange={(value) => setSelectedGiftId(value)}
                          value={selectedGiftId}
                        />
                      </div>
                    </Col>
                    <Col span={4} className=" font-semibold">
                      <div
                        style={{ display: "inline-flex", alignItems: "center" }}
                      >
                        <InputNumber
                          min={0}
                          max={10}
                          value={quantityGift}
                          placeholder="Quà"
                          onChange={(value) => setQuantityGift(value)}
                          style={{
                            width: "65px",
                            marginRight: "10px",
                          }}
                        />
                        <span style={{ fontSize: "14px" }}>gói</span>{" "}
                      </div>
                      <div style={{ marginTop: "25px" }}>
                        <Tag>{quantityGift * 0.25}</Tag> điểm
                      </div>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button
                      htmlType="submit"
                      className="search-button"
                      onClick={handleAddConvertion}
                      type="dashed"
                    >
                      Send
                      <SendOutlined className="m-0 pl-5" />
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Card>

          <Card
            style={{ marginTop: "20px" }}
            className="content-card"
            title="Hình thức quy đổi"
          >
            <div className="mt-5">
              <Table
                columns={columns}
                dataSource={listConversion}
                rowKey="id"
                pagination={false}
              />
            </div>
            <div className="mt-5 text-center">
              <Pagination
                simple
                current={filter.page + 1}
                onChange={(page) => {
                  setFilter({ ...filter, page: page - 1 });
                }}
                total={totalPages * 10}
                style={{ marginTop: "20px" }}
              />
            </div>
          </Card>
        </div>
      ) : (
        <Card>
          <Empty />
        </Card>
      )}
    </>
  );
}
