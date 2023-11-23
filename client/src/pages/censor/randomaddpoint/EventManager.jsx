import {
  Button,
  Card,
  Form,
  Input,
  Tooltip,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { Option } from "antd/es/mentions";
import ModalImportExcelEvent from "./ModalImportExcelEvent";
import { useEffect, useState } from "react";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AddPointStudentAPI } from "../../../apis/censor/add-point/add-point-student.api";
import React from "react";
import ModalConfirmEvent from "./ModalConfirmEvent";
import { GetImport } from "../../../app/reducers/import/import.president.reducer";

export default function EventManager() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("");
  const [nameFile, setNameFile] = useState("");
  const [dataPreview, setDataPreview] = useState([]);
  const previewImport = useAppSelector(GetImport);
  const [openConfirm, setOpenConfirm] = useState(false);

  const fetchDataCate = () => {
    AddPointStudentAPI.getCategory().then((respose) => {
      dispatch(SetCategory(respose.data.data));
    });
  };

  useEffect(() => {
    fetchDataCate();
  }, []);

  const categoryData = useAppSelector(GetCategory);
  const columsPreview = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => {
        return record.userName === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.userName}</span>
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
  const handleClostPreview = () => {
    setDataPreview([]);
    setNameFile("");
  };
  return (
    <>
      <section id="project_manager">
        <Card style={{ borderTop: "5px solid #FFCC00", marginBottom: 30 }}>
          <div className="filter__auction">
            {/* <FontAwesomeIcon
              icon={faFilter}
              size="2px"
              style={{ fontSize: "26px" }}
            />{" "} */}
            {/* <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span> */}
            <Row gutter={24} style={{ paddingTop: "20px" }}>
              <Form.Item
                name="code"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "Vui lòng nhập số lượng mật ong",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Số lượng mật ong phải lớn hơn hoặc bằng 0",
                  },
                ]}
                style={{ width: 500, marginRight: 10 }}
              >
                <Input
                  size="small"
                  type="number"
                  placeholder="Nhập số lượng mật ong"
                  defaultValue={1}
                />
              </Form.Item>

              <Select
                placeholder="Thể loại"
                style={{ width: 400, marginRight: "10px" }}
                value={category}
                onChange={(value) => setCategory(value)}
              >
                <Option value="" disabled={true}>
                  Chọn thể loại
                </Option>
                {categoryData.map((category) => (
                  <Option value={category.id}>{category.name}</Option>
                ))}
              </Select>

              <Button
                style={{
                  marginRight: "8px",
                  backgroundColor: "rgb(55, 137, 220)",
                  color: "white",
                }}
                onClick={() => setOpen(true)}
              >
                Import excel
              </Button>
              {open && (
                <ModalImportExcelEvent
                  open={open}
                  setOpen={setOpen}
                  nameFile={nameFile}
                  setNameFile={setNameFile}
                  setDataPreview={setDataPreview}
                />
              )}
            </Row>
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
                <Button
                  className="button-css"
                  onClick={() => handleClostPreview()}
                >
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
                  <ModalConfirmEvent
                    dataPreview={dataPreview}
                    openConfirm={openConfirm}
                    setOpenConfirm={setOpenConfirm}
                    setDataPreview={setDataPreview}
                    setNameFile={setNameFile}
                  />
                )}
              </Space>
            </Card>
          )}
        </Card>
      </section>
    </>
  );
}
