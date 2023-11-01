import {
  Button,
  Card,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Spin,
  Table,
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
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  EyeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import TabsRequest from "./TabsRequest";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import { Link } from "react-router-dom";
import moment from "moment";
import { type } from "@testing-library/user-event/dist/type";

const statusHistory = (status) => {
  switch (status) {
    case 0:
      return <Tag color="geekblue">Chờ phê duyệt</Tag>; // Màu xanh dương
    case 1:
      return <Tag color="green">Đã phê duyệt</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function RequestAddPoint() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "User name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "nameStudent",
      key: "nameStudent",
    },
    {
      title: "Loại điểm",
      dataIndex: "nameCategory",
      key: "nameCategory",
    },
    {
      title: "Số điểm",
      dataIndex: "honeyPoint",
      key: "honeyPoint",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Hành động",
      dataIndex: "acction",
      key: "acction",
      render: (values) => (
        <div style={{ fontSize: "19px", textAlign: "center", color: "green" }}>
          {values.status !== 1 && values.status !== 2 && (
            <CheckCircleFilled
              onClick={() => changeStatus(values.idHistory, 1)}
            />
          )}

          {values.status !== 1 && values.status !== 2 && (
            <CloseCircleFilled
              style={{ fontSize: "19px", margin: "0px 10px", color: "red" }}
              onClick={() => changeStatus(values.idHistory, 2)}
            />
          )}
          <Link to={"/censor/request-manager/detail/" + values.idHistory}>
            <EyeFilled style={{ fontSize: "20px", color: "#3498db" }} />
          </Link>
        </div>
      ),
    },
  ];

  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0, status: 0 });
  const [type, setType] = useState();

  useEffect(() => {
    fetchData(dispatch, filter);
  }, [dispatch, filter]);

  const fetchData = (dispatch, filter) => {
    dispatch(SetHistory([]));
    setLoading(true);
    CategoryAPI.fetchAllCategory()
      .then((response) => {
        dispatch(SetCategory(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        setLoading(true);
        const fetchData = async (filter) => {
          try {
            const response = await RequestManagerAPI.getAddPoint(filter);
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
            setLoading(false);
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
      createdDate: moment(data.createdDate).format("DD-MM-YYYY"),
      acction: { idHistory: data.id, status: data.status },
    };
  });
  const listCategory = useAppSelector(GetCategory);

  const onFinishSearch = (value) => {
    setLoading(true);
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
    setLoading(false);
  };

  const changeStatus = (idHistory, status) => {
    setLoading(true);
    RequestManagerAPI.changeStatus(idHistory, status)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          fetchData(dispatch, filter);
          if (status === 1) message.success("Đã xác nhận yêu cầu cộng mật ong!");
          if (status === 2) message.error("Hủy yêu cầu thành công!");
          setType(response.data.data.type);
        }
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Spin spinning={loading}>
      <div className="request-manager">
        <Card className="mb-2 py-1">
          <Form onFinish={onFinishSearch}>
            <Space size={"large"}>
              <Form.Item name="userName" className="search-input">
                <Input
                  style={{ width: "300px" }}
                  name="userName"
                  size="small"
                  placeholder="Nhập user name sinh viên cần tìm"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
              <Form.Item name={"idCategory"}>
                <Select
                  style={{ width: "150px" }}
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
              <Form.Item name={"status"} initialValue={0}>
                <Select
                  style={{ width: "150px" }}
                  size="large"
                  placeholder="Trạng thái"
                  options={[
                    { value: null, label: "Tất cả" },
                    ...[0, 1, 2, 3].map((value) => {
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
                className="mr-10 search-button">
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
            expandable={{
              expandedRowRender: (record) => (
                <p>
                  <b style={{ color: "#EEB30D" }}>Lý do cộng: </b>
                  {record.note}
                </p>
              ),
            }}
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
    </Spin>
  );
}
