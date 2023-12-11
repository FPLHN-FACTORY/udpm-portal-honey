import { InboxOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { AddItemExcelAPI } from "../../apis/president/add-item/add-item-excel.api";
import { SetImport } from "../../app/reducers/import/import.president.reducer";
import { useAppDispatch } from "../../app/hooks";

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


  const handleFileInputChange = (e) => {
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file.file.originFileObj);
      AddItemExcelAPI.previewDataExportExcel(formData)
        .then((response) => {
          setDataPreview(response.data.data.lstPresidentAddItemDTO);
          dispatch(SetImport(response.data.data));
          message.success("Tải file excel thành công");
        })
        .catch(() => {
          message.error("Tải file excel thất bại");
        });
    } else {
      message.error("Tải file excel thất bại");
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
