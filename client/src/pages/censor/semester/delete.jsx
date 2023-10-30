import { Button, message, Popconfirm, Tooltip } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import {
  DeleteSemester,
  SetSemester,
} from "../../../app/reducers/semester/semester.reducer";
import { SemesterAPI } from "../../../apis/censor/semester/semester.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteConfirm = (props) => {
  const dispatch = useAppDispatch();

  const fetchData = () => {
    SemesterAPI.fetchAll().then((response) => {
      dispatch(SetSemester(response.data.data.data));
    });
  };

  const deleteColor = (id) => {
    SemesterAPI.delete(id).then(
      (response) => {
        dispatch(DeleteSemester(id));
        fetchData();
        message.success("Xóa thành công");
      },
      (err) => {
        message.error("Xóa thất bại");
      }
    );
  };
  const confirm = (e) => {
    deleteColor(props.id);
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Xóa bản ghi"
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
          style={{
            backgroundColor: "red",
            color: "white",
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};
export default DeleteConfirm;
