import React, { useEffect, useState } from "react";
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
} from "antd";
import {
  SearchOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AddPointAPI } from "../../../apis/teacher/add-point/add-point.api";
import { TeacherUseGiftApi } from "../../../apis/teacher/convertion-honey/convertion-honey.api";
import {
  GetHistory,
  SetHistory,
} from "../../../app/reducers/history/history.reducer";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRectangleList } from "@fortawesome/free-solid-svg-icons";

const statusHistory = (status) => {
  switch (status) {
    case "0":
      return <Tag color="geekblue">Chờ phê duyệt</Tag>; // Màu xanh dương
    case "1":
      return <Tag color="green">Đã phê duyệt</Tag>; // Màu xanh lá cây
    case "2":
      return <Tag color="volcano">Đã hủy</Tag>; // Màu đỏ
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function RequestConversionHistory() {
  const dispatch = useAppDispatch();
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Email sinh viên",
      dataIndex: "emailStudent",
      key: "emailStudent",
    },
    {
      title: "Loại quà",
      dataIndex: "nameGift",
      key: "nameGift",
    },
    {
      title: "Lớp",
      dataIndex: "lop",
      key: "lop",
    },
    {
      title: "Môn",
      dataIndex: "mon",
      key: "mon",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
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
  ];

  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0, status: 1 });
  const [filterClass, setFilterClass] = useState([]);
  const [filterGift, setFilterGift] = useState([]);

  useEffect(() => {
    TeacherUseGiftApi.getFilterClass().then((result) => {
      setFilterClass(result.data.data);
    });
    TeacherUseGiftApi.getFilterGift().then((result) => {
      setFilterGift(result.data.data);
    });
  }, []);

  const fetchData = async (filter) => {
    try {
      const response = await TeacherUseGiftApi.getRequestUseGift(filter);
      const listHistory = await Promise.all(
        response.data.data.data.map(async (data) => {
          try {
            const user = await AddPointAPI.getStudent(data.studentId);
            return {
              ...data,
              emailStudent: user.data.data.email,
            };
          } catch (error) {
            return data;
          }
        })
      );
      dispatch(SetHistory(listHistory));
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(filter);
  }, []);

  const data = useAppSelector(GetHistory).map((data) => {
    return {
      ...data,
      key: data.id,
      status: statusHistory(data.status),
      createdDate: moment(data.createdDate).format("DD-MM-YYYY"),
      acction: { idHistory: data.id },
    };
  });

  const onFinishSearch = (value) => {
    if (value.email === undefined || value.email.trim().length === 0) {
      fetchData({
        ...filter,
        status: value.status,
        gift: value.gift,
        lop: value.lop,
      });
    } else {
      fetchData({
        ...filter,
        status: value.status,
        email: value.email,
        gift: value.gift,
        lop: value.lop,
      });
    }
  };

  return (
    <div className="add-point">
      <Card
        className="mb-2"
        style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}
      >
        {" "}
        <FontAwesomeIcon
          icon={faFilter}
          size="2px"
          style={{ fontSize: "26px" }}
        />{" "}
        <span
          style={{
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Bộ lọc
        </span>
        <Form onFinish={onFinishSearch}>
          <Space size={"large"} style={{ marginTop: "15px" }}>
            <Form.Item name="email" className="search-input">
              <Input
                style={{ width: "300px" }}
                size="small"
                placeholder="Nhập email sinh viên cần tìm"
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Form.Item name={"gift"}>
              <Select
                showSearch
                style={{ width: "150px" }}
                size="large"
                placeholder="Loại quà"
                options={[
                  { value: null, label: "Tất cả" },
                  ...filterGift.map((gift) => {
                    return {
                      value: gift.id,
                      label: gift.name,
                    };
                  }),
                ]}
              />
            </Form.Item>
            <Form.Item name={"lop"}>
              <Select
                showSearch
                style={{ width: "150px" }}
                size="large"
                placeholder="Lớp"
                options={[
                  { value: null, label: "Tất cả" },
                  ...filterClass.map((fclass) => {
                    return {
                      value: fclass,
                      label: fclass,
                    };
                  }),
                ]}
              />
            </Form.Item>
            <Form.Item name={"status"}>
              <Select
                defaultValue={filter.status}
                showSearch
                style={{ width: "150px" }}
                size="large"
                placeholder="Trạng thái"
                options={[
                  { value: 1, label: statusHistory("1") },
                  { value: 2, label: statusHistory("2") },
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
      <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
        <Space
          style={{
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>
            <span style={{ fontSize: "18px" }}>
              <FontAwesomeIcon icon={faRectangleList} size="xl" />
              <b style={{ marginLeft: "5px", fontWeight: "500" }}>
                Danh sách yêu cầu
              </b>
            </span>
          </div>
        </Space>
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
