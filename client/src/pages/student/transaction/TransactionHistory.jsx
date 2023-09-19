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
import { AddPointAPI } from "../../../apis/teacher/add-point/add-point.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
import localization from "moment/locale/vi";

const statusHistory = (status) => {
  switch (status) {
    case 0:
      return <Tag color="geekblue">Chờ phê duyệt</Tag>; // Màu xanh dương
    case 1:
      return <Tag color="green">Hoàn thành</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    case 3:
      return <Tag color="cyan">Gửi lại yêu cầu</Tag>; // Màu xanh dương nhạt
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function TransactionHistory() {
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
      title: "Tên người nhận",
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
      title: "Thời gian",
      dataIndex: "changeDate",
      key: "changeDate",
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
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              if (values.status !== 1) {
                changeStatus(values.idHistory, values.status === 2 ? 3 : 2);
              }
            }}
            disabled={values.status === 1}
            type="primary"
            danger={values.status !== 2}
            style={{
              color: values.status === 1 ? "" : "#fff",
              height: "30px",
            }}>
            {values.status === 2 ? "Gửi lại" : "Hủy"}
          </Button>
        </div>
      ),
    },
  ];

  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0 });

  useEffect(() => {
    fetchData(dispatch, filter);
  }, [dispatch, filter]);

  const fetchData = (dispatch, filter) => {
    setLoading(true);
    TransactionApi.getCategory()
      .then((response) => {
        dispatch(SetCategory(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      })
      .finally(() => {
        const fetchData = async (filter) => {
          try {
            const response = await TransactionApi.getHistory(filter);
            const listHistory = await Promise.all(
              response.data.data.map(async (data) => {
                try {
                  const user = await TransactionApi.getStudent(data.studentId);
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
    setLoading(false);
  };

  const data = useAppSelector(GetHistory).map((data) => {
    return {
      ...data,
      key: data.id,
      status: statusHistory(data.status),
      changeDate:
        data.changeDate === null
          ? "Cần xác nhận"
          : moment(data.changeDate).format("HH:mm dddd DD-MM-YYYY"),
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
      AddPointAPI.getUserAPiByCode(value.userName.trim())
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
    setLoading(false);
  };

  const changeStatus = (idHistory, status) => {
    setLoading(true);
    TransactionApi.changeStatus(idHistory, status)
      .then((response) => {
        if (response.data.success) {
          fetchData(dispatch, filter);
          if (status === 2) message.error("Hủy yêu cầu thành công!");
          if (status === 3) message.success("Gửi lại yêu cầu thành công!");
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
      <div className="add-point">
        <Card className="mb-2 py-1">
          <Form onFinish={onFinishSearch}>
            <Space size={"large"}>
              <Form.Item name="userName" className="search-input">
                <Input
                  style={{ width: "300px" }}
                  size="small"
                  placeholder="Nhập mã sinh viên cần tìm"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
              <Form.Item name={"idCategory"}>
                <Select
                  style={{ width: "170px" }}
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
              <Form.Item name={"status"}>
                <Select
                  style={{ width: "170px" }}
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
        <Card title="Lịch sử giao dịch">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="key"
            pagination={false}
            expandable={{
              expandedRowRender: (record) => (
                <p>
                  <b style={{ color: "#EEB30D" }}>Nội dung: </b>
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
