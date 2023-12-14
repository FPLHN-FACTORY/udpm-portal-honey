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
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetHistory,
  SetHistory,
} from "../../../app/reducers/history/history.reducer";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { SearchOutlined } from "@ant-design/icons";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import moment from "moment";

export default function RequestApprovedHistory() {
  const dispatch = useAppDispatch();
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0, status: null });

  useEffect(() => {
    fetchData(dispatch, filter);
  }, [dispatch, filter]);

  const fetchData = (dispatch, filter) => {
    dispatch(SetHistory([]));
    CategoryAPI.fetchAllCategory()
      .then((response) => {
        dispatch(SetCategory(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        const fetchData = async (filter) => {
          try {
            const response = await RequestManagerAPI.historyApproved(filter);
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
                    nameStudent: user.data.data.name,
                    userName: user.data.data.userName,
                    nameTeacher: teacher ? teacher.data.data.name : null,
                    userTeacher: teacher ? teacher.data.data.userName : null,
                    namePresident: president ? president.data.data.name : null,
                    userPresident: president
                      ? president.data.data.userName
                      : null,
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
      <Card title="Lịch sử cộng điểm">
        {data.map((item) => (
          <div className="list__point ">
            <Row>
              <Col span={12}>
                <h4 className="text-slate-600">
                  Người nhận: {item.nameStudent} ({item.userName})
                </h4>
              </Col>
              <Col span={12}>
                <h4 className="text-slate-600">
                  Người gửi: {item.nameTeacher || item.namePresident} (
                  {item.userTeacher || item.userPresident})
                </h4>
              </Col>
            </Row>
            <div className="list__point__title">
              <p>
                <strong className="text-slate-500 mr-[8px]">
                  {item.acction.status == 2
                    ? "Đã bị hủy yêu cầu cộng: "
                    : "Đã được chấp nhận yêu cầu cộng: "}
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
