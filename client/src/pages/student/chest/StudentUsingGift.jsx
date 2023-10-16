import { Button, message, Popconfirm, Tooltip } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import React from "react";
import {
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";

const UsingGift = (props) => {
  const { archivegift, filter } = props;
  const dispatch = useAppDispatch();

  const fetchData = () => {
    ArchiveAPI.getArchive(filter).then((response) => {
      dispatch(SetArchiveGift(response.data.data));
    });
  };

  // const updateGiftQuantity = () => {
  //   const updatedGift = { ...archivegift, quantity: archivegift.quantity - 1 };
  //   dispatch(PutArchiveGift(updatedGift));
  // };

  const deleteGift = () => {
    console.log(archivegift);
    ArchiveAPI.delete(archivegift.id).then(
      () => {
        fetchData();
        // updateGiftQuantity();
        message.success("Sử dụng thành công");
      },
      (err) => {
        message.error("Sử dụng thất bại");
      }
    );
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
