import React, { useEffect, useState } from "react";
import "./index.css";
import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  message,
  Select,
} from "antd";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { AddPointAPI } from "../../../apis/censor/add-point/add-point.api";
import ModalUpLoadFile from "./ModalUploadFile";
import { GetImport } from "../../../app/reducers/import/import.reducer";
import ModalConfirm from "../randomaddpoint/ModalConfirm";

export default function AddPoint() {
  const dispatch = useAppDispatch();
  const listCategory = useAppSelector(GetCategory);
  const [student, setStudent] = useState({});
  const [honeyStudent, setHoneyStudent] = useState({ honey: 0 });
  const [categorySelected, setCategorySelected] = useState();

  const [dataPreview, setDataPreview] = useState([]);

  const [loading, setLoading] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [formSearch] = Form.useForm();
  const [formAddPoint] = Form.useForm();

  const [nameFileUpload, setNameFileUpload] = useState("");
  const previewImport = useAppSelector(GetImport);

  useEffect(() => {
    setLoading(true);
    AddPointAPI.getCategory()
      .then((response) => {
        setCategorySelected(response.data.data[0].id);
        dispatch(SetCategory(response.data.data));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const onFinishSearch = (value) => {
    console.log("aaaa");
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

  const onFinishAdd = (values) => {
    setLoading(true);
    addPoint({
      ...values,
      honeyId: honeyStudent.id,
      studentId: student.id,
      categoryId: categorySelected,
    });
    setLoading(false);
  };

  const addPoint = (data) => {
    setLoading(true);
    AddPointAPI.addPoint(data).then((response) => {
      if (response.data.success) {
        message.success("Thành công!");
        formAddPoint.resetFields();
        formSearch.resetFields();
        setStudent({});
      } else {
        message.error("Thất bại!");
      }
    });
    setLoading(false);
  };

  const getHoney = (studentId, categoryId) => {
    setLoading(true);
    AddPointAPI.getHoney(studentId, categoryId)
      .then((response) => {
        if (response.data.success) {
          setHoneyStudent(response.data.data);
        } else {
          setHoneyStudent({ point: 0 });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClostPreview = () => {
    setDataPreview([]);
    setNameFileUpload("");
  };

  const columsPreview = [
    {
      title: "Mã sinh viên",
      dataIndex: "userName",
      key: "username",
      render: (_, record) => {
        return record.userName === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.userName}</span>
        );
      },
    },
    {
      title: "Vật phẩm",
      dataIndex: "lstGift",
      key: "lstGift",
      render: (_, record) => {
        return record.lstGift === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.lstGift}</span>
        );
      },
    },
    {
      title: "Mật ong",
      dataIndex: "lstHoney",
      key: "lstHoney",
      render: (_, record) => {
        return record.lstHoney === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.lstHoney}</span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "importMessage",
      key: "importMessage",
      render: (_, record) => {
        return record.error === false ? (
          <Tooltip title={record.importMessage}>
            <span style={{ color: "green" }}>Thành công</span>
          </Tooltip>
        ) : (
          <Tooltip title={record.importMessage}>
            <span style={{ color: "red" }}>Thất bại</span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="add-point">
        <Card className="mb-2 py-1">
          <Form form={formSearch} className="d-flex" onFinish={onFinishSearch}>
            <Row>
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
                    message: "Vui lòng nhập mã sinh viên",
                  },
                ]}
                className="search-input"
              >
                <Input
                  size="small"
                  placeholder="Nhập mã sinh viên cần tìm"
                  prefix={<SearchOutlined />}
                  style={{ width: 800, marginRight : 20}}
                />
              </Form.Item>

              <Button
                className="ml-auto import-button"
                type="primary"
                onClick={() => setOpenUpload(true)}
              >
                Import excel
              </Button>
              {openUpload && (
                <ModalUpLoadFile
                  openUpload={openUpload}
                  setOpenUpload={setOpenUpload}
                  setLoading={setLoading}
                  setDataPreview={setDataPreview}
                  nameFileUpload={nameFileUpload}
                  setNameFileUpload={setNameFileUpload}
                />
              )}
            </Row>
          </Form>
        </Card>
        {Object.keys(student).length > 0 ? (
          <Card className="content-card" title="Thông tin sinh viên">
            <Row className="mx-10">
              <Col
                className="py-25"
                span={12}
                style={{ borderRight: "1px solid #F0F0F0" }}
              >
                <Row className="font-semibold">
                  <Col span={24}>
                    <div>
                      Tài khoản:{" "}
                      <Tag style={{ fontSize: "14px" }}>{student.userName}</Tag>
                    </div>
                    <div className="mt-25">
                      Họ và tên:{" "}
                      <Tag style={{ fontSize: "14px" }}>{student.name}</Tag>
                    </div>
                    <div className="mt-25">
                      Email:{" "}
                      <Tag style={{ fontSize: "14px" }}>{student.email}</Tag>
                    </div>
                    <div className="mt-25">
                      Số điểm:{" "}
                      <Tag style={{ fontSize: "14px" }}>
                        {honeyStudent.point}
                      </Tag>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="py-25" span={12} style={{ paddingLeft: "25px" }}>
                <Form form={formAddPoint} onFinish={onFinishAdd}>
                  <Row>
                    <Col span={8} className=" font-semibold">
                      <div>Loại mật ong:</div>
                    </Col>
                    <Col span={16} className="mb-2">
                      <Select
                        showSearch
                        style={{
                          width: 200,
                        }}
                        onChange={(value) => {
                          setCategorySelected(value);
                          getHoney(student.id, value);
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={listCategory.map((category) => ({
                          label: category.name,
                          value: category.id,
                        }))}
                        defaultValue={listCategory[0].id}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} className=" font-semibold">
                      <div>Số điểm:</div>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name="honeyPoint"
                        rules={[
                          {
                            type: "number",
                            min: 1,
                            required: true,
                            message: "Số điểm phải là số và lớn hơn 0",
                          },
                          {
                            type: "number",
                            max: 999999,
                            message: "Số điểm phải nhỏ hơn 1.000.000",
                          },
                        ]}
                      >
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8} className=" font-semibold">
                      <div>Lý do:</div>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        name="note"
                        rules={[
                          {
                            required: true,
                            pattern: /^\s*(\S\s*){5,}$/,
                            message: "Lý do cộng phải trên 5 ký tự",
                          },
                          {
                            max: 100,
                            message: "Lý do không được vượt quá 100 ký tự",
                          },
                        ]}
                      >
                        <Input.TextArea style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button
                      htmlType="submit"
                      className="search-button"
                      type="primary"
                    >
                      Send
                      <SendOutlined className="m-0 pl-5" />
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Card>
        ) : (
          <Card>
            <Empty />
          </Card>
        )}
      </div>
      {dataPreview.length > 0 && (
        <Card style={{ borderTop: "5px solid #FFCC00", marginTop: "32px" }}>
          <Space
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: "24px",
            }}
          >
            <div>
              <b style={{ fontSize: "25px" }}>Dữ liệu import</b>
            </div>
            <div>
              <span>
                {previewImport && (
                  <b style={{ fontSize: "15px" }}>
                    <span style={{ color: "#FFCC00" }}>Tổng: </span>
                    {previewImport.total} -
                    <span style={{ color: "green" }}> Thành công: </span>
                    {previewImport.totalSuccess} -
                    <span style={{ color: "red" }}> Lỗi: </span>
                    {previewImport.totalError}
                  </b>
                )}
              </span>
            </div>
          </Space>
          <Table
            dataSource={dataPreview}
            columns={columsPreview}
            pagination={false}
          />
          <Space
            style={{
              justifyContent: "right",
              display: "flex",
              marginTop: "32px",
            }}
          >
            <Button className="button-css" onClick={() => handleClostPreview()}>
              Đóng
            </Button>
            <Button
              disabled={previewImport.totalError < 1 ? false : true}
              className="button-css"
              onClick={() => setOpenConfirm(true)}
            >
              Thêm
            </Button>
            {openConfirm && (
              <ModalConfirm
                dataPreview={dataPreview}
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                setDataPreview={setDataPreview}
                setNameFileUpload={setNameFileUpload}
              />
            )}
          </Space>
        </Card>
      )}
    </Spin>
  );
}
