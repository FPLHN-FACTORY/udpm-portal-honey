import { Button, message, Popconfirm, Tooltip } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import React from "react";
import { SetArchiveGift } from "../../../app/reducers/archive-gift/archive-gift.reducer";
import { SetGiftArchive } from "../../../app/reducers/archive-gift/gift-archive.reducer";
import { SetArchiveCountGift } from "../../../app/reducers/archive-gift/archive-count-gift.reducer";

const UsingGift = (props) => {
  const { archivegift, filter } = props;
  const dispatch = useAppDispatch();

  const fetchData = () => {
    ArchiveAPI.getArchive(filter).then((response) => {
      dispatch(SetArchiveGift(response.data.data));
    });
    ArchiveAPI.getGift(filter).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
    });
  };

  const deleteGift = () => {
    ArchiveAPI.delete(archivegift.id).then(() => {
      try {
        console.log(archivegift.id);
        fetchData();
        dispatch(SetArchiveCountGift(parseInt(archivegift.quantity) - 1));
        message.success("Sử dụng thành công");
      } catch (error) {
        message.error("Sử dụng thất bại");
      }
    });
  };
  const confirm = (e) => {
    deleteGift();
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Sử dụng"
      description="Bạn có chắc chắn muốn sử dụng?"
      onConfirm={confirm}
      onCancel={cancel}
      color="cyan"
      okText="Yes"
      cancelText="No"
    >
      <Tooltip>
        <Button className="button-xac-nhan">Sử dụng</Button>
      </Tooltip>
    </Popconfirm>
  );
};
export default UsingGift;
