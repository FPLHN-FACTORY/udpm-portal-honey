import { Button, Modal, Space, message } from "antd";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";
import {
  connectStompClient,
  getStompClient,
} from "../../../helper/stomp-client/config";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { getToken } from "../../../helper/userToken";

export default function ModalConfirmEvent(props) {
  const {
    openConfirm,
    setOpenConfirm,
    dataPreview,
    setDataPreview,
    setNameFileUpload,
  } = props;
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    connectStompClient();
  }, []);

  let stompClient = getStompClient();

  const connect = () => {
    stompClient.connect(
      {},
      (frame) => {
        console.log("Kết nối STOMP đã được thiết lập.");
      },
      (error) => {
        console.error("Lỗi trong quá trình kết nối STOMP:", error);
      }
    );
  };

  useEffect(() => {
    setIsLoad(true);
    if (stompClient != null) {
      connect();
    }
    // return () => {
    //   if (stompClient != null) {
    //     getStompClient().disconnect();
    //   }
    // };
  }, [stompClient, isLoad]);

  const handleConfirm = (dataPreview) => {
    const bearerToken = getToken();
    const headers = {
      Authorization: "Bearer " + bearerToken,
    };
    RandomAddPointAPI.createImportData(dataPreview)
      .then(() => {
        stompClient.send("/action/create-notification-user", headers, {});

        message.success("Import thành công");
      })
      .catch((error) => {
        console.log("Lỗi khi import:", error);
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
