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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetHistory,
  SetHistory,
} from "../../../app/reducers/history/history.reducer";
import { AddPointAPI } from "../../../apis/teacher/add-point/add-point.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
const statusHistory = (status) => {
  switch (status) {
    case 1:
      return (
        <Tag style={{ width: "80px", textAlign: "center" }} color="green">
          Đã phê duyệt
        </Tag>
      ); // Màu xanh lá cây
    case 2:
      return (
        <Tag style={{ width: "80px", textAlign: "center" }} color="volcano">
          Đã hủy
        </Tag>
      ); // Màu đỏ
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function HistoryAddPoint() {
  const dispatch = useAppDispatch();

  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0 });

  useEffect(() => {
    fetchData(dispatch, filter);
  }, [dispatch, filter]);

  const fetchData = (dispatch, filter) => {
    AddPointAPI.getCategory()
      .then((response) => {
        dispatch(SetCategory(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        const fetchData = async (filter) => {
          try {
            const response = await AddPointAPI.getHistory(filter);
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
            dispatch(SetHistory(listHistory));
            setTotalPage(response.data.totalPages);
          } catch (error) {
            console.error(error);
          }
        };
        fetchData(filter);
      });
  };

  const data = useAppSelector(GetHistory).map((data) => {
    return {
      ...data,
      key: data.id,
      status: statusHistory(data.status),
      createdDate: moment(data.createdDate).format("DD-MM-YYYY HH:mm:ss"),
      acction: { idHistory: data.id, status: data.status },
    };
  });
  const listCategory = useAppSelector(GetCategory);

  const onFinishSearch = (value) => {
    if (value.userName === undefined || value.userName.trim().length === 0) {
      setFilter({
        ...filter,
        idStudent: null,
        idCategory: value.idCategory,
        status: value.status,
      });
    } else {
      AddPointAPI.searchStudent(value.userName.trim())
        .then((result) => {
          if (result.data.success) {
            setFilter({
              ...filter,
              idStudent: result.data.data.id,
              idCategory: value.idCategory,
              status: value.status,
            });
          } else {
            message.error("Mã sinh viên không chính xác!");
          }
        })
        .catch((error) => console.error(error));
    }
  };

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
            <Form.Item name={"idCategory"}>
              <Select
                style={{ width: "450px" }}
                size="large"
                placeholder="Loại điểm"
                options={[
                  { value: null, label: "Tất cả" },
                  ...listCategory.map((category) => {
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
      <Card title={<><FontAwesomeIcon className="mr-2" icon={faRectangleList} size="xl" />Lịch sử cộng điểm </>}>
        {data.map((item) => (
          <div className="list__point ">
            <h3 className="text-slate-600">
              {" "}
              Sinh viên {item.nameStudent} ({item.userName})
            </h3>
            <div className="list__point__title">
              <p>
                <strong className="text-slate-500 mr-[8px]">
                  {item.acction.status == 2
                    ? "Đã bị hủy yêu cầu cộng: "
                    : "Đã được cộng: "}
                </strong>
                {item.honey}
              </p>
              <p>
                <strong className="text-slate-500 mr-[8px]">Thời gian:</strong>
                {item.createdDate}
              </p>
              <p
                title={item.note}
                className="w-[300px] overflow-hidden whitespace-nowrap text-ellipsis"
              >
                <strong className="text-slate-500 mr-[8px]">Lý do:</strong>
                {item.note}
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
