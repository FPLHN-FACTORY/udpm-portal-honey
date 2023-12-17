import React, { useState } from "react";
import "./index.css";
import {
  Button,
  Card,
  Form,
  Row,
  Space,
  Table,
  Tooltip,
  message,
} from "antd";
import {
  DownloadOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "../../app/hooks";
import { AddItemAPI } from "../../apis/president/add-item/add-item.api";
import ModalUpLoadFile from "./ModalUploadFile";
import { GetImport } from "../../app/reducers/import/import.president.reducer";
import ModalConfirm from "./ModalConfirm";
import { AddItemExcelAPI } from "../../apis/president/add-item/add-item-excel.api";
import { convertLongToDate } from "../util/DateUtil";

export default function AddItem() {
  const [student, setStudent] = useState({});
  const [honeyStudent, setHoneyStudent] = useState({ honey: 0 });
  const [categorySelected, setCategorySelected] = useState();

  const [dataPreview, setDataPreview] = useState([]);

  const [openUpload, setOpenUpload] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [formSearch] = Form.useForm();
  const [formAddPoint] = Form.useForm();

  const [nameFileUpload, setNameFileUpload] = useState("");
  const previewImport = useAppSelector(GetImport);

  const onFinishAdd = (values) => {
    addPoint({
      ...values,
      honeyId: honeyStudent.id,
      studentId: student.id,
      categoryId: categorySelected,
    });
  };

  const addPoint = (data) => {
    AddItemAPI.addPoint(data).then((response) => {
      if (response.data.success) {
        message.success("Đã gửi yêu cầu!");
        formAddPoint.resetFields();
        formSearch.resetFields();
        setStudent({});
      } else {
        message.error("Gửi yêu cầu thất bại!");
      }
    });
  };

  const getHoney = (studentId, categoryId) => {
    AddItemAPI.getHoney(studentId, categoryId).then((response) => {
      if (response.data.success) {
        setHoneyStudent(response.data.data);
      } else {
        setHoneyStudent({ point: 0 });
      }
    });
  };

  const handleClostPreview = () => {
    setDataPreview([]);
    setNameFileUpload("");
  };

  const handleExportExcel = () => {
    AddItemExcelAPI.exportExcel({}).then((response) => {
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        "File mẫu import" + convertLongToDate(new Date().getTime()) + ".xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const columsPreview = [
    {
      title: "Mã sinh viên",
      dataIndex: "userName",
      key: "username",
      render: (_, record) => {
        return record.userName === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.userName}</span>
        );
      },
    },
    {
      title: "Vật phẩm",
      dataIndex: "lstGift",
      key: "lstGift",
      render: (_, record) => {
        return record.lstGift === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.lstGift}</span>
        );
      },
    },
    {
      title: "Mật ong",
      dataIndex: "lstHoney",
      key: "lstHoney",
      render: (_, record) => {
        return record.lstHoney === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.lstHoney}</span>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "importMessage",
      key: "importMessage",
      render: (_, record) => {
        return record.error === false ? (
          <Tooltip title={record.importMessage}>
            <span style={{ color: "green" }}>Thành công</span>
          </Tooltip>
        ) : (
          <Tooltip title={record.importMessage}>
            <span style={{ color: "red" }}>Thất bại</span>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div>
      <div className="add-point">
        <Card className="mb-2 py-1">
          <Row justify="center">
            <Button
              className="import-button"
              type="primary"
              onClick={() => setOpenUpload(true)}
            >
              Import excel
            </Button>
            <Button
              className="ml-2"
              key="download"
              onClick={() => handleExportExcel()}
            >
              <DownloadOutlined />
              Tải file mẫu
            </Button>
            {openUpload && (
              <ModalUpLoadFile
                openUpload={openUpload}
                setOpenUpload={setOpenUpload}
                setDataPreview={setDataPreview}
                nameFileUpload={nameFileUpload}
                setNameFileUpload={setNameFileUpload}
              />
            )}
          </Row>
        </Card>
      </div>
      {dataPreview.length > 0 && (
        <Card style={{ borderTop: "5px solid #FFCC00", marginTop: "32px" }}>
          <Space
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: "24px",
            }}
          >
            <div>
              <b style={{ fontSize: "25px" }}>Dữ liệu import</b>
            </div>
            <div>
              <span>
                {previewImport && (
                  <b style={{ fontSize: "15px" }}>
                    <span style={{ color: "#FFCC00" }}>Tổng: </span>
                    {previewImport.total} -
                    <span style={{ color: "green" }}> Thành công: </span>
                    {previewImport.totalSuccess} -
                    <span style={{ color: "red" }}> Lỗi: </span>
                    {previewImport.totalError}
                  </b>
                )}
              </span>
            </div>
          </Space>
          <Table
            dataSource={dataPreview}
            columns={columsPreview}
            pagination={false}
          />
          <Space
            style={{
              justifyContent: "right",
              display: "flex",
              marginTop: "32px",
            }}
          >
            <Button className="button-css" onClick={() => handleClostPreview()}>
              Đóng
            </Button>
            <Button
              disabled={previewImport.totalError < 1 ? false : true}
              className="button-css"
              onClick={() => setOpenConfirm(true)}
            >
              Thêm
            </Button>
            {openConfirm && (
              <ModalConfirm
                dataPreview={dataPreview}
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                setDataPreview={setDataPreview}
                setNameFileUpload={setNameFileUpload}
              />
            )}
          </Space>
        </Card>
      )}
    </div>
  );
}
