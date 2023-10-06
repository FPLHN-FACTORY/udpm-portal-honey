import React, { useState } from "react";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AddChestGift } from "../../../app/reducers/chest-gift/chest-gift.reducer";
import { GetGift, SetGift } from "../../../app/reducers/gift/gift.reducer";

export default function ModalAddChestGift(props) {
  const { chest } = props;
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
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

  const fetchData = () => {
    ChestGiftAPI.getGiftNotJoinChest(chest.id).then((response) => {
      dispatch(SetGift(response.data.data));
    });
  };

  const handleOnclick = () => {
    setModalOpen(true);
    fetchData();
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
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
    })
      .then((response) => {
        dispatch(AddChestGift(response.config.data));
        fetchData();
        message.success("Thêm thành công.");
      })
      .catch(() => {
        message.error("Thêm không thành công.");
      });
  };
  const data = useAppSelector(GetGift);
  return (
    <>
      <Tooltip title="Thêm vật phẩm">
        <Button
          className="add-button1"
          style={{ padding: "1px 0.7rem" }}
          onClick={() => handleOnclick()}
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
          dataSource={data}
          rowKey="id"
        />
      </Modal>
    </>
  );
}
