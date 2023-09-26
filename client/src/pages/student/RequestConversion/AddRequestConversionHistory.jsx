import {
  Button,
  Card,
  Form,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
import moment from "moment";
import { CategoryAPI } from "../../../apis/censor/category/category.api";

const statusHistory = (status) => {
  switch (status) {
    case 0:
      return <Tag color="geekblue">Chờ phê duyệt</Tag>; // Màu xanh dương
    case 1:
      return <Tag color="green">Đã phê duyệt</Tag>; // Màu xanh lá cây
    case 2:
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    case 3:
      return <Tag color="cyan">Gửi lại yêu cầu</Tag>; // Màu xanh dương nhạt
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function AddRequestConversionHistory() {
  const [getHistory, setGetHistory] = useState([]);
  const [fillCategory, setFillCategory] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });

  const fechData = (filter) => {
    ResquestConversion.getHistory(filter).then((response) => {
      setGetHistory(response.data.data);
      setTotalPages(response.data.totalPages);
    });
  };

  const fechCategory = () => {
    CategoryAPI.fetchAll().then((response) => {
      setFillCategory(response.data.data.data);
    });
  };
  useEffect(() => {
    fechData(filter);
    fechCategory();
  }, [filter]);

  const deleteRequestConversion = (id) => {
    ResquestConversion.deleteRequest(id).then(() => {
      message.success("Hủy yêu cầu thành công");
      fechData();
    });
  };

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
      title: "Quà đổi được",
      dataIndex: "honeyPoint",
      key: "honeyPoint",
      render: (text) => <span>{`${text} điểm`}</span>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => (
    //     <Tag color={status === 0 ? "geekblue" : "default"}>
    //       {status === 0 ? "Chờ phê duyệt" : "Không xác định"}
    //     </Tag>
    //   ),
    // },
    // {
    //   title: () => <div>Action</div>,
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="small">
    //       <Button
    //         type="primary"
    //         onClick={() => deleteRequestConversion(record.id)}
    //       >
    //         hủy
    //       </Button>
    //     </Space>
    //   ),
    // },
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
            <Form.Item name={"status"}>
              <Select
                style={{ width: "150px" }}
                size="large"
                placeholder="Trạng thái"
                options={[
                  { value: null, label: "tất cả" },
                  ...[0, 1, 2, 3].map((item) => {
                    return {
                      label: statusHistory(item),
                      value: item,
                    };
                  }),
                ]}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginBottom: "25px" }}
            >
              Lọc
            </Button>
          </Space>
        </Form>
      </Card>

      <Card title="Lịch sử quy đổi">
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
