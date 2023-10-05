import React, { useEffect, useState } from "react";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

export default function ModalAddChestGift(props) {
  const { chest } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [dataGifts, setDataGifts] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [chest.id]);

  const fetchData = () => {
    ChestGiftAPI.getGiftNotJoinChest(chest.id).then((response) => {
      setDataGifts(response.data.data);
    });
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const handleOk = () => {
    ChestGiftAPI.addGiftToChest({
      chestId: chest.id,
      listGift: selectedRowKeys,
    }).then(() => {
      fetchData();
      message.success("Thêm thành công.");
    });
  };

  return (
    <>
      <Tooltip title="Thêm vật phẩm">
        <Button
          className="add-button1"
          style={{ padding: "1px 0.7rem" }}
          onClick={() => setModalOpen(true)}
        >
          <PlusCircleOutlined className="icon" />
        </Button>
      </Tooltip>
      <Modal
        title="Vật phẩm"
        open={modalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataGifts}
          rowKey="id"
        />
      </Modal>
    </>
  );
}
