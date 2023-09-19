import {
  Button,
  Card,
  Col,
  Descriptions,
  Empty,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";

const red = [255, 0, 0];
const green = [0, 128, 0];
export default function CreateTransaction({ setData, setCurrent, setLoading }) {
  const [percent, setPercent] = useState(0);

  const interpolatedColor = [
    Math.round((1 - percent / 100) * green[0] + (percent / 100) * red[0]),
    Math.round((1 - percent / 100) * green[1] + (percent / 100) * red[1]),
    Math.round((1 - percent / 100) * green[2] + (percent / 100) * red[2]),
  ];

  const dispatch = useAppDispatch();
  const listCategory = useAppSelector(GetCategory);
  const [student, setStudent] = useState({});
  const [honeyStudent, setHoneyStudent] = useState({ honey: 0 });
  const [category, setCategory] = useState({});

  const [formSearch] = Form.useForm();

  const onSearchStudent = (value) => {
    setLoading(true);
    TransactionApi.searchStudent(value.code)
      .then((result) => {
        if (result.data.success) {
          TransactionApi.getCategory(result.data.data.id)
            .then((category) => {
              setStudent(result.data.data);
              setCategory(category.data.data[0]);
              dispatch(SetCategory(category.data.data));
            })
            .catch((err) => {
              setStudent({});
              formSearch.setFields([
                {
                  name: "code",
                  errors: [err.response.data.message],
                },
              ]);
            });
        } else {
          setStudent({});
          formSearch.setFields([
            {
              name: "code",
              errors: ["Không tìm thấy thông tin sinh viên!"],
            },
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = (data) => {
    setLoading(true);
    TransactionApi.verify()
      .then((response) => {
        if (response.data.success) {
          setData({
            ...data,
            email: response.data.data,
            codeStudent: student.code,
            student: student,
            category: category,
            honey: honeyStudent,
          });
          setCurrent(1);
        } else {
          message.error("Lỗi hệ thống, vui lòng thử lại sau");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getHoney(category.id, setLoading);
  }, [category, setLoading]);

  const getHoney = (categoryId, loading) => {
    loading(true);
    TransactionApi.getHoney(categoryId)
      .then((response) => {
        if (response.data.success) {
          setHoneyStudent(response.data.data);
        } else {
          setHoneyStudent({ point: 0 });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        loading(false);
      });
  };

  return (
    <div className="m-25">
      <Card
        className="content-card"
        title="Thông tin giao dịch"
        extra={
          <Form form={formSearch} onFinish={onSearchStudent} className="d-flex">
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
            <Button
              htmlType="submit"
              type="primary"
              className="ml-10 search-button">
              Search
            </Button>
          </Form>
        }>
        {Object.keys(student).length > 0 ? (
          <Row>
            <Col
              span={12}
              className="p-25"
              style={{ borderRight: "1px solid #F0F0F0" }}>
              <Row className="font-semibold">
                <Col span={12}>
                  <Descriptions title="Thông tin người nhận" column={1}>
                    <Descriptions.Item
                      label="User name"
                      style={{ paddingBottom: "16px" }}>
                      <Tag>{student.userName}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Họ và tên">
                      <Tag>{student.name}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label="Email"
                      style={{ paddingTop: "15px" }}>
                      <Tag>{student.email}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Col>
            <Col className="p-25" span={12}>
              <Form onFinish={onSubmit}>
                <Row>
                  <Col span={8} className=" font-semibold">
                    <div>Số dư:</div>
                  </Col>
                  <Col span={16}>
                    <Tag
                      style={{
                        marginBottom: "25px",
                        backgroundColor: `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`,
                        fontWeight: "bold",
                        color: "white",
                      }}>
                      {honeyStudent.point} điểm
                    </Tag>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className=" font-semibold">
                    <div>Loại điểm:</div>
                  </Col>
                  <Col span={16}>
                    <Form.Item name="category" initialValue={category.id}>
                      <Select
                        style={{ width: "100%" }}
                        onChange={(_, options) => {
                          setCategory(options.data);
                        }}
                        options={listCategory.map((category) => {
                          return {
                            label: category.name,
                            value: category.id,
                            data: category,
                          };
                        })}
                      />
                    </Form.Item>
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
                          max: parseInt(honeyStudent.honey),
                          message: `Số điểm phải nhỏ hơn ${honeyStudent.honey}`,
                        },
                      ]}>
                      <InputNumber
                        onChange={(value) => {
                          setPercent((value / honeyStudent.honey) * 100);
                        }}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8} className=" font-semibold">
                    <div>Nội dung:</div>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      initialValue={"Chuyển điểm"}
                      name="note"
                      rules={[
                        {
                          required: true,
                          pattern: /^\s*(\S\s*){5,}$/,
                          message: "Nội dung giao dịch phải trên 5 ký tự",
                        },
                        {
                          max: 100,
                          message: "Nội dung không được vượt quá 100 ký tự",
                        },
                      ]}>
                      <Input.TextArea style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="text-right">
                  <Button
                    htmlType="submit"
                    className="send-button"
                    type="primary">
                    Tiếp tục
                    <SendOutlined className="m-0 pl-5" />
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        ) : (
          <Empty className="p-25" />
        )}
      </Card>
    </div>
  );
}
