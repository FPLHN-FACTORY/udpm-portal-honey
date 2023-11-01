import { Button, message, Popconfirm, Tooltip, Form } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { DeleteOutlined } from "@ant-design/icons";
import {
  DeleteGift,
  SetGift,
} from "../../../app/reducers/gift/gift.reducer";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";

const DeleteConfirm = (props) => {
  const dispatch = useAppDispatch();
  const { gift } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(gift);

  const fetchData = () => {
    GiftAPI.fetchAll().then((response) => {
      dispatch(SetGift(response.data.data.data));
    });
  };

  const deleteGift = (id) => {
    form
      .validateFields()
      .then((formValues) => {
        console.log('id: '+id)
        GiftAPI.delete(formValues, id)
          .then((response) => {
            dispatch(DeleteGift(response.data.data));
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
    deleteGift(gift.id);
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
      <Tooltip title="Delete demo">
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
