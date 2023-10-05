import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Pagination, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ClubAPI } from "../../../apis/censor/club/club.api";
import { useParams } from "react-router-dom";

const ModalGift = ({ visible, onCancel }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [gift, setGift] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
    },
    {
      title: "Mã vật phẩm",
      dataIndex: "code",
      key: "code",
      width: 200,
    },
    {
      title: "Tên vật phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
  ];

  useEffect(() => {
    fetchData();
  }, [current]);

  const fetchData = () => {
    ClubAPI.fetchGitNotInClub({
      search: search.trim(),
      idClub: id,
      page: current - 1,
    }).then((response) => {
      setGift(response.data.data.data);
      setTotal(response.data.data.totalPages);
    });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const AddGiftInClub = () => {
    ClubAPI.createGiftClub({
      clubId: id,
      giftId: selectedRowKeys,
    }).then(() => {
      fetchData();
      message.success("Thêm thành công.");
    });
  };

  return (
    <Modal
      title="Danh sách vật phẩm"
      visible={visible}
      width={1000}
      onCancel={onCancel}
      footer={[
        <Button key="Add" onClick={AddGiftInClub}>
          Thêm
        </Button>,
      ]}
    >
      <div className="mb-2">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={gift}
          rowKey="id"
          pagination={false}
        />
      </div>
      <div className="text-center">
        <Pagination
          simple
          current={current}
          onChange={(value) => {
            setCurrent(value);
          }}
          total={total * 10}
        />
      </div>
    </Modal>
  );
};

export default ModalGift;
