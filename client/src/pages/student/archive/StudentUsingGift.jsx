import { Button, message, Popconfirm, Tooltip } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import React from "react";
import { SetArchiveGift } from "../../../app/reducers/archive-gift/archive-gift.reducer";

const UsingGift = (props) => {
  const { archivegift, filter } = props;
  const dispatch = useAppDispatch();

  const fetchData = () => {
    ArchiveAPI.getArchive(filter).then((response) => {
      dispatch(SetArchiveGift(response.data.data));
    });
  };

  const deleteGift = () => {
    ArchiveAPI.delete(archivegift.id).then(
      (response) => {
        fetchData();
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

  return (
    <Popconfirm
      title="Sử dụng"
      description="Bạn có chắc chắn muốn sử dụng?"
      onConfirm={confirm}
      color="cyan"
      okText="Yes"
      cancelText="No">
      <Tooltip title="Sử dụng">
        <Button
          type="primary"
          className="bg-red-400 text-white hover:bg-red-300">
          <PlusCircleOutlined style={{ fontSize: "15px" }} />
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};
export default UsingGift;
