import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Space,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { RequestManagerAPI } from "../../apis/censor/request-manager/requestmanager.api";
import { CategoryAPI } from "../../apis/censor/category/category.api";
import { PresidentHistoryAPI } from "../../apis/president/history/history.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
const statusHistory = (status) => {
  switch (status) {
    case 1:
      return <Tag color="green">Đổi thành công</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function GiftHistory() {
  const [getHistory, setGetHistory] = useState([]);
  const [fillCategory, setFillCategory] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });

  const fetchData = (filter) => {
    const fetchData = async (filter) => {
      try {
        const response = await PresidentHistoryAPI.getGiftHistory(filter);
        const listHistory = await Promise.all(
          response.data.data.map(async (data) => {
            try {
              const user = await RequestManagerAPI.getUserAPiById(
                data.studentId
              );
              return {
                ...data,
                studentName: user.data.data.name,
                userName: user.data.data.userName,
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
    <div id="gift_history">
      <Card className="mb-2">
        <Form onFinish={onFinishSearch}>
          {/* <Space size={"large"}> */}
            <Row className="flex justify-between">
              <Col xs={21}>
                <div className="relative w-full">
                  <Form.Item name="userName" >
                    <Input
                      style={{ height : 40}}className="search-input"
                      name="userName"
                      // size="small"
                      placeholder="Nhập username sinh viên cần tìm"
                      prefix={<SearchOutlined />}
                    />
                  </Form.Item>{" "}
                </div>
              </Col>

              <Button
              htmlType="submit"
              type="primary"
              className="ml-2 search-button "
              icon={<SearchOutlined/>}
              style={{ marginBottom: "25px" }}
            >
               Tìm kiếm
            </Button>
           
            </Row>
            
          {/* </Space> */}
        </Form>
      </Card>
      <Card
        title={
          <>
            <FontAwesomeIcon
              className="mr-2"
              icon={faRectangleList}
              size="xl"
            />
            Lịch sử
          </>
        }
      >
        <div className="mt-5">
          {getHistory.map((item) => (
            <div className="list__point ">
              <h3 className="text-slate-600"> Sinh viên {item.studentName}</h3>
              <div className="list__point__title">
                <p>
                  <strong className="text-slate-500 mr-[8px]">
                    {item.status === 2
                      ? "Đã bị hủy yêu cầu tặng: "
                      : "Đã nhân được: "}
                  </strong>
                  {item.gift}
                </p>
                <p>
                  <strong className="text-slate-500 mr-[8px]">
                    Thời gian:
                  </strong>
                  {moment(item.changeDate).format("DD-MM-YYYY HH:mm:ss")}
                </p>
              </div>
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
      </Card></div>
    </>
  );
}
