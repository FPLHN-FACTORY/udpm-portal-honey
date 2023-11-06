import {
  Button,
  Card,
  Form,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
import moment from "moment";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
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

export default function BuyGiftHistory() {
  const [getHistory, setGetHistory] = useState([]);
  const [fillCategory, setFillCategory] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });
  const [fillUserApi, setFillUserApi] = useState([]);
  const [fillPoint, setFillPoint] = useState(0);
  const [type, setType] = useState();
  const fechUserApiById = () => {
    ResquestConversion.getUserAPiByid().then((response) => {
      setFillUserApi({
        ...response.data.data,
        khoa: "17.3",
        phone: "0763104018",
      });
    });
  };

  useEffect(() => {
    fechUserApiById();
  }, []);

  const fechData = (filter) => {
    RequestManagerAPI.getHistoryBuyGifft(filter).then((response) => {
      setGetHistory(response.data.data);
      setTotalPages(response.data.totalPages);
    });
  };

  const fechFillPoint = (idStudent, idCategory) => {
    RequestManagerAPI.getPoint(idStudent, idCategory).then((response) => {
      setFillPoint(response.data.data);
    });
  };

  const fechCategory = () => {
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };
  useEffect(() => {
    fechCategory();
    fechData(filter);
  }, [filter]);

  const onFinishSearch = (value) => {
    if (value.code === undefined || value.code.trim().length === 0) {
      setFilter({
        ...filter,
        idCategory: value.idCategory,
        status: value.status,
      });
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
      dataIndex: "studentId",
      key: "studentId",
      render: (text) => <span>{`${fillUserApi.name}`}</span>,
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
      dataIndex: "quantity",
      key: "quantity",
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
            ? "Đổi thành công"
            : status === 2
            ? "Đã hủy"
            : "Không sác định"}
        </Tag>
      ),
    },
  ];
  return (
    <>
      <Card className="mb-2 py-1">
        <Form onFinish={onFinishSearch}>
          <Space size={"large"}>
            <Form.Item name={"idCategory"}>
              <Select
                style={{ width: "150px" }}
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
            <Form.Item name={"status"} initialValue={null}>
              <Select
                style={{ width: "150px" }}
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
              style={{ marginBottom: "25px" }}
            >
              Lọc
            </Button>
          </Space>
        </Form>
      </Card>
      <Card title="Lịch sử đổi quà">
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
