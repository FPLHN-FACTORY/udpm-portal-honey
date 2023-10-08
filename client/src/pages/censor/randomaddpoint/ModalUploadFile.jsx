import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";
import {
  SetImport,
  GetImport,
} from "../../../app/reducers/import/import.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

export default function ModalUpLoadFile(props) {
  const {
    openUpload,
    setOpenUpload,
    setLoading,
    nameFileUpload,
    setNameFileUpload,
    setDataPreview,
  } = props;

  const [file, setFile] = useState(null);
  const dispatch = useAppDispatch();

  const handleExportExcel = () => {
    setLoading(true);
    RandomAddPointAPI.previewDataExportExcel()
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
      RandomAddPointAPI.createPreviewImportExcel(formData)
        .then((response) => {
          console.log(response.data.data);
          setDataPreview(response.data.data.lstAdminAddItemDTO);
          dispatch(SetImport(response.data.data));
          message.success("Import excel thành công");
        })
        .catch(() => {
          message.error("Import excel thất bại");
        });
    } else {
      message.error("Import excel thất bại");
    }
    setLoading(false);
    setNameFileUpload("");
    setOpenUpload(false);
  };

  const handleOnChangeFile = (e) => {
    setNameFileUpload(e.file.name);
    setFile(e);
  };
  const data = useAppSelector(GetImport);

  console.log(data);

  const handleRemoveFile = () => {
    setNameFileUpload("");
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
