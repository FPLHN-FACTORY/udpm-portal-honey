import { DownloadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { AddItemExcelAPI } from "../../../apis/president/add-item/add-item-excel.api";
import { SetImport } from "../../../app/reducers/import/import.president.reducer";
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
    AddItemExcelAPI.exportExcel({}).then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        "File mẫu import" +
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
      AddItemExcelAPI.previewDataExportExcel(formData)
        .then((response) => {
          setDataPreview(response.data.data.lstPresidentAddItemDTO);
          dispatch(SetImport(response.data.data));
          message.success("Import excel thành công");
        })
        .catch(() => {
          message.error("Import excel thất bại");
        });
    } else {
      message.error("Import excel thất bại");
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
// <div>
    //   <Modal
    //     title="Import Excel"
    //     open={open}
    //     onCancel={() => setOpen(false)}
    //     footer={null}
    //   >
    //     <hr className="border-0 bg-gray-300 mt-3 mb-6" />
    //     <Row>
    //       <Col span={8}></Col>
    //       <Col span={8}>
    //         <Button
    //           htmlFor="file-input"
    //           style={{
    //             marginTop: "16px",
    //             marginBottom: "16px",
    //             width: "100%",
    //           }}
    //           onClick={() => setOpen(true)}
    //         >
    //           <Input
    //             type="file"
    //             accept=".xlsx,.xls"
    //             onChange={(e) => handleFileInputChange(e)}
    //             style={{
    //               position: "absolute",
    //               top: 0,
    //               left: 0,
    //               cursor: "pointer",
    //               opacity: 0,
    //               zIndex: 1,
    //               width: "100%",
    //               height: "100%",
    //             }}
    //           />
    //           <UploadOutlined />
    //           {nameFile === "" ? "Tải lên file" : nameFile}
    //         </Button>
    //       </Col>
    //       <Col span={8}>
    //         {nameFile && (
    //           <Button
    //             style={{
    //               marginTop: "16px",
    //               marginBottom: "16px",
    //               border: "none",
    //             }}
    //             onClick={() => handleRemoveFile()}
    //           >
    //             <CloseCircleOutlined
    //               style={{ fontSize: "20px", color: "red" }}
    //             />
    //           </Button>
    //         )}
    //       </Col>
    //     </Row>

    //     <Space
    //       style={{
    //         justifyContent: "space-between",
    //         display: "flex",
    //         marginBottom: "16px",
    //       }}
    //     >
    //       <Button className="button-css" onClick={() => handleExportExcel()}>
    //         <DownloadOutlined />
    //         Tải file mẫu
    //       </Button>
    //       <Button className="button-css" onClick={() => setOpen(false)}>
    //         Xác nhận
    //       </Button>
    //     </Space>
    //   </Modal>
    // </div>