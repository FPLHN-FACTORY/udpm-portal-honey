import { Card, Input, Pagination, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { EditOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import ModalDetailGift from "./ModalDetailGift";
import ModalThem from "../category/ModalAdd";

export default function IndexGift() {
  const [showModal, setShowModal] = useState(false);
  const [listGift, setListGift] = useState([]);
  const [detailGift, setDetailGift] = useState();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    GiftAPI.fetchAllGift().then((response) => {
      setListGift(response.data.data);
      setTotal(response.data.totalPages);
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
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
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          {/* <Tooltip title="Cập nhập">
            <Button
              className="update-button"
              onClick={() => {
                setDetailGift(record);
                setShowModal(true);
                console.log(record);
              }}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip> */}
          <ModalDetailGift gift={record} icon={<FormOutlined />} />
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
          gift={detailGift}
          setGift={setDetailGift}
        />
      )}
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
              // icon={<SearchOutlined />}
              // onClick={() => {
              //   setCurrent(1);
              //   fetchData();
              // }}
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
                    // onClick={() => {
                    //   setShowModal(true);
                    //   setDetailGift(null);
                    // }}
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
            dataSource={listGift}
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
