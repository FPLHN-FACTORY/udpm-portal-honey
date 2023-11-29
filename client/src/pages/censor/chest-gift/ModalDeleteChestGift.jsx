// import { Button, message, Popconfirm, Tooltip } from "antd";
// import { useAppDispatch } from "../../../app/hooks";
// import { DeleteOutlined } from "@ant-design/icons";
// import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
// import { ChestAPI } from "../../../apis/censor/chest/chest.api";
// import { SetChest } from "../../../app/reducers/chest/chest.reducer";

// const DeleteChest = (props) => {
//   const { chest } = props;
//   const dispatch = useAppDispatch();

//   const fetchData = () => {
//     ChestAPI.fetchAll().then((response) => {
//       dispatch(SetChest(response.data.data.data));
//     });
//   };

//   const cancel = (e) => {
//     message.error("Click on No");
//   };

//   return (
//   );
// };
// export default DeleteChest;
