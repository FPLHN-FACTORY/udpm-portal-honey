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
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetHistory,
  SetHistory,
} from "../../../app/reducers/history/history.reducer";
import { AddPointAPI } from "../../../apis/censor/add-point/add-point.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

// const statusHistory = (status) => {
//   switch (status) {
//     case 1:
//       return (
//         <Tag style={{ width: "80px", textAlign: "center" }} color="green">
//           Gửi thành công
//         </Tag>
//       ); // Màu xanh lá cây
//     case 2:
//       return (
//         <Tag style={{ width: "80px", textAlign: "center" }} color="volcano">
//           Gửi thất bại
//         </Tag>
//       ); // Màu đỏ
//     default:
//       return <Tag>Không xác định</Tag>;
//   }
// };

export default function HistoryAddPoint() {
  const dispatch = useAppDispatch();
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "nameStudent",
      key: "nameStudent",
      align: "center",
    },
    {
      title: "Loại điểm",
      dataIndex: "nameCategory",
      key: "nameCategory",
      align: "center",
    },
    {
      title: "Số điểm",
      dataIndex: "honeyPoint",
      key: "honeyPoint",
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
    },
    {
      title: "Lý do",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];

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
      // status: statusHistory(data.status),
      createdDate: moment(data.createdDate).format("DD-MM-YYYY"),
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
                style={{ width: "300px" }}
                size="small"
                placeholder="Nhập mã sinh viên cần tìm"
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
