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
  Popconfirm,
  message,
  Row,
  Col,
} from "antd";
import {
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { GetChest, SetChest } from "../../../app/reducers/chest/chest.reducer";
import { ChestAPI } from "../../../apis/censor/chest/chest.api";
import ModalAdd from "./ModalCreateChest";
import ModalAddGiftToChest from "./ModalAddGiftsToChest";
import ModalDetail from "./ModalDetailChestGift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRectangleList, faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function ChestGift() {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [detailChest, setDetailChest] = useState();

  useEffect(() => {
    if (!showModal) {
      ChestAPI.fetchAll().then((response) => {
        dispatch(SetChest(response.data.data.data));
        setTotal(response.data.data.totalPages);
        setCurrent(1);
      });
    }
  }, [showModal]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    ChestAPI.fetchAll({
      search: search,
      page: current - 1,
    }).then((response) => {
      dispatch(SetChest(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  }, [current]);

  const fetchData = () => {
    ChestAPI.fetchAll({
      search: "",
      page: current - 1,
    }).then((response) => {
      dispatch(SetChest(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const buttonClear = () => {
    setSearch("");
    setCurrent(1);
    ChestAPI.fetchAll({
      search: "",
      page: current - 1,
    }).then((response) => {
      dispatch(SetChest(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const handleSearch = () => {
    setCurrent(1);
    ChestAPI.fetchAll({
      search: search,
      page: 0,
    }).then((response) => {
      dispatch(SetChest(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const confirm = (chest) => {
    ChestAPI.delete(chest.id).then(
      (response) => {
        setCurrent(1);
        fetchData();
        message.success("Xóa thành công");
      },
      (err) => {
        message.error("Xóa thất bại");
      }
    );
  };

  const data = useAppSelector(GetChest);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 60,
      align: "center",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Hành động",
      key: "action",
      width: 60,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Cập nhật">
            <Button
              className="update-button"
              onClick={() => {
                setDetailChest(record);
                setShowModal(true);
              }}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip>

          <ModalDetail chest={record} icon={<EyeOutlined />} />

          <ModalAddGiftToChest chest={record} icon={<PlusCircleOutlined />} />

          <Popconfirm
            title="Xóa rương"
            description="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => {
              confirm(record);
            }}
            color="cyan"
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Xóa">
              <Button
                type="primary"
                className="bg-red-400 text-white hover:bg-red-300"
              >
                <DeleteOutlined style={{ fontSize: "15px" }} />
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      {showModal && (
        <ModalAdd
          modalOpen={showModal}
          setModalOpen={setShowModal}
          chest={detailChest}
          SetChest={setDetailChest}
        />
      )}
      <Card
        className="mb-2"
        style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}
      >
        <FontAwesomeIcon
          icon={faFilter}
          size="2px"
          style={{ fontSize: "26px" }}
        />{" "}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
        {/* <div class="relative w-full mr-6">
          <Input
            style={{ borderRadius: "30px", marginTop: "20px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nhập tên..."
          />
        </div> */}
        <Row gutter={24} style={{ marginBottom: "15px", paddingTop: "20px" }}>
          <Col span={24}>
            <span>Tên rương:</span>
            {""}
            <Input
              style={{ width: "100%", height: "30px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // placeholder="Nhập tên..."
            />
          </Col>
        </Row>
        <Space
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "20px",
          }}
        >
          <Button
            type="button"
            style={{
              marginRight: "8px",
              backgroundColor: "rgb(55, 137, 220)",
              color: "white",
            }}
            onClick={() => handleSearch()}
          >
            Tìm kiếm
          </Button>
          <Button
            type="button"
            style={{
              marginLeft: "8px",
              backgroundColor: "#FF9900",
              color: "white",
              outline: "none",
              border: "none",
            }}
            onClick={() => {
              buttonClear();
            }}
          >
            Làm mới
          </Button>
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
                Danh sách rương
              </b>
            </span>
          </div>
          <div className="flex flex-row-reverse">
            <div>
              {/* <span>
                <Tooltip title="Tạo rương">
                  <button
                    className="add-button1"
                    onClick={() => {
                      setShowModal(true);
                      setDetailChest(null);
                    }}
                  >
                    <PlusOutlined className="mr-1" />
                    Tạo rương
                  </button>
                </Tooltip>
              </span> */}
              <Button
                style={{
                  color: "white",
                  backgroundColor: "rgb(55, 137, 220)",
                  textAlign: "center",
                }}
                onClick={() => {
                  setShowModal(true);
                  setDetailChest(null);
                }}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  size="1x"
                  style={{
                    backgroundColor: "rgb(55, 137, 220)",
                    marginRight: "5px",
                  }}
                />
                Tạo rương
              </Button>
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
        {total >= 1 && (
          <div className="mt-5 text-center" style={{ marginTop: "20px" }}>
            <Pagination
              simple
              current={current}
              onChange={(value) => {
                setCurrent(value);
              }}
              total={total * 10}
            />
          </div>
        )}
      </Card>
    </>
  );
}
