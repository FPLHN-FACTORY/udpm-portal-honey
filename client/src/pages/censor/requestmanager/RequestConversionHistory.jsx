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
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import TabsRequest from "./TabsRequest";

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

export default function RequestConversionHistory() {
  const [getHistory, setGetHistory] = useState([]);
  const [fillCategory, setFillCategory] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });
  const [fillUserApi, setFillUserApi] = useState([]);
  const [type, setType] = useState();
  const fechUserApiById = () => {
    ResquestConversion.getUserAPiByid().then((response) => {
      setFillUserApi({
        ...response.data.data,
        khoa: "17.3",
        phone: "0763104018",
      });
      console.log(response.data.data.idUser);
    });
  };

  useEffect(() => {
    fechUserApiById();
  }, []);

  const fechData = (filter) => {
    RequestManagerAPI.getHistoryConversion(filter).then((response) => {
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

  const changeStatusConversion = (idStudent, idGift, idHistory, status) => {
    RequestManagerAPI.changeStatusConversion(
      idStudent,
      idGift,
      idHistory,
      status
    )
      .then((response) => {
        if (response.data.success) {
          if (status === 1) message.success("Đã xác nhận yêu cầu cộng điểm!");
          if (status === 2) message.error("Hủy yêu cầu thành công!");
          setType(response.data.data.type);
        }
        // message.success("Phê duyệt thành công");
        fechData();
      })
      .catch((error) => {
        message.error(error);
      });
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
      dataIndex: "studentId", // Thay userId bằng trường dữ liệu người dùng bạn muốn hiển thị
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
            {console.log(values)}
            {values.status !== 1 && values.status !== 2 && (
              <CheckCircleFilled
                onClick={() => {
                  const dataStatus = {
                    idStudent: values.studentId,
                    note: values.note,
                    idGift: values.giftId,
                  };
                  changeStatusConversion(
                    values.studentId,
                    values.giftId,
                    values.id,
                    1
                  );
                }}
              />
            )}
            {values.status !== 1 && values.status !== 2 && (
              <CloseCircleFilled
                style={{ fontSize: "19px", margin: "0px 10px", color: "red" }}
                onClick={() => changeStatusConversion(values.id, 2)}
              />
            )}
          </div>
        </Space>
      ),
    },
  ];
  console.log(fillUserApi.name);
  return (
    <>
      <TabsRequest selectIndex={1} type={type} />
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

      <Card title="Danh sách yêu cầu đồi quà">
        <div className="mt-5">
          <Table
            columns={columns}
            rowKey="id"
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.note}</p>
              ),
              rowExpandable: (record) => record.note !== "Not Expandable",
            }}
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
