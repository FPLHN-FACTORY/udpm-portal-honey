import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import "./index.css";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";
import { convertLongToDate } from "../../util/DateUtil";

export default function ModalImportExcel(props) {
  const {
    open,
    setOpen,
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
    RandomAddPointAPI.createExportExcel({}).then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        "File mẫu random import" +
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
      RandomAddPointAPI.previewDataRandomExcel(formData)
        .then((response) => {
          if (response.data.data.total > 0) {
            const idList = response.data.data.lstAdminAddPointDTO.map(
              (item) => item.id
            );
            setListStudentPoint({
              ...dataRandomPoint,
              listStudentPoint: idList,
            });
            setListStudentItem({
              ...dataRandomItem,
              listStudentPoint: idList,
            });
            setDataPreview(response.data.data);
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
    setNameFile("");
    setOpen(false);
  };

  const handleOnChangeFile = (e) => {
    setNameFile(e.file.name);
    setFile(e);
  };

  const handleRemoveFile = () => {
    setNameFile("");
    setListStudentPoint(dataRandomPoint);
    setListStudentItem(dataRandomItem);
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
