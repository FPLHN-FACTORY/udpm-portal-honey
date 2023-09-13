// import { Button, Form, Input, Modal, message } from "antd";
// import { useAppDispatch } from "../../../app/hooks";
// import { SemesterAPI } from "../../../apis/censor/semester/semester.api";
// import { SetSemester } from "../../../app/reducers/semester/semester.reducer";
// const Detail = (props) => {
//   const { modalOpen, setModalOpen, color } = props;
//   const [form] = Form.useForm();
//   const dispatch = useAppDispatch();

//   const fetchAll = () => {
//     SemesterAPI.fetchAll().then((response) => {
//       dispatch(SetSemester(response.data.data.data));
//     });
//   };

//   form.setFieldsValue(color);

//   const onFinish = () => {
//     const formValues = form.getFieldsValue();
//     if (color == null) {
//       SemesterAPI.detail(formValues)
//         .then((result) => {
//           setModalOpen(false);
//           form.setFieldValue(null);
//           fetchAll();
//         })
//         .catch((err) => {
//           message.error("Error", err);
//         });
//     }
//   };
//   const onFinishFailed = () => {
//     message.error("Error");
//   };
//   const onCancel = () => {
//     setModalOpen(false);
//     form.setFieldValue(null);
//   };

//   return (
//     <>
//       <Modal
//         title="Basic Modal"
//         open={modalOpen}
//         onCancel={onCancel}
//         footer={null}
//       >
//         <Form
//           form={form}
//           name="basic"
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           labelCol={{
//             span: 3,
//           }}
//           wrapperCol={{
//             span: 16,
//           }}
//           style={{
//             maxWidth: 600,
//           }}
//           initialValues={{
//             remember: true,
//           }}
//           autoComplete="off"
//         >
//           <Form.Item label="Code" name="code">
//             <Input />
//           </Form.Item>

//           <Form.Item label="Tên" name="name">
//             <Input />
//           </Form.Item>

//           <Form.Item label="Ngày bắt đầu" name="toDate">
//             <Input />
//           </Form.Item>

//           <Form.Item label="Ngày kết thúc" name="fromDate">
//             <Input />
//           </Form.Item>

//           <Form.Item
//             wrapperCol={{
//               offset: 8,
//               span: 16,
//             }}
//           >
//             <Button
//               type="primary"
//               onClick={onCancel}
//               className="bg-red-500 text-white"
//             >
//               Close
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Detail;
