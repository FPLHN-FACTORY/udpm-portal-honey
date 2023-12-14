import {
  Button,
  Card,
  Form,
  Input,
  Pagination,
  Space,
  Table,
  message,
  Tooltip,
  Select,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { RequestManagerAPI } from "../../../apis/censor/request-manager/requestmanager.api";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

export default function RequestConversionHistory() {
  const [getHistory, setGetHistory] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [filter, setFilter] = useState({ page: 0 });

  const fetchData = (filter) => {
    const fetchData = async (filter) => {
      try {
        const response = await RequestManagerAPI.getHistoryConversion(filter);
        console.log(response.data.data);
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
                studentName: user.data.data.name,
                userName: user.data.data.userName,
                nameTeacher: teacher ? teacher.data.data.name : null,
                userTeacher: teacher ? teacher.data.data.userName : null,
                namePresident: president ? president.data.data.name : null,
                userPresident: president ? president.data.data.userName : null,
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

  useEffect(() => {
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
        if (status === 1) message.success("Đã xác nhận yêu cầu!");
        if (status === 2) message.error("Hủy yêu cầu thành công!");
      }
      fetchData();
    });
  };

  const handCheckvalide = async (values) => {
    // const response = await RequestManagerAPI.getPoint(
    //   values.studentId,
    //   values.categoryId
    // );
    // const newFillPoint = response.data.data;

    // const totalPoint = values.quantityGift * values.honeyPoint;
    // if (totalPoint > newFillPoint) {
    // message.error("Sinh viên Không còn đủ điểm để mua quà!");
    // } else {
    changeStatusConversion(
      values.studentId,
      values.giftId,
      values.id,
      values.historyDetailId,
      1,
      values.quantityGift
    );
    // }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (text, record, index) => index + 1,
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
      title: "Vật phẩm",
      dataIndex: "gift",
      key: "gift",
      align: "center",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdDate",
      key: "createdDate",
      align: "center",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: () => <div>Hành động</div>,
      key: "action",
      align: "center",
      render: (_, values) => (
        <Space size="small">
          {values.status !== 1 && values.status !== 2 && (
            <Tooltip title="Xác nhận">
              <Button
                onClick={() => {
                  handCheckvalide(values);
                }}
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
                onClick={() => {
                  changeStatusConversion(
                    values.studentId,
                    values.giftId,
                    values.id,
                    values.historyDetailId,
                    2
                  );
                }}
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
            <Link to={"/censor/request-item/detail/" + values.id}>
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
      <Card title="Danh sách yêu cầu đổi quà">
        <Table
          columns={columns}
          rowKey="id"
          dataSource={getHistory}
          pagination={false}
        />
        <div className="mt-10 text-center mb-10">
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
    </div>
  );
}
