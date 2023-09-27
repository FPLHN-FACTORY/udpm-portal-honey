import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import DialogTransaction from "./DialogTransaction";
import "./DialogTransaction.css";
const TestDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={null}
        onCancel={null}
        width={900}>
        <DialogTransaction setCLose={setOpen} />
      </Modal>
    </>
  );
};
export default TestDialog;
