import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  SetChestGift,
  GetChestGift,
} from "../../../app/reducers/chest-gift/chest-gift.reducer";
const ModalAddGiftToChest = (props) => {
  const { chest } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useAppDispatch();

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
      dispatch(SetChestGift(response.data.data));
    });
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setModalOpen(false);
  };

  const dataGifts = useAppSelector(GetChestGift);

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
      handleCancel();
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
};

export default ModalAddGiftToChest;
