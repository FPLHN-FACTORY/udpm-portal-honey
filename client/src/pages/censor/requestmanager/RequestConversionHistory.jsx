import {
  Button,
  Card,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";

export default function RequestConversionHistory() {
  const [getHistory, setGetHistory] = useState([]);
  const [fillCategory, setFillCategory] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });

  const fetchData = (filter) => {
    const fetchData = async (filter) => {
      try {
        const response = await RequestManagerAPI.getHistoryConversion(filter);
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

  const changeStatusConversion = (
    idStudent,
    idGift,
    idHistory,
    idHistoryDetail,
    status,
    quantityGift
  ) => {
    RequestManagerAPI.changeStatusConversion(
      idStudent,
      idGift,
      idHistory,
      idHistoryDetail,
      status,
      quantityGift
    ).then((response) => {
      if (response.data.success) {
        if (status === 1) message.success("Đã xác nhận yêu cầu mua vật phẩm!");
        if (status === 2) message.error("Hủy yêu cầu thành công!");
      }
      fetchData();
    });
  };
  const handCheckvalide = async (values) => {
    // Gọi hàm fechFillPoint và đợi cho đến khi hoàn thành
    const response = await RequestManagerAPI.getPoint(
      values.studentId,
      values.categoryId
    );
    const newFillPoint = response.data.data;

    const totalPoint = values.quantityGift * values.honeyPoint;
    if (totalPoint > newFillPoint) {
      message.error("Sinh viên Không còn đủ điểm để mua quà!");
    } else {
      changeStatusConversion(
        values.studentId,
        values.giftId,
        values.id,
        values.idHistoryDetail,
        1,
        values.quantityGift
      );
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên sinh viên",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Loại điểm",
      dataIndex: "nameCategory",
      key: "nameCategory",
    },
    {
      title: "Loại quà",
      dataIndex: "nameGift",
      key: "nameGift",
    },
    {
      title: "Số lượng",
      dataIndex: "quantityGift",
      key: "quantityGift",
    },
    {
      title: "Điểm trừ",
      dataIndex: "honeyPoint",
      key: "honeyPoint",
      render: (text) => <span>{`-${text} điểm`}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === 0
              ? "geekblue"
              : status === 1
              ? "green"
              : status === 2
              ? "volcano"
              : "default"
          }
        >
          {status === 0
            ? "Chờ phê duyệt"
            : status === 1
            ? "Đã phê duyệt"
            : status === 2
            ? "Đã hủy"
            : "Không sác định"}
        </Tag>
      ),
    },
    {
      title: () => <div>Hành động</div>,
      key: "action",
      render: (_, values) => (
        <Space size="small">
          <div
            style={{ fontSize: "19px", textAlign: "center", color: "green" }}
          >
            {values.status !== 1 && values.status !== 2 && (
              <CheckCircleFilled
                onClick={() => {
                  handCheckvalide(values);
                }}
              />
            )}

            {values.status !== 1 && values.status !== 2 && (
              <CloseCircleFilled
                style={{ fontSize: "19px", margin: "0px 10px", color: "red" }}
                onClick={() => {
                  changeStatusConversion(
                    values.studentId,
                    values.giftId,
                    values.id,
                    values.idHistoryDetail,
                    2
                  );
                }}
              />
            )}
          </div>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Card className="mb-2">
        <Form onFinish={onFinishSearch}>
          <Space size={"large"}>
            <Form.Item name="userName" className="search-input">
              <Input
                style={{ width: "500px" }}
                name="userName"
                size="small"
                placeholder="Nhập user name sinh viên cần tìm"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Form.Item name={"idCategory"}>
              <Select
                style={{ width: "450px" }}
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
              style={{ marginBottom: "25px", backgroundColor: "#EEB30D" }}
            >
              Lọc
            </Button>
          </Space>
        </Form>
      </Card>
      <Card title="Danh sách yêu cầu đổi quà">
        <div className="mt-5">
          <Table
            columns={columns}
            rowKey="id"
            dataSource={getHistory}
            pagination={false}
          />
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
