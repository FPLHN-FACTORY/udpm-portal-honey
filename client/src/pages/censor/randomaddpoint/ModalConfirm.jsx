import { Button, Modal, Space, message } from "antd";
import React from "react";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";

export default function ModalConfirm(props) {
  const {
    openConfirm,
    setOpenConfirm,
    dataPreview,
    setDataPreview,
    setNameFileUpload,
  } = props;

  const handleConfirm = (dataPreview) => {
    RandomAddPointAPI.createImportData(dataPreview)
      .then(() => {
        message.success("Import thành công");
      })
      .catch(() => {
        message.error("Import thất bại");
      });
    setDataPreview([]);
    setNameFileUpload("");
    setOpenConfirm(false);
  };

  return (
    <div>
      <Modal
        title={
          <div
            style={{
              fontSize: "24px",
              marginBottom: "32px",
            }}
          >
            <b>XÁC NHẬN IMPORT</b>
          </div>
        }
        open={openConfirm}
        footer={null}
        onCancel={() => setOpenConfirm(false)}
      >
        <b style={{ paddingBottom: "32px" }}>Bạn chắc chắn import ?</b>
        <Space
          style={{
            justifyContent: "right",
            display: "flex",
            marginTop: "36px",
          }}
        >
          <Button className="button-css" onClick={() => setOpenConfirm(false)}>
            Cancel
          </Button>

          <Button
            className="button-css"
            onClick={() => handleConfirm(dataPreview)}
          >
            Xác nhận
          </Button>
        </Space>
      </Modal>
    </div>
  );
}
