import { Button, message, Popconfirm, Tooltip } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import React, { useState, useEffect } from "react";
import { SetArchiveGift } from "../../../app/reducers/archive-gift/archive-gift.reducer";
import { SetArchive } from "../../../app/reducers/archive/archive.reducer";

const UsingGift = (props) => {
  const { archivegift, filter } = props;
  const dispatch = useAppDispatch();
  //   const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = () => {
    ArchiveAPI.getArchive(filter).then((response) => {
      console.log(response.data.data);
      dispatch(SetArchiveGift(response.data.data));
    });
  };

  const deleteGift = () => {
    console.log(archivegift.id);
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
      <Tooltip title="Sử dụng">
        <Button
          type="primary"
          className="bg-red-400 text-white hover:bg-red-300"
        >
          <PlusCircleOutlined style={{ fontSize: "15px" }} />
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};
export default UsingGift;
