/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Button, Pagination, Space, Table, Card, Input, Tooltip } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
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
      <Card className="mb-2">
        <h1 className="text-xl">Tìm kiếm rương</h1>
        <form class="flex items-center" onSubmit={handleSearch}>
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "30px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nhập tên..."
            />
          </div>
          <button
            type="button"
            className="search-button1"
            icon={<SearchOutlined />}
            style={{ marginTop: "20px" }}
            onClick={() => {
              setCurrent(1);
              fetchData();
            }}
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
                <Tooltip title="Tạo rương">
                  <button
                    className="add-button1"
                    style={{ marginBottom: "20px" }}
                    onClick={() => {
                      setShowModal(true);
                      setDetailChest(null);
                    }}
                  >
                    <PlusOutlined className="mr-1" />
                    Tạo rương
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
