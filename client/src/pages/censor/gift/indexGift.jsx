import {
  Card,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { DeleteOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  FormOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ModalDetailGift from "./ModalDetailGift";
import ModalAma from "./ModalAddGift";
import ModalDelete from "./deleteGift";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetGift, SetGift } from "../../../app/reducers/gift/gift.reducer";

export default function IndexGift() {
  const [showModal, setShowModal] = useState(false);
  const [detailGift, setDetailGift] = useState();
  const [current, setCurrent] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const [showModalDetail, setShowModalDetail] = useState(false);

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = () => {
    GiftAPI.fetchAll({
      search: search,
      page: current - 1,
    }).then((response) => {
      dispatch(SetGift(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const DeleteGift = (id) => {
    GiftAPI.delete(id)
      .then(() => {
        fetchData();
        message.success("Xóa quà thành công!");
      })
      .catch((error) => {
        message.error("Lỗi xóa quà: " + error.message);
      })
      .finally(() => {
        setConfirmDelete(false);
      });
  };

  const data = useAppSelector(GetGift);

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
        const byteArray = image ? image.split(",").map(Number) : [];

        const base64ImageData = btoa(
          String.fromCharCode.apply(null, new Uint8Array(byteArray))
        );

        const imageUrl = `data:image/jpeg;base64,${base64ImageData}`;

        return (
          <img
            src={imageUrl}
            style={{ width: "40px", height: "40px" }}
            alt="Hình ảnh"
          />
        );
      },
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tên phần quà",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (quantity !== null ? quantity : "vô hạn"),
    },
    {
      title: "Kiểu",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        switch (type) {
          case 0:
            return "Quà tặng";
          case 1:
            return "Vật phẩm nâng cấp";
          case 2:
            return "Dụng cụ";
          default:
            return "Không xác định";
        }
      },
    },
    {
      title: "Điểm",
      dataIndex: "honey",
      key: "honey",
    },
    {
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Cập nhập">
            <button
              className="update-button"
              onClick={() => {
                setDetailGift(record);
                setShowModalDetail(true);
              }}
            >
              <EditOutlined className="icon" />
            </button>
          </Tooltip>
          <Tooltip title="Xóa">
            <button
              onClick={() => {
                setDetailGift(record);
                setConfirmDelete(true);
              }}
            >
              <DeleteOutlined className="icon" />
            </button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      {showModal && (
        <ModalAma
          modalOpen={showModal}
          setModalOpen={setShowModal}
          gift={detailGift}
          setGift={setDetailGift}
        />
      )}
      {showModalDetail && (
        <ModalDetailGift
          gift={detailGift}
          visible={showModalDetail}
          onCancel={() => setShowModalDetail(false)}
          onUpdate={() => {
            setShowModalDetail(false);
          }}
        />
      )}
      <Modal
        title="Xác nhận xóa"
        visible={confirmDelete}
        onOk={() => {
          if (detailGift) {
            DeleteGift(detailGift.id);
          }
        }}
        onCancel={() => setConfirmDelete(false)}
        okText="Xóa"
        cancelText="Hủy"
      >
        Bạn có chắc chắn muốn xóa quà này?
      </Modal>
      <Card className="mb-2">
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "10px", width: "40%" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm kiếm tên hoặc mã..."
            />
            <button
              type="button"
              className="search-button1"
              icon={<SearchOutlined />}
              onClick={() => {
                setCurrent(1);
                fetchData();
              }}
              style={{ borderRadius: "10px", marginLeft: "20px" }}
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </Card>

      <Card>
        <div>
          <div className="flex flex-row-reverse">
            <div>
              <span>
                <Tooltip title="Thêm quà">
                  <button
                    className="add-button1"
                    onClick={() => {
                      setShowModal(true);
                      setDetailGift(null);
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    <PlusOutlined className="mr-1" />
                    Thêm quà
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
              fetchData();
            }}
            total={total}
          />
        </div>
      </Card>
    </>
  );
}
