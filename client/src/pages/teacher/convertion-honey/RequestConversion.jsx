import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Pagination,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TeacherUseGiftApi } from "../../../apis/teacher/convertion-honey/convertion-honey.api";
import {
  GetHistory,
  SetHistory,
} from "../../../app/reducers/history/history.reducer";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faFilter,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

export default function RequestConversion() {
  const dispatch = useAppDispatch();
  const [note, setNote] = useState("");
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Yêu cầu",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Lớp",
      dataIndex: "lop",
      key: "lop",
      align: "center",
    },
    {
      title: "Môn",
      dataIndex: "mon",
      key: "mon",
      align: "center",
    },
    {
      title: "Ngày tạo",
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
        // <>
        <Space size="small">
          <Tooltip title="Hủy yêu cầu">
            <Popconfirm
              title="Vui lòng nhập lý do hủy"
              description={
                <Input
                  defaultValue={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              }
              onConfirm={() => {
                cancel(values.idHistory);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                style={{
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                <FontAwesomeIcon icon={faClose} />
              </Button>
            </Popconfirm>
          </Tooltip>
          <Tooltip title="Xác nhận">
            <Button
              onClick={() => accept(values.idHistory)}
              style={{
                backgroundColor: "yellowgreen",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState({ page: 0, status: 0 });
  const [filterClass, setFilterClass] = useState([]);

  useEffect(() => {
    TeacherUseGiftApi.getFilterClass().then((result) => {
      setFilterClass(result.data.data);
    });
  }, []);

  const fetchData = async (filter) => {
    try {
      const response = await TeacherUseGiftApi.getRequestUseGift(filter);
      // const listHistory = await Promise.all(
      //   response.data.data.data.map(async (data) => {
      //     try {
      //       const user = await AddPointAPI.getStudent(data.studentId);
      //       return {
      //         ...data,
      //         emailStudent: user.data.data.email,
      //       };
      //     } catch (error) {
      //       console.error(error);
      //       return data;
      //     }
      //   })
      // );
      dispatch(SetHistory(response.data.data.data));
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData(filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useAppSelector(GetHistory).map((data) => {
    return {
      ...data,
      key: data.id,
      createdDate: moment(data.createdDate).format("DD-MM-YYYY"),
      acction: { idHistory: data.id },
    };
  });

  const onFinishSearch = (value) => {
    if (value.email === undefined || value.email.trim().length === 0) {
      fetchData({
        ...filter,
        gift: value.gift,
        lop: value.lop,
      });
    } else {
      fetchData({
        ...filter,
        email: value.email,
        gift: value.gift,
        lop: value.lop,
      });
    }
  };

  const accept = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn phê duyệt không?",
      onOk: () => {
        TeacherUseGiftApi.accpect(id)
        .then((result) => {
        fetchData(filter);
          message.success("Phê duyệt thành công");
        })
        .catch((error) => {
          message.success("Lỗi hệ thống");
        })
      }
    })
  };
  const cancel = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn từ chối không?",
      onOk: () => {
        TeacherUseGiftApi.cancel(id, note)
        .then((result) => {
          fetchData(filter);
          message.success("Từ chối thành công");
        })
        .catch((error) => {
          message.success("Lỗi hệ thống");
        })
      }
    })
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const handleConfirm = () => {
    if (selectedRowKeys.length === 0) {
      message.error("Vui lòng chọn ít nhất 1 yêu cầu phê duyệt!");
      return;
    }
    Modal.confirm({
      title: "Bạn có chắc chắn muốn phê duyệt danh sách yêu cầu không?",
      onOk: () => {
        TeacherUseGiftApi.accpectAll({
          listId: selectedRowKeys,
        }).then(() => {
          fetchData();
          message.success("Phê duyệt yêu cầu thành công");
        }).catch(() => {
          message.error("Phê duyệt yêu cầu thất bại")
        });
      }
    })
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
                  style={{ width: "400px" }}
                  size="small"
                  placeholder="Nhập email sinh viên cần tìm"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
              <Form.Item name={"gift"}>
                <Select
                  showSearch
                  style={{ width: "260px" }}
                  size="large"
                  placeholder="Loại quà"
                  options={[
                    { value: null, label: "Tất cả" },
                  ]}
                />
              </Form.Item>
              <Form.Item name={"lop"}>
                <Select
                  showSearch
                  style={{ width: "260px" }}
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
              display: "flex",
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
            <div className="flex flex-row-reverse">
              <div>
                <span>
                  <Tooltip>
                    <button
                      className="add-button1"
                      onClick={() => {
                        handleConfirm();
                      }}
                    >
                      Xác nhận{" "}
                    </button>
                  </Tooltip>
                </span>
              </div>
            </div>
          </Space>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey="key"
            pagination={false}
        />
        <div className="mt-10 text-center mb-10">
        {
          totalPage > 1 &&
          
            <Pagination
              simple
              current={filter.page + 1}
              onChange={(page) => {
                setFilter({ ...filter, page: page - 1 });
              }}
              total={totalPage * 10}
            />
          
          }
        </div>
        </Card>
      </div>
  );
}
