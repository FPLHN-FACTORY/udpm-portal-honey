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
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  FormOutlined,
  DeleteOutlined,
  SearchOutlined,
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

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [detailCategory, setDetailCategory] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

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
    CategoryAPI.fetchAll({
      search: search,
      page: current - 1,
    }).then((response) => {
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

  const data = useAppSelector(GetCategory);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        if (image) {
          // Chuyển đổi chuỗi byte thành mảng byte
          const byteArray = image.split(",").map(Number);

          // Tạo một Uint8Array từ mảng byte
          const uint8Array = new Uint8Array(byteArray);

          // Chuyển đổi Uint8Array thành Blob
          const blob = new Blob([uint8Array], { type: "image/jpeg" });

          // Tạo URL dữ liệu từ Blob
          const imageUrl = URL.createObjectURL(blob);

          return (
            <img
              src={imageUrl}
              style={{ width: "40px", height: "40px" }}
              alt="Hình ảnh"
            />
          );
        } else {
          return <div>Chưa có ảnh</div>; // Xử lý trường hợp không có hình ảnh
        }
      },
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Loại mật",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phê duyệt",
      dataIndex: "categoryStatus",
      key: "categoryStatus",
      render: (text) => {
        if (text === "0") {
          return <span>Không phê duyệt</span>;
        } else {
          return <span>Phê duyệt</span>;
        }
      },
    },
    {
      title: "Quy đổi",
      dataIndex: "transactionRights",
      key: "transactionRights",
      render: (text) => {
        if (text === "0") {
          return <span>Được giao dịch</span>;
        } else {
          return <span>Không giao dịch</span>;
        }
      },
    },
    {
      title: () => <div>Hành động</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          {/* <Tooltip title="Cập nhật">
            <Button
              className="update-button"
              onClick={() => {
                setDetailCategory(record);
                setShowModal(true);
                console.log(record);
              }}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip> */}

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
              className="detail-button"
            >
              <DeleteOutlined className="icon" />
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

      <Card className="mb-2">
        <h1 className="text-xl">Tìm kiếm thể loại</h1>
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "30px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm tên hoặc mã..."
            />
          </div>
          <button
            type="button"
            className="search-button1"
            icon={<SearchOutlined />}
            onClick={() => {
              setCurrent(1);
              fetchData();
            }}
            style={{ marginTop: "20px" }}
          >
            Tìm kiếm
          </button>
        </form>
      </Card>

      <Card>
        <div>
          <div className="flex flex-row-reverse">
            <div>
              <span>
                <Tooltip title="Thêm thể loại">
                  <button
                    className="add-button1"
                    onClick={() => {
                      setShowModal(true);
                      setDetailCategory(null);
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    <PlusOutlined className="mr-1" />
                    Thêm thể loại
                  </button>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>

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
