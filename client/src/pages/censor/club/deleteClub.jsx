import { Button, message, Popconfirm, Tooltip, Form } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import {
  DeleteClub,
  SetClub,
} from "../../../app/reducers/club/club.reducer";
import { ClubAPI } from '../../../apis/censor/club/club.api';

const DeleteConfirm = (props) => {
  const dispatch = useAppDispatch();
  const { club } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(club);

  const fetchData = () => {
    ClubAPI.fetchAll().then((response) => {
      dispatch(SetClub(response.data.data.data));
    });
  };

  const deleteGift = (id) => {
    // console.log('id'+id);
    form
      .validateFields()
      .then((formValues) => {
        console.log('id: '+formValues)
        ClubAPI.delete(formValues, id)
          .then((response) => {
            dispatch(DeleteClub(response.data.data));
            message.success("Thành công!");
            // setModalOpen(false);
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
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      color="cyan"
      okText="Yes"
      cancelText="No"
    >
      <Tooltip title="Delete club">
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
