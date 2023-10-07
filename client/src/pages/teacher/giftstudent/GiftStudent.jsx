import React, { useState } from "react";
import { Button, Modal, Input, Space, message } from "antd";
import {
  CloseCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./Index.css";

export default function ModalImportExportExcel(props) {
  const {
    open,
    setOpen,
    setLoading,
    nameFile,
    setNameFile,
    setListStudentPoint,
    setListStudentItem,
  } = props;

  const handleExportExcel = () => {
    setLoading(true);
    setTimeout(() => {
      message.success("Tải temolate mẫu thành công!");
      setLoading(false);
    }, 1000);
  };

  const downloadExcelTemplate = () => {
    const url =
      "http://localhost:2508/api/teacher/list-students/download-template";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = new Blob([xhr.response], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "TemplateGiftStudent.xlsx";
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        message.error("Lỗi khi tải file Excel.");
      }
    };

    xhr.send();
  };

  const handleFileInputChange = (e) => {
    setNameFile(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setLoading(true);
    setTimeout(() => {
      message.success("Import excel thành công");
      setListStudentPoint([]);
      setListStudentItem([]);
      setLoading(false);
    }, 1000);
  };

  const handleRemoveFile = () => {
    setNameFile("");
    setListStudentPoint([]);
    setListStudentItem([]);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setOpen(true)}
        className="import-export-button"
      >
        Import/Export excel
      </Button>
      <Modal
        title="Import/Export Excel"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={null}
        className="import-export-modal"
      >
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <div>
          <Input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileInputChange}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              cursor: "pointer",
              opacity: 0,
              zIndex: 1,
              width: "100%",
              height: "100%",
            }}
          />
          <Button
            htmlFor="file-input"
            style={{
              marginTop: "16px",
              marginBottom: "16px",
              width: "100%",
            }}
          >
            <UploadOutlined />
            {nameFile === "" ? "Tải lên file" : nameFile}
          </Button>
          {nameFile && (
            <Button
              style={{
                marginTop: "16px",
                marginBottom: "16px",
                border: "none",
              }}
              onClick={handleRemoveFile}
              className="remove-file-button"
            >
              <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
            </Button>
          )}
        </div>
        <Space
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <Button
            type="primary"
            onClick={handleExportExcel}
            className="export-excel-button"
          >
            <DownloadOutlined />
            Tải file mẫu
          </Button>
          <Button
            type="primary"
            onClick={() => setOpen(false)}
            className="confirm-button"
          >
            Xác nhận
          </Button>
        </Space>
      </Modal>
    </div>
  );
}
