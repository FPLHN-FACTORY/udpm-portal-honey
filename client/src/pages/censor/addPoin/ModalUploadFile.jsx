import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";
import { SetImport } from "../../../app/reducers/import/import.reducer";
import { useAppDispatch } from "../../../app/hooks";
import { convertLongToDate } from "../../util/DateUtil";

export default function ModalUpLoadFile(props) {
  const {
    openUpload,
    setOpenUpload,
    nameFileUpload,
    setNameFileUpload,
    setDataPreview,
  } = props;

  const [file, setFile] = useState(null);
  const dispatch = useAppDispatch();

  const handleExportExcel = () => {
    RandomAddPointAPI.previewDataExportExcel({}).then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        "File mẫu import cộng mật ong" +
        convertLongToDate(new Date().getTime()) +
        ".xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleFileInputChange = (e) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file.file.originFileObj);
      RandomAddPointAPI.createPreviewImportExcel(formData)
        .then((response) => {
          if (response.data.data.total > 0) {
            setDataPreview(response.data.data.lstAdminAddItemDTO);
            dispatch(SetImport(response.data.data));
            message.success("Import excel thành công");
          } else {
            message.error("Import excel thất bại");
            setDataPreview([]);
          }
        })
        .catch(() => {
          message.error("Import excel thất bại");
          setDataPreview([]);
        });
    } else {
      message.error("Import excel thất bại");
      setDataPreview([]);
    }
    setNameFileUpload("");
    setOpenUpload(false);
  };

  const handleOnChangeFile = (e) => {
    setNameFileUpload(e.file.name);
    setFile(e);
  };
  const handleRemoveFile = () => {
    setNameFileUpload("");
    setFile(null);
    setOpenUpload(false);
  };

  return (
    <div>
      <Modal
        title="Upload file import"
        open={openUpload}
        onOk={() => setOpenUpload(false)}
        onCancel={() => setOpenUpload(false)}
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
            maxCount={1}
            onChange={(e) => handleOnChangeFile(e)}
          >
            {nameFileUpload === "" ? (
              <div>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấn vào đây để tải lên file</p>
              </div>
            ) : (
              nameFileUpload
            )}
          </Upload.Dragger>
        </div>
      </Modal>
    </div>
  );
}
