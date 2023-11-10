import React from "react";
import { Popconfirm, message, notification } from "antd";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";

import {
  DeleteArchiveChest,
  SetArchiveChest,
} from "../../../app/reducers/archive-gift/archive-chest.reducer";

const OpenChest = (props) => {
  const { chest, closeAdditionalInfo } = props;
  const dispatch = useAppDispatch();

  const fetchData = () => {
    ArchiveAPI.getChest().then((response) => {
      dispatch(SetArchiveChest(response.data.data));
    });
  };

  const handelOk = () => {
    ArchiveAPI.openChest(chest.chestId).then((response) => {
      const nameGift = response.data.data.name;
      notification.success({
        message: "Thông báo.",
        description: `Gift đã được mở: ${nameGift}`,
      });
      closeAdditionalInfo();
    });
    ArchiveAPI.update(chest.id).then((response) => {
      dispatch(DeleteArchiveChest(response.data.data));
    });
    fetchData();
  };

  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Sử dụng"
      description="Bạn có chắc chắn muốn sử dụng?"
      onConfirm={handelOk}
      onCancel={cancel}
      color="cyan"
      okText="Yes"
      cancelText="No"
    >
      <div>Sử dụng</div>
    </Popconfirm>
  );
};

export default OpenChest;
