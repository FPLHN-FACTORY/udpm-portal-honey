import { Button, message, Popconfirm, Tooltip, Form } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteClub } from "../../../app/reducers/club/club.reducer";
import { ClubAPI } from "../../../apis/censor/club/club.api";

const DeleteConfirm = (props) => {
  const dispatch = useAppDispatch();
  const { club } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(club);

  const deleteGift = (id) => {
    form
      .validateFields()
      .then((formValues) => {
        console.log("id: " + formValues);
        ClubAPI.delete(formValues, id)
          .then((response) => {
            dispatch(DeleteClub(response.data.data));
            message.success("Thành công!");
            form.resetFields();
          })
          .catch((err) => {
            message.error("Lỗi: " + err.message);
          });
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };
  const confirm = (e) => {
    deleteGift(club.id);
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  return (
    <Popconfirm
      title="Xóa câu lạc bộ"
      description="Bạn có chắc muốn xóa câu lạc bộ ?"
      onConfirm={confirm}
      onCancel={cancel}
      color="cyan"
      okText="Yes"
      cancelText="No"
    >
      <Tooltip title="Xóa câu lạc bộ">
        <Button
          type="primary"
          className="bg-red-400 text-white hover:bg-red-300"
        >
          <DeleteOutlined />
        </Button>
      </Tooltip>
    </Popconfirm>
  );
};
export default DeleteConfirm;
