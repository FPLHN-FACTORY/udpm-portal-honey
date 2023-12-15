import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { AddPointExcelAPI } from "../../../apis/teacher/add-point/add-point-excel.api";
import { SetImport } from "../../../app/reducers/import/import.teacher.reducer";
import { useAppDispatch } from "../../../app/hooks";
import { convertLongToDate } from "../../util/DateUtil";

export default function ModalImportExcel(props) {
  const { open, setOpen, nameFile, setNameFile, setDataPreview } = props;
  const [file, setFile] = useState(null);

  const handleExportExcel = () => {
    AddPointExcelAPI.exportExcel({}).then((response) => {
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

  const dispatch = useAppDispatch();
  const handleFileInputChange = (e) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file.file.originFileObj);
      AddPointExcelAPI.previewImportPoint(formData)
        .then((response) => {
          setDataPreview(response.data.data.responseList);
          dispatch(SetImport(response.data.data));
          message.success("Tải file excel thành công");
        })
        .catch(() => {
          message.error("Tải file excel thất bại");
        });
    } else {
      message.error("Tải file excel thất bại");
    }
    setNameFile("");
    setOpen(false);
  };

  const handleOnChangeFile = (e) => {
    setNameFile(e.file.name);
    setFile(e);
  };
  const handleRemoveFile = () => {
    setNameFile("");
    setOpen(false);
  };

  return (
    <div>
      <Modal
        title="Upload file import"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" danger onClick={() => handleRemoveFile()}>
            Hủy
          </Button>,
          <Button key="download" onClick={() => handleExportExcel()}>
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
