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
  Segmented,
  Spin,
  Tag,
  message,
} from "antd";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { AddPointAPI } from "../../../apis/teacher/add-point/add-point.api";

export default function AddPoint() {
  const dispatch = useAppDispatch();
  const listCategory = useAppSelector(GetCategory);
  const [student, setStudent] = useState({});
  const [honeyStudent, setHoneyStudent] = useState({ honey: 0 });
  const [categorySelected, setCategorySelected] = useState();

  const [loading, setLoading] = useState(false);

  const [formSearch] = Form.useForm();
  const [formAddPoint] = Form.useForm();

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

  useEffect(() => {
    getHoney(student.id, categorySelected);
  }, [categorySelected, student, formSearch]);

  const onFinishSearch = (value) => {
    setLoading(true);
    AddPointAPI.getUserAPiByCode(value.code.trim()).then((response) => {
      if (response.data.success) {
        setStudent({
          ...response.data.data,
          khoa: "17.3",
          phone: "0987654321",
        });
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
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading}>
      <div className="add-point">
        <Card className="mb-2 py-1">
          <Form form={formSearch} className="d-flex" onFinish={onFinishSearch}>
            <Button
              htmlType="submit"
              type="primary"
              className="mr-10 search-button">
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
              className="search-input">
              <Input
                size="small"
                placeholder="Nhập mã sinh viên cần tìm"
                prefix={<SearchOutlined />}
              />
            </Form.Item>

            <Button className="ml-auto import-button" type="primary">
              Import excel
            </Button>
          </Form>
        </Card>
        {Object.keys(student).length > 0 ? (
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
            }>
            <Row className="mx-10">
              <Col
                className="py-25"
                span={12}
                style={{ borderRight: "1px solid #F0F0F0" }}>
                <Row className="font-semibold">
                  <Col span={12}>
                    <div>
                      MSSV: <Tag>{student.code}</Tag>
                    </div>
                    <div className="m-25">
                      Họ và tên: <Tag>{student.name}</Tag>
                    </div>
                    <div>
                      Email: <Tag>{student.email}</Tag>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      Số điểm: <Tag>{honeyStudent.point}</Tag>
                    </div>
                    <div className="m-25">
                      Khóa: <Tag>{student.khoa}</Tag>
                    </div>
                    <div>
                      Số điện thoại: <Tag>{student.phone}</Tag>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="py-25" span={12} style={{ paddingLeft: "25px" }}>
                <Form form={formAddPoint} onFinish={onFinishAdd}>
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
                        ]}>
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
                        ]}>
                        <Input.TextArea style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div className="text-right">
                    <Button
                      htmlType="submit"
                      className="search-button"
                      type="primary">
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
    </Spin>
  );
}
