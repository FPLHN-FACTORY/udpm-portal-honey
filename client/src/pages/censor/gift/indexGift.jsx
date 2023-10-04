import { Card, Input, Pagination, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
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
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const [showModalDetail, setShowModalDetail] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const typeMapping = {
    0: "Quà tặng",
    1: "Vật phẩm nâng cấp",
    2: "Dụng cụ",
  };

  const fetchData = () => {
    GiftAPI.fetchAll({
      search: search,
      page: current - 1,
      size: 5,
    }).then((response) => {
      console.log(response.data.data);
      dispatch(SetGift(response.data.data.data));
      setTotal(response.data.data.totalPages);
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
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Cập nhập">
            <Button
              className="update-button"
              onClick={() => {
                setDetailGift(record);
                setShowModalDetail(true);
              }}
            >
              <EditOutlined className="icon" />
            </Button>
          </Tooltip>
          <ModalDelete gift={record} icon={<FormOutlined />} />
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
      {showModalDetail && ( // Kiểm tra showModalDetail
        <ModalDetailGift
          gift={detailGift}
          visible={showModalDetail}
          onCancel={() => setShowModalDetail(false)}
          onUpdate={() => {
            setShowModalDetail(false);
          }}
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
            }}
            total={total * 10}
          />
        </div>
      </Card>
    </>
  );
}
