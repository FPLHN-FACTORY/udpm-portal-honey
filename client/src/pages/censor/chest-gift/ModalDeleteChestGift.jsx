import { Button, message, Popconfirm, Tooltip } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { ChestAPI } from "../../../apis/censor/chest/chest.api";
import { SetChest } from "../../../app/reducers/chest/chest.reducer";

const DeleteChest = (props) => {
  const { chest } = props;
  const dispatch = useAppDispatch();

  const fetchData = () => {
    ChestAPI.fetchAll().then((response) => {
      dispatch(SetChest(response.data.data.data));
    });
  };

  const deleteChestGift = () => {
    ChestGiftAPI.deleteChest(chest.id).then(
      (response) => {
        fetchData();
        message.success("Xóa thành công");
      },
      (err) => {
        message.error("Xóa thất bại");
      }
    );
  };
  const confirm = (e) => {
    deleteChestGift();
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Xóa rương"
      description="Bạn có chắc chắn muốn xóa?"
      onConfirm={confirm}
      onCancel={cancel}
      color="cyan"
      okText="Yes"
      cancelText="No"
    >
      <Tooltip title="Xóa">
        <Button
          type="primary"
          className="bg-red-400 text-white hover:bg-red-300"
        >
          <DeleteOutlined style={{ fontSize: "15px" }} />
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};
export default DeleteChest;
