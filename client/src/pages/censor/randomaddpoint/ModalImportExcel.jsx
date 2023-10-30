import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import "./index.css";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";

export default function ModalImportExcel(props) {
  const {
    open,
    setOpen,
    setLoading,
    dataRandomPoint,
    dataRandomItem,
    setListStudentPoint,
    setListStudentItem,
    nameFile,
    setNameFile,
    setDataPreview,
  } = props;

  const [file, setFile] = useState(null);

  const handleExportExcel = () => {
    setLoading(true);
    RandomAddPointAPI.createExportExcel()
      .then(() => {
        message.success("Export excel thành công");
      })
      .catch((err) => {
        message.error("Export excel thất bại");
      });
    setLoading(false);
  };

  const handleFileInputChange = (e) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file.file.originFileObj);
      setLoading(true);
      RandomAddPointAPI.createImportExcel(formData)
        .then((response) => {
          // Lấy danh sách ID từ phản hồi và gán vào biến idList
          const idList = response.data.data.lstAdminAddPointDTO.map(
            (item) => item.id
          );

          // Gán danh sách ID vào setListStudentPoint và setListStudentItem
          setListStudentPoint({
            ...dataRandomPoint,
            listStudentPoint: idList,
          });
          setListStudentItem({
            ...dataRandomItem,
            listStudentPoint: idList,
          });

          // Gán dữ liệu từ phản hồi vào setDataPreview
          setDataPreview(response.data.data);

          // stompClient.send("/action/create-notification", {}, {});
          message.success("Import excel thành công");
        })
        .catch(() => {
          message.error("Import excel thất bại");
        });
    } else {
      message.error("Import excel thất bại");
    }
    setLoading(false);
    setOpen(false);
  };

  const handleOnChangeFile = (e) => {
    setNameFile(e.file.name);
    setFile(e);
  };

  const handleRemoveFile = () => {
    setNameFile("");
    setListStudentPoint([]);
    setListStudentItem([]);
    setOpen(false);
  };
  return (
    <div>
      <Modal
        title="Import Excel"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" danger onClick={() => handleRemoveFile()}>
            Hủy
          </Button>,
          <Button key="submit" onClick={() => handleExportExcel()}>
            <DownloadOutlined />
            Tải file mẫu
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => handleFileInputChange()}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <Upload.Dragger
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleOnChangeFile(e)}
          >
            {nameFile === "" ? (
              <div>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấn vào đây để tải lên file</p>
              </div>
            ) : (
              nameFile
            )}
          </Upload.Dragger>
        </div>
      </Modal>
    </div>
  );
}
