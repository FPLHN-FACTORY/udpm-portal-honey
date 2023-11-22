import { InboxOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { AddPointExcelAPI } from "../../../apis/teacher/add-point/add-point-excel.api";
import { SetImport } from "../../../app/reducers/import/import.teacher.reducer";
import { useAppDispatch } from "../../../app/hooks";

export default function ModalImportExcel(props) {
  const { open, setOpen, nameFile, setNameFile, setDataPreview } = props;
  const [file, setFile] = useState(null);

  const handleExportExcel = () => {
    AddPointExcelAPI.exportExcel()
      .then(() => {
        message.success("Export excel thành công");
      })
      .catch((err) => {
        message.error("Export excel thất bại");
      });
  };
  const dispatch = useAppDispatch();
  const handleFileInputChange = (e) => {
    // setNameFile(e.target.files[0].name);
    // const formData = new FormData();
    // formData.append("file", e.target.files[0]);
    // AddPointExcelAPI.previewImportPoint(formData)
    //   .then((response) => {
    //     if (response.data.data.totalError === 0) {
    //       message.success("Import thành công ");
    //     } else {
    //       for (const data of response.data.data.responseList) {
    //         if (
    //           data.importMessageStudent !== null &&
    //           data.importMessageStudent !== "SUCCESS"
    //         ) {
    //           message.error(data.importMessageStudent);
    //         } else if (
    //           data.importMessageCategory !== null &&
    //           data.importMessageCategory !== "SUCCESS"
    //         ) {
    //           message.error(data.importMessageCategory);
    //         } else if (
    //           data.importMessagePoint !== null &&
    //           data.importMessagePoint !== "SUCCESS"
    //         ) {
    //           message.error(data.importMessagePoint);
    //         }
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     message.error("Lỗi khi import Excel.");
    //   });
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file.file.originFileObj);
      AddPointExcelAPI.previewImportPoint(formData)
        .then((response) => {
          setDataPreview(response.data.data.responseList);
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
