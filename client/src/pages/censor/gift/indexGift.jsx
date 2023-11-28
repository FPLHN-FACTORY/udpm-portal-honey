import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { PlusOutlined } from "@ant-design/icons";
import ModalDetailGift from "./ModalDetailGift";
import ModalAma from "./ModalAddGift";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetGift, SetGift } from "../../../app/reducers/gift/gift.reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Option } from "antd/es/mentions";
import { CategoryAPI } from "../../../apis/censor/category/category.api";

export default function IndexGift() {
  const [showModal, setShowModal] = useState(false);
  const [detailGift, setDetailGift] = useState();
  const [current, setCurrent] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [listCategorySearch, setListCategorySearch] = useState([]);
  const [honeyCategoryId, setHoneyCategoryId] = useState("");
  const dispatch = useAppDispatch();
  const [showModalDetail, setShowModalDetail] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = "Quản lý vật phẩm";
    fetchAllCate();
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const fetchData = () => {
    GiftAPI.fetchAll({
      search: search,
      categoryId: honeyCategoryId,
      page: current - 1,
    }).then((response) => {
      console.log(response.data.data.data);
      dispatch(SetGift(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const buttonClear = () => {
    setSearch("");
    setHoneyCategoryId("");
    setCurrent(1);
    GiftAPI.fetchAll({
      search: "",
      categoryId: "",
      page: current - 1,
    }).then((response) => {
      console.log(response.data.data.data);
      dispatch(SetGift(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const fetchAllCate = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      setListCategorySearch(response.data.data);
    });
  };

  const DeleteGift = (id) => {
    GiftAPI.delete(id)
      .then(() => {
        fetchData();
        message.success("Xóa vật phẩm thành công!");
      })
      .catch((error) => {
        message.error("Lỗi xóa vật phẩm: " + error.response.data.message);
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
      align: "center",
      render: (text, record, index) => (current - 1) * 5 + (index + 1),
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
      title: "Tên vật phẩm",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (quantity) => (quantity !== null ? quantity : "Vô hạn"),
    },
    {
      title: "Kiểu",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (type) => {
        switch (type) {
          case 0:
            return "Quà tặng";
          case 1:
            return "Vật phẩm nâng cấp";
          case 2:
            return "Danh hiệu";
          default:
            return "Không xác định";
        }
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "expiry",
      key: "expiry",
      align: "center",
      render: (type) => {
        switch (type) {
          case "VINH_VIEN":
            return "Vĩnh viễn";
          case "CHUA_HOAT_DONG":
            return "Chưa hoạt động";
          case "DANG_HOAT_DONG":
            return "Đang hoạt động";
          default:
            return "Hết hạn";
        }
      },
    },

    {
      title: () => <div>Hành động</div>,
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Cập nhật">
            <Button
              onClick={() => {
                setDetailGift(record);
                setShowModalDetail(true);
              }}
              style={{
                backgroundColor: "yellowgreen",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              onClick={() => {
                setDetailGift(record);
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
        <ModalAma
          modalOpen={showModal}
          setModalOpen={setShowModal}
          fetchData={fetchData}
          gift={detailGift}
          setGift={setDetailGift}
        />
      )}
      {showModalDetail && (
        <ModalDetailGift
          gift={detailGift}
          fetchData={fetchData}
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
        Bạn có chắc chắn muốn xóa vật phẩm này?
      </Modal>
      <Card style={{ borderTop: "5px solid #FFCC00", marginBottom: 30 }}>
        <div className="filter__auction">
          <FontAwesomeIcon
            icon={faFilter}
            size="2px"
            style={{ fontSize: "26px" }}
          />{" "}
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
          <Row gutter={24} style={{ marginBottom: "15px", paddingTop: "20px" }}>
            <Col span={12}>
              <span>Tên hoặc mã:</span>{" "}
              <Input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{ height: "30px" }}
              />
            </Col>
            <Col span={12}>
              <span>Thể loại:</span>
              {""}
              <Select
                style={{ width: "100%", marginRight: "10px" }}
                value={honeyCategoryId}
                onChange={(value) => {
                  setHoneyCategoryId(value);
                }}
              >
                <Option value="">Tất cả</Option>
                {listCategorySearch.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
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

      <Card>
        <div>
          <div className="flex flex-row-reverse">
            <div>
              <span>
                <Tooltip title="Thêm vật phẩm">
                  <button
                    className="add-button1"
                    onClick={() => {
                      setShowModal(true);
                      setDetailGift(null);
                    }}
                    style={{ marginBottom: "20px" }}
                  >
                    <PlusOutlined className="mr-1" />
                    Thêm vật phẩm
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
