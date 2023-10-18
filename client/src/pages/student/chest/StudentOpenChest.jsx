import React from "react";
import { Button, Popconfirm, Tooltip, message } from "antd";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { SetChestGift } from "../../../app/reducers/chest-gift/chest-gift.reducer";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";

import { DeleteArchiveChest } from "../../../app/reducers/archive-gift/archive-chest.reducer";
import { SetArchiveCountGift } from "../../../app/reducers/archive-gift/archive-count-gift.reducer";

const OpenChest = (props) => {
  const { chest } = props;
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    ChestGiftAPI.getChestGift(chest.chestId).then((response) => {
      dispatch(SetChestGift(response.data.data));
    });
  };

  const handelOk = () => {
    ArchiveAPI.openChest(chest.chestId).then(() => {
      message.success("Sử dụng thành công.");
    });
    ArchiveAPI.update(chest.id).then((response) => {
      dispatch(DeleteArchiveChest(response.data.data));
    });
    dispatch(SetArchiveCountGift(parseInt(chest.quantity) - 1));
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
      <Tooltip title="Sử dụng">
        <Button className="button-xac-nhan">Sử dụng</Button>
      </Tooltip>
    </Popconfirm>
  );
};

export default OpenChest;
