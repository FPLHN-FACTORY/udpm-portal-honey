import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import "./index.css";
import { AddPointStudentAPI } from "../../../apis/censor/add-point/add-point-student.api";
import { SetImport } from "../../../app/reducers/import/import.president.reducer";
import { useAppDispatch } from "../../../app/hooks";

export default function ModalImportExcelLabReport(props) {
  const { open, setOpen, nameFile, setNameFile, setDataPreview } = props;
  const dispatch = useAppDispatch();
  const [file, setFile] = useState(null);

  const handleExportExcel = () => {
    AddPointStudentAPI.createExportExcelLab()
      .then(() => {
        message.success("Tải file mẫu thành công");
      })
      .catch((err) => {
        message.error("Tải file mẫu thất bại");
      });
  };

  const handleFileInputChange = (e) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file.file.originFileObj);
      AddPointStudentAPI.previewDatatExcelLab(formData)
        .then((response) => {
          console.log('====================================');
          console.log(response.data.data);
          console.log('====================================');
          setDataPreview(response.data.data.listStudent);
          dispatch(SetImport(response.data.data));
          message.success("Import excel thành công");
        })
        .catch(() => {
          message.error("Import excel thất bại");
        });
    } else {
      message.error("Import excel thất bại");
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
    setFile(null);
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
