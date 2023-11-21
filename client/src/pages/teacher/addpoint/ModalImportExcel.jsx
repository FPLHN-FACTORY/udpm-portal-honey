import {
  CloseCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space, message } from "antd";
import React from "react";
import { AddPointExcelAPI } from "../../../apis/teacher/add-point/add-point-excel.api";

export default function ModalImportExcel(props) {
  const { open, setOpen, nameFile, setNameFile, loading } = props;

  const handleExportExcel = () => {
    AddPointExcelAPI.exportExcel()
      .then(() => {
        message.success("Export excel thành công");
      })
      .catch((err) => {
        message.error("Export excel thất bại");
      });
  };

  const handleFileInputChange = (e) => {
    setNameFile(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    AddPointExcelAPI.previewImportPoint(formData)
      .then((response) => {
        if (response.data.data.totalError === 0) {
          message.success("Import thành công ")
        } else {
          for (const data of response.data.data.responseList) {
            if (data.importMessageStudent !== null && data.importMessageStudent !== "SUCCESS") {
              message.error(data.importMessageStudent); 
            }else if (data.importMessageCategory !== null && data.importMessageCategory !== "SUCCESS") {
              message.error(data.importMessageCategory);  
            }   else if (data.importMessagePoint !== null && data.importMessagePoint !==  "SUCCESS") {
              message.error(data.importMessagePoint); 
            }
          }
        
        }

      })
      .catch((error) => {
        message.error("Lỗi khi import Excel.");
      });
  };

  const handleRemoveFile = () => {
    setNameFile("");
  };

  return (
    <div>
      <Modal
        title="Import Excel"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
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
          </Col>
          <Col span={8}>
            {nameFile && (
              <Button
                style={{
                  marginTop: "16px",
                  marginBottom: "16px",
                  border: "none",
                }}
                onClick={() => handleRemoveFile()}
              >
                <CloseCircleOutlined
                  style={{ fontSize: "20px", color: "red" }}
                />
              </Button>
            )}
          </Col>
        </Row>

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
      </Modal>
    </div>
  );
}
