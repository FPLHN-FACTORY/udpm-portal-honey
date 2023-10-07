import {
  CloseCircleOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space, message } from "antd";
import React from "react";
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
    setNameFile(e.target.files[0].name);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setLoading(true);
    RandomAddPointAPI.createPreviewImportExcel(formData)
      .then((response) => {
        console.log("====================================");
        console.log(response.data.data);
        console.log("====================================");
        message.success("Import excel thành công");
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
    setLoading(false);
  };

  const handleRemoveFile = () => {
    setNameFile("");
    setListStudentPoint([]);
    setListStudentItem([]);
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
