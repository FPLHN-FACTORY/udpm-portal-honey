import { Button, Card, Form, Input, Pagination, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import { AddPointAPI } from "../../../apis/censor/add-point/add-point.api";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

export default function HistoryGift() {
  const [totalPage, setTotalPage] = useState(1);
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const fetchData = (filter) => {
    const fetchData = async (filter) => {
      try {
        const response = await AddPointAPI.getHistoryGift(filter);
        const listHistory = await Promise.all(
          response.data.data.map(async (data) => {
            try {
              const user = await AddPointAPI.getStudent(data.studentId);
              return {
                ...data,
                nameStudent: user.data.data.name,
                userName: user.data.data.userName,
              };
            } catch (error) {
              console.error(error);
              return data;
            }
          })
        );
        setHistory(listHistory);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData(filter);
  };

  const data = history.map((data) => {
    return {
      ...data,
      key: data.id,
      changeDate: moment(data.changeDate).format("DD-MM-YYYY HH:mm:ss"),
      acction: { idHistory: data.id, status: data.status },
    };
  });

  const onFinishSearch = (value) => {
    if (value.userName === undefined || value.userName.trim().length === 0) {
      setFilter({
        ...filter,
        idStudent: null,
        status: value.status,
      });
    } else {
      AddPointAPI.searchStudent(value.userName.trim())
        .then((result) => {
          if (result.data.success) {
            setFilter({
              ...filter,
              idStudent: result.data.data.id,
              status: value.status,
            });
          } else {
            message.error("Mã sinh viên không chính xác!");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  console.log(data);

  return (
    <div className="add-point">
      <Card className="mb-2 py-1">
        <Form onFinish={onFinishSearch}>
          <Space size={"large"}>
            <Form.Item name="userName" className="search-input">
              <Input
                style={{ width: "500px" }}
                size="small"
                placeholder="Nhập username sinh viên cần tìm"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              className="mr-10 search-button"
            >
              Lọc
            </Button>
          </Space>
        </Form>
      </Card>
      <Card title="Lịch sử">
        {data.map((item) => (
          <div className="list__point ">
            <h3 className="text-slate-600">
              {" "}
              Sinh viên {item.nameStudent} ({item.userName}){" "}
            </h3>
            <div className="list__point__title">
              <p>
                <strong className="text-slate-500 mr-[8px]">
                  Đã nhận được:
                </strong>
                {item.chest || item.gift}
              </p>
              <p>
                <strong className="text-slate-500 mr-[8px]">Thời gian:</strong>
                {item.changeDate}
              </p>
            </div>
          </div>
        ))}
        <div className="mt-10 text-center mb-10"></div>
        <div className="mt-10 text-center mb-10">
          <Pagination
            simple
            current={filter.page + 1}
            onChange={(page) => {
              setFilter({ ...filter, page: page - 1 });
            }}
            total={totalPage * 10}
          />
        </div>
      </Card>
    </div>
  );
}
