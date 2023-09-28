import { Button, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import DialogTransaction from "./DialogTransaction";
import "./DialogTransaction.css";
import { v4 as uuidv4 } from "uuid";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { TransactionApi } from "../../../apis/student/transaction/transactionApi.api";
var stompClient = null;
const TestTransaction = () => {
  const [open, setOpen] = useState(false);
  const [idTransaction, setIdTransaction] = useState();

  useEffect(() => {
    const socket = new SockJS("http://localhost:2508/ws-honey-end-point");
    stompClient = Stomp.over(socket);

    // stompClient.debug = () => {};

    stompClient.connect({}, () => {
      console.log("Connect success");
    });
    return () => {
      stompClient.disconnect();
    };
  }, []);

  const requestTransaction = (value) => {
    const idTransaction = uuidv4();
    TransactionApi.sendTransaction({
      ...value,
      idTransaction: idTransaction,
    })
      .then(() => {
        message.success("Đã gửi yêu cầu giao dịch");
      })
      .finally(() => {
        const subscription = stompClient.subscribe(
          `/user/transaction/${idTransaction}/accept`,
          (result) => {
            setIdTransaction(result.body);
            setOpen(true);
            subscription.unsubscribe();
            console.log("disconnected");
          }
        );
      });
  };

  return (
    <div style={{ marginTop: "20%" }}>
      <Form onFinish={requestTransaction}>
        <Form.Item name={"userName"}>
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Giao dịch
        </Button>
      </Form>
      <Modal centered open={open} onOk={null} onCancel={null} width={900}>
        <DialogTransaction
          open={open}
          idTransaction={idTransaction}
          setClose={setOpen}
        />
      </Modal>
    </div>
  );
};
export default TestTransaction;
