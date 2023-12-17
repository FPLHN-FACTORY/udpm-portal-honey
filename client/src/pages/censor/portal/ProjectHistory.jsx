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
} from "antd";
import React, { useEffect, useState } from "react";
import "./index.css";
import { SearchOutlined } from "@ant-design/icons";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import moment from "moment";
import { AddPointStudentAPI } from "../../../apis/censor/add-point/add-point-student.api";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const statusHistory = (status) => {
  switch (status) {
    case 1:
      return <Tag color="green">Đã phê duyệt</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function ProjectHistory() {
  const [totalPage, setTotalPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState({ page: 0, status: null });

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const fetchData = (filter) => {
    setHistory([]);
    CategoryAPI.fetchAllCategory()
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        const fetchData = async (filter) => {
          try {
            const response = await AddPointStudentAPI.getHistoryProject(filter);
            const listHistory = await Promise.all(
              response.data.data.map(async (data) => {
                try {
                  const user = await RequestManagerAPI.getUserAPiById(
                    data.studentId
                  );
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
      });
  };

  const data = history.map((data) => {
    return {
      ...data,
      key: data.id,
      status: statusHistory(data.status),
      createdDate: moment(data.createdDate).format("DD-MM-YYYY HH:mm:ss"),
      acction: { idHistory: data.id, status: data.status },
    };
  });

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
            message.error("User name sinh viên không chính xác!");
          }
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <div className="request-manager">
      <Card className="mb-2 py-1">
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
                  { value: null, label: "Tất cả" },
                  ...category.map((category) => {
                    return {
                      value: category.id,
                      label: category.name,
                    };
                  }),
                ]}
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
      <Card title={<><FontAwesomeIcon icon={faRectangleList} size="xl" /> Lịch sử</>}>
        {data.map((item) => (
          <div className="list__point ">
            <h3 className="text-slate-600"> Sinh viên {item.nameStudent}</h3>
            <div className="list__point__title">
              <p>
                <strong className="text-slate-500 mr-[8px]">
                  Đã được cộng:
                </strong>
                {item.honey}
              </p>
              <p>
                <strong className="text-slate-500 mr-[8px]">Thời gian:</strong>
                {item.createdDate}
              </p>
            </div>
          </div>
        ))}
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
