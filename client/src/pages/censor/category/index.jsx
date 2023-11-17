/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Button,
  Pagination,
  Space,
  Table,
  Card,
  Input,
  Tooltip,
  Modal,
  message,
  Row,
  Col,
  Select,
} from "antd";
import {
  PlusOutlined,
  FormOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import ModalThem from "./ModalAdd";
import ModalDetail from "./ModalDetail";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faRectangleList,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Option } from "antd/es/mentions";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [detailCategory, setDetailCategory] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("");
  const [transaction, setTransaction] = useState("");

  useEffect(() => {
    CategoryAPI.fetchAll().then((response) => {
      dispatch(SetCategory(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = () => {
    let filter = {
      search: search,
      status: status,
      transactionRights: transaction,
      page: current - 1,
    };
    CategoryAPI.fetchAll(filter).then((response) => {
      dispatch(SetCategory(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const deletect = (id) => {
    CategoryAPI.delete(id)
      .then(() => {
        fetchData();
        message.success("Xóa thể loại thành công!");
      })
      .catch((error) => {
        message.error("Lỗi xóa thể loại: " + error.message);
      })
      .finally(() => {
        setConfirmDelete(false);
      });
  };

  const buttonClear = async () => {
    setSearch("");
    setStatus("");
    setTransaction("");
    setCurrent(1);
    await fetchData();
  };

  const data = useAppSelector(GetCategory);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => {
        if (image) {
          return (
            <div style={{ textAlign: "center" }}>
              <img
                src={image}
                style={{ width: "40px", height: "40px", margin: "auto" }}
                alt="Hình ảnh"
              />
            </div>
          );
        } else {
          return <div>Chưa có ảnh</div>;
        }
      },
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Loại mật ong",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Phê duyệt",
      dataIndex: "categoryStatus",
      key: "categoryStatus",
      align: "center",
      render: (text) => {
        console.log(text);
        if (text === "2") {
          return (
            <span style={{ color: "green" }}>
              <CheckOutlined />
            </span>
          );
        } else {
          return (
            <span style={{ color: "red" }}>
              <CloseOutlined />
            </span>
          );
        }
      },
    },
    {
      title: "Giao dịch",
      dataIndex: "transactionRights",
      key: "transactionRights",
      align: "center",
      render: (text) => {
        if (text === "0") {
          return (
            <span style={{ color: "green" }}>
              <CheckOutlined />
            </span>
          );
        } else {
          return (
            <span style={{ color: "red" }}>
              <CloseOutlined />
            </span>
          );
        }
      },
    },
    {
      title: () => <div>Hành động</div>,
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <ModalDetail
            category={record}
            fetchData={fetchData}
            icon={<FormOutlined />}
          />
          <Tooltip title="Xóa">
            <Button
              onClick={() => {
                setDetailCategory(record);
                setConfirmDelete(true);
              }}
              style={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      {showModal && (
        <ModalThem
          modalOpen={showModal}
          setModalOpen={setShowModal}
          category={detailCategory}
          SetCategory={setDetailCategory}
          fetchData={fetchData}
        />
      )}
      <Modal
        title="Xác nhận xóa"
        visible={confirmDelete}
        onOk={() => {
          if (detailCategory) {
            deletect(detailCategory.id);
          }
        }}
        onCancel={() => setConfirmDelete(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        Bạn có chắc chắn muốn xóa quà này?
      </Modal>

      <Card style={{ borderTop: "5px solid #FFCC00" }}>
        <div className="filter__auction">
          <FontAwesomeIcon
            icon={faFilter}
            size="2px"
            style={{ fontSize: "26px" }}
          />{" "}
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
          <Row gutter={24} style={{ marginBottom: "15px", paddingTop: "20px" }}>
            <Col span={8}>
              <span>Tên thể loại:</span>{" "}
              <Input
                style={{ height: "30px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col span={8}>
              <span>Trạng thái:</span>
              {""}
              <Select
                value={status}
                onChange={(value) => {
                  setStatus(value);
                  console.log(value);
                }}
                style={{
                  width: "100%",
                  fontSize: "13px",
                }}
              >
                <Option
                  value=""
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Tất cả
                </Option>
                <Option
                  value="2"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Phê duyệt
                </Option>
                <Option
                  value="1"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Không phê duyệt
                </Option>
              </Select>
            </Col>
            <Col span={8}>
              <span>Giao dịch:</span>
              {""}
              <Select
                value={transaction}
                onChange={(value) => {
                  setTransaction(value);
                }}
                style={{
                  width: "100%",
                  fontSize: "13px",
                }}
              >
                <Option
                  value=""
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Tất cả
                </Option>
                <Option
                  value="0"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Được giao dịch
                </Option>
                <Option
                  value="1"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Không giao dịch
                </Option>
              </Select>
            </Col>
          </Row>
        </div>
        <Space
          style={{
            justifyContent: "center",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <Row>
            <Col span={12}>
              <Button
                onClick={() => {
                  setCurrent(1);
                  fetchData();
                }}
                style={{
                  marginRight: "8px",
                  backgroundColor: "rgb(55, 137, 220)",
                  color: "white",
                }}
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={buttonClear}
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#FF9900",
                  color: "white",
                  outline: "none",
                  border: "none",
                }}
              >
                Làm mới
              </Button>
            </Col>
          </Row>
        </Space>
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
                Danh sách thể loại
              </b>
            </span>
          </div>
          <div className="flex flex-row-reverse">
            <div>
              <span>
                <button
                  className="add-button1"
                  onClick={() => {
                    setShowModal(true);
                    setDetailCategory(null);
                  }}
                >
                  <PlusOutlined className="mr-1" />
                  Thêm thể loại
                </button>
              </span>
            </div>
          </div>
        </Space>

        <div className="mt-5">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={false}
          />
        </div>
        <div className="mt-5 text-center">
          <Pagination
            simple
            current={current}
            onChange={(value) => {
              setCurrent(value);
            }}
            total={total * 10}
          />
        </div>
      </Card>
    </>
  );
}
