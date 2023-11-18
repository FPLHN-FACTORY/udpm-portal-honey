import React, { useState } from "react";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { EyeOutlined } from "@ant-design/icons";
import {
  SetChestGift,
  GetChestGift,
} from "../../../app/reducers/chest-gift/chest-gift.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";

import {
  DeleteArchiveChest,
  SetArchiveChest,
} from "../../../app/reducers/archive-gift/archive-chest.reducer";

const ModalArchiveChest = (props) => {
  const { chest } = props;
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

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
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
    },
  ];

  const fetchData = async () => {
    ChestGiftAPI.getChestGift(chest.chestId).then((response) => {
      dispatch(SetChestGift(response.data.data));
    });
  };

  const dataChest = useAppSelector(GetChestGift);

  const handleOnClick = () => {
    setModalVisible(true);
    fetchData();
  };

  const handelOk = () => {
    ArchiveAPI.openChest(chest.chestId).then(() => {
      message.success("Sử dụng thành công.");
    });
    ArchiveAPI.update(chest.id).then((response) => {
      dispatch(DeleteArchiveChest(response.data.data));
    });
    setModalVisible(false);
  };

  return (
    <div>
      <Tooltip title="Mở rương">
        <Button
          className="detail-button"
          style={{ padding: "1px 0.7rem" }}
          onClick={() => handleOnClick()}
        >
          <EyeOutlined className="icon" />
        </Button>
      </Tooltip>
      <Modal
        title="Vật phẩm"
        open={modalVisible}
        onOk={() => {
          handelOk();
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      >
        <Table columns={columns} dataSource={dataChest} rowKey="id" />
      </Modal>
    </div>
  );
};

export default ModalArchiveChest;
