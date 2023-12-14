import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Table,
  message,
  Space,
  Tooltip,
  Tag,
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
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";

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

export default function RequestAddPoint() {
  const dispatch = useAppDispatch();
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Người gửi",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, record) => {
        if (record.teacherId !== null) {
          return record.userTeacher;
        } else if (record.presidentId !== null) {
          return record.userPresident;
        } else {
          return null;
        }
      },
    },
    {
      title: "Người nhận",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Số mật ong",
      dataIndex: "honey",
      key: "honey",
      align: "center",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "acction",
      key: "acction",
      align: "center",
      render: (values) => (
        <Space size="small">
          {values.status !== 1 && values.status !== 2 && (
            <Tooltip title="Xác nhận">
              <Button
                onClick={() =>
                  changeStatus(values.idHistory, values.idHistoryDetail, 1)
                }
                style={{
                  backgroundColor: "yellowgreen",
                  color: "white",
                }}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            </Tooltip>
          )}

          {values.status !== 1 && values.status !== 2 && (
            <Tooltip title="Hủy">
              <Button
                onClick={() =>
                  changeStatus(values.idHistory, values.idHistoryDetail, 2)
                }
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Xem chi tiết">
            <Link to={"/censor/request-manager/detail/" + values.idHistory}>
              <Button
                style={{
                  backgroundColor: "rgb(83, 209, 255)",
                  color: "white",
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0, status: 0 });

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
            const response = await RequestManagerAPI.getAddPoint(filter);
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
      createdDate: moment(data.createdDate).format("DD-MM-YYYY"),
      acction: {
        idHistory: data.idHistory,
        idHistoryDetail: data.id,
        status: data.status,
      },
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
            setFilter({
              ...filter,
              idStudent: null,
              idCategory: value.idCategory,
              status: value.status,
            });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const changeStatus = (idHistory, idHistoryDetail, status) => {
    RequestManagerAPI.changeStatus(idHistory, idHistoryDetail, status)
      .then((response) => {
        if (response.data.success) {
          fetchData(dispatch, filter);
          if (status === 1)
            message.success("Đã xác nhận yêu cầu cộng mật ong!");
          if (status === 2) message.error("Hủy yêu cầu thành công!");
        }
      })
      .catch((error) => {
        message.error(error);
      });
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
            <Form.Item name={"status"} initialValue={null}>
              <Select
                style={{ width: "260px" }}
                size="large"
                placeholder="Trạng thái"
                options={[
                  { value: null, label: "Tất cả" },
                  ...[1, 2].map((value) => {
                    return {
                      value: value,
                      label: statusHistory(value),
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
      <Card title="Yêu cầu cộng điểm">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={false}
        />
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
