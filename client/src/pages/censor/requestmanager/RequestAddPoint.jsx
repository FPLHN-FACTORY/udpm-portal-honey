import {
  Button,
  Card,
  Form,
  Input,
  Pagination,
  Select,
  Table,
  message,
  Space,
  Tooltip,
  Tag,
  Row,
  Col,
  Modal,
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
            <Tooltip title="Từ chối">
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowKeysRecord, setSelectedRowKeysRecord] = useState([]);
  const start = () => {
    setSelectedRowKeys([]);
    setSelectedRowKeysRecord([]);
  };
  const onSelectChange = (newSelectedRowKeys, record) => {
    setSelectedRowKeysRecord(record);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const approveAll = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Bạn phải chọn một yêu cầu");
      return;
    }
    const result = selectedRowKeysRecord.map(
      (el) =>
        `Yêu cầu từ ${
          el.userTeacher !== null
            ? "Giảng viên " + el.userTeacher
            : "Chủ tịch " + el.userPresident
        }: Cộng ${el.honey} cho sinh viên ${el.userName}`
    );

    Modal.confirm({
      title: "Bạn có chắc chắn muốn xác nhận yêu cầu cộng mật ong",
      content: (
        <>
          <ul>
            {result.map((el) => (
              <li className="flex" key={el.id}>
                {" "}
                <div>🍯</div>
                <div>{`${el}`}</div>
              </li>
            ))}
          </ul>
        </>
      ),
      onOk: () => {
        const data = selectedRowKeysRecord.map((values) => ({
          idHistory: values.idHistory,
          status: 1,
        }));
        changeStatusAll(data, 1);
        // hoàn thành yêu cầu clear selectedRowKeys
        start();
      },
    });
  };

  const refuseAll = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Bạn phải chọn một yêu cầu");
      return;
    }
    const result = selectedRowKeysRecord.map(
      (el) =>
        `Yêu cầu từ ${
          el.userTeacher !== null
            ? "Giảng viên " + el.userTeacher
            : "Chủ tịch " + el.userPresident
        }: Cộng ${el.honey} cho sinh viên ${el.userName}`
    );

    Modal.confirm({
      title: "Bạn có chắc chắn muốn từ chối yêu cầu cộng mật ong",
      content: (
        <>
          <ul>
            {result.map((el) => (
              <li className="flex" key={el.id}>
                {" "}
                <div>🍯</div>
                <div>{`${el}`}</div>
              </li>
            ))}
          </ul>
        </>
      ),
      onOk: () => {
        const data = selectedRowKeysRecord.map((values) => ({
          idHistory: values.idHistory,
          status: 2,
        }));
        changeStatusAll(data, 2);
        // hoàn thành yêu cầu clear selectedRowKeys
        start();
      },
    });
  };

  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0, status: 0, size: 10 });

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
      createdDate: moment(data.createdDate).format("DD-MM-YYYY HH:mm:ss"),
      acction: {
        idHistory: data.idHistory,
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
    Modal.confirm({
      title: `Bạn có chắc chắn muốn ${
        status === 1 ? "xác nhận" : "hủy"
      } yêu cầu cộng mật ong`,
      onOk: () => {
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
      },
    });
  };

  const changeStatusAll = (data, status) => {
    RequestManagerAPI.changeStatusAll(data)
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
      <Card>
        <Row className="justify-between items-center mb-2">
          <Col>
            <h1 className="lable">Danh sách yêu cầu</h1>
          </Col>
          <Col>
            <Button onClick={() => approveAll()} type="primary mr-2">
              Phê duyệt
            </Button>
            <Button onClick={() => refuseAll()} type="primary">
              Từ chối
            </Button>
          </Col>
        </Row>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          rowKey="key"
          pagination={false}
        />
        <div className="mt-10 text-center mb-10">
          <Pagination
            showSizeChanger
            current={filter.page + 1}
            onChange={(page, size) => {
              setFilter({ ...filter, page: page - 1, size: size });
            }}
            total={totalPage}
            pageSizeOptions={[
              "10",
              "20",
              "30",
              "40",
              "50",
              "60",
              "70",
              "80",
              "90",
              "100",
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
