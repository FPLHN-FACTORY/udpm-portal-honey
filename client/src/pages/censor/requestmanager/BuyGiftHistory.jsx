import {
  Button,
  Card,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Tag,
  message,
  Row,
  Col,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import { SearchOutlined } from "@ant-design/icons";

export default function BuyGiftHistory() {
  const [getHistory, setGetHistory] = useState([]);
  const [fillCategory, setFillCategory] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });

  const fetchData = (filter) => {
    const fetchData = async (filter) => {
      try {
        const response = await RequestManagerAPI.getHistoryBuyGifft(filter);
        const listHistory = await Promise.all(
          response.data.data.map(async (data) => {
            try {
              const user = await RequestManagerAPI.getUserAPiById(
                data.studentId
              );
              let teacher = null;
              if (data.teacherId !== null) {
                teacher = await RequestManagerAPI.getUserAPiById(
                  data.teacherId
                );
              }
              let president = null;
              if (data.presidentId !== null) {
                president = await RequestManagerAPI.getUserAPiById(
                  data.presidentId
                );
              }
              return {
                ...data,
                studentName: user.data.data.name,
                userName: user.data.data.userName,
                nameTeacher: teacher ? teacher.data.data.name : null,
                userTeacher: teacher ? teacher.data.data.userName : null,
                namePresident: president ? president.data.data.name : null,
                userPresident: president ? president.data.data.userName : null,
              };
            } catch (error) {
              console.error(error);
              return data;
            }
          })
        );
        setGetHistory(listHistory);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(filter);
  };

  const fechCategory = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      setFillCategory(response.data.data);
    });
  };
  useEffect(() => {
    fechCategory();
    fetchData(filter);
  }, [filter]);

  const onFinishSearch = (value) => {
    if (value.userName === undefined || value.userName.trim().length === 0) {
      setFilter({
        ...filter,
        idStudent: null,
        idCategory: value.idCategory,
        status: value.status,
      });
    } else {
      RequestManagerAPI.getUserAPiByCode(value.userName.trim())
        .then((result) => {
          if (result.data.success) {
            setFilter({
              ...filter,
              idStudent: result.data.data.id,
              idCategory: value.idCategory,
              status: value.status,
            });
          } else {
            fetchData();
            message.error("User name sinh viên không chính xác!");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <Card className="mb-2">
        <Form onFinish={onFinishSearch}>
          <Space size={"large"}>
            <Form.Item name="userName" className="search-input">
              <Input
                style={{ width: "400px" }}
                name="userName"
                size="small"
                placeholder="Nhập user name sinh viên cần tìm"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Form.Item name={"idCategory"}>
              <Select
                style={{ width: "250px" }}
                size="large"
                placeholder="Loại điểm"
                options={[
                  { value: null, label: "tất cả" },
                  ...fillCategory.map((item) => {
                    return { label: item.name, value: item.id };
                  }),
                ]}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="mr-10 search-button"
              style={{ marginBottom: "25px" }}
            >
              Lọc
            </Button>
          </Space>
        </Form>
      </Card>
      <Card title="Lịch sử đổi quà">
        <div className="mt-5">
          {getHistory.map((item) => (
            <div className="list__point ">
              <Row>
                <Col span={12}>
                  <h4 className="text-slate-600">
                    Người nhận: {item.studentName} ({item.userName})
                  </h4>
                </Col>
                <Col span={12}>
                  <h4 className="text-slate-600">
                    Người gửi: {item.nameTeacher || item.namePresident} (
                    {item.userTeacher || item.userPresident})
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div className="list__point__title">
                    <p>
                      <strong className="text-slate-500 mr-[8px]">
                        {item.status === 2
                          ? "Đã bị hủy yêu cầu mua: "
                          : "Đã được chấp nhận yêu cầu mua: "}
                      </strong>
                      {item.quantityGift} {item.gift}
                    </p>
                  </div>
                </Col>
                <Col>
                  <div className="list__point__title">
                    <p>
                      <strong className="text-slate-500 mr-[8px]">
                        Thời gian:
                      </strong>
                      {moment(item.changeDate).format("DD-MM-YYYY HH:mm:ss")}
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Pagination
            simple
            current={filter.page + 1}
            onChange={(page) => {
              setFilter({ ...filter, page: page - 1 });
            }}
            total={totalPages * 10}
          />
        </div>
      </Card>
    </>
  );
}
