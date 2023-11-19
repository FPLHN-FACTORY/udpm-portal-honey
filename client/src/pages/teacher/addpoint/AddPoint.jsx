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
  Tag,
  message,
  Select,
} from "antd";
import {
  SearchOutlined,
  SendOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { AddPointAPI } from "../../../apis/teacher/add-point/add-point.api";
// import { AddPointExcelAPI } from "../../../apis/teacher/add-point/add-point-excel.api";
import ModalImportExcel from "./ModalImportExcel";

export default function AddPoint() {
  const dispatch = useAppDispatch();
  const listCategory = useAppSelector(GetCategory);
  const [student, setStudent] = useState({});
  const [honeyStudent, setHoneyStudent] = useState({ honey: 0 });
  const [categorySelected, setCategorySelected] = useState();

  const [open, setOpen] = useState(false);

  const [nameFile, setNameFile] = useState("");

  const [formSearch] = Form.useForm();
  const [formAddPoint] = Form.useForm();

  useEffect(() => {
    AddPointAPI.getCategory().then((response) => {
      if (response === []) {
        setCategorySelected(response.data.data[0].id);
      }
      dispatch(SetCategory(response.data.data));
    });
  }, [dispatch]);

  const onFinishSearch = (value) => {
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
  };

  const onFinishAdd = (values) => {
    addPoint({
      ...values,
      honeyId: honeyStudent.id,
      studentId: student.id,
      categoryId: categorySelected,
    });
  };

  const addPoint = (data) => {
    AddPointAPI.addPoint(data)
      .then((response) => {
        if (response.data.success) {
          message.success("Đã gửi yêu cầu!");
          formAddPoint.resetFields();
          formSearch.resetFields();
          setStudent({});
        } else {
          message.error("Gửi yêu cầu thất bại!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getHoney = (studentId, categoryId) => {
    AddPointAPI.getHoney(studentId, categoryId)
      .then((response) => {
        if (response.data.success) {
          setHoneyStudent(response.data.data);
        } else {
          setHoneyStudent({ point: 0 });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  };

  return (
    <div className="add-point">
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
                message: "Vui lòng nhập mã sinh viên",
              },
            ]}
            className="search-input"
          >
            <Input
              size="small"
              placeholder="Nhập mã sinh viên cần tìm"
              prefix={<SearchOutlined />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="button-css"
              htmlFor="file-input"
              style={{
                marginLeft: "8px",
                padding: "10px",
              }}
              onClick={() => setOpen(true)}
            >
              <VerticalAlignBottomOutlined />
              Import Excel
            </Button>
            {open && (
              <ModalImportExcel
                open={open}
                setOpen={setOpen}
                nameFile={nameFile}
                setNameFile={setNameFile}
              />
            )}
          </Form.Item>
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
                    <Tag style={{ fontSize: "14px" }}>{honeyStudent.point}</Tag>
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
  );
}
