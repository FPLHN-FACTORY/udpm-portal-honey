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
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
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
import DeleteChest from "./ModalDeleteChestGift";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faRectangleList } from "@fortawesome/free-solid-svg-icons";

export default function ChestGift() {
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [detailChest, setDetailChest] = useState();
  useEffect(() => {
    ChestAPI.fetchAll().then((response) => {
      dispatch(SetChest(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = () => {
    ChestAPI.fetchAll({
      search: search,
      page: current - 1,
    }).then((response) => {
      dispatch(SetChest(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const buttonClear = () => {
    setSearch("");
    fetchData();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrent(1);
    fetchData();
  };

  const data = useAppSelector(GetChest);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: () => <div>Hành động</div>,
      key: "action",
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
          <DeleteChest chest={record} icon={<DeleteOutlined />} />
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
        <Row class="flex items-center" onSubmit={handleSearch}>
          <Col xl={18}>
            <div class="relative w-full mr-6">
              <Input
                style={{ borderRadius: "30px", marginTop: "20px" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Nhập tên..."
              />
            </div>
          </Col>
          <Col xl={6}>
            <Space
              style={{
                justifyContent: "center",
                display: "flex",
                marginBottom: "16px",
              }}
            >
              <Button
                className="search-button1"
                style={{ marginTop: "20px", backgroundColor: "#537fe7" }}
                onClick={() => {
                  buttonClear();
                }}
              >
                Làm mới
              </Button>
              <Button
                className="search-button1"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  setCurrent(1);
                  fetchData();
                }}
              >
                Tìm kiếm
              </Button>
            </Space>
          </Col>
        </Row>
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
              <span>
                <Tooltip title="Tạo rương">
                  <Button
                    className="add-button1"
                    onClick={() => {
                      setShowModal(true);
                      setDetailChest(null);
                    }}
                  >
                    <PlusOutlined className="mr-1" />
                    Tạo rương
                  </Button>
                </Tooltip>
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
      </Card>
    </>
  );
}
