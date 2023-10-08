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
          setListStudentPoint({
            ...dataRandomPoint,
            listStudentPoint: response.data.data,
          });
          setListStudentItem({
            ...dataRandomItem,
            listStudentPoint: response.data.data,
          });
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
      {/* <Modal
        title="Import Excel"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <Button
            htmlFor="file-input"
            style={{
              marginTop: "16px",
              marginBottom: "16px",
              width: "100%",
            }}
            onClick={() => setOpen(true)}
          >
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => handleFileInputChange(e)}
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
            <UploadOutlined />
            {nameFile === "" ? "Tải lên file" : nameFile}
          </Button>
        </div>
        {nameFile && (
          <Button
            style={{
              marginTop: "16px",
              marginBottom: "16px",
              border: "none",
            }}
            onClick={() => handleRemoveFile()}
          >
            <CloseCircleOutlined style={{ fontSize: "20px", color: "red" }} />
          </Button>
        )}

        <Space
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <Button className="button-css" onClick={() => handleExportExcel()}>
            <DownloadOutlined />
            Tải file mẫu
          </Button>
          <Button className="button-css" onClick={() => setOpen(false)}>
            Xác nhận
          </Button>
        </Space>
      </Modal> */}
    </div>
  );
}
