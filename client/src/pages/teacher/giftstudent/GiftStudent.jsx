import { SearchOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Table, message } from "antd";
import "./Index.css";
import { useState } from "react";
import { GiftStudentAPI } from "../../../apis/teacher/gift-student/gift-student.api";

export default function TcListStudent() {
  const [listStudent, setListStudent] = useState([]);

  const handleOnchangeExport = () => {
    GiftStudentAPI.export().then(() => {
      message.success("Tải temolate mẫu thành công!");
      downloadExcelTemplate();
    });
  };

  const downloadExcelTemplate = () => {
    const url =
      "http://localhost:2508/api/teacher/list-students/download-template";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob"; // Đặt kiểu dữ liệu là blob để tải file
    xhr.onload = () => {
      if (xhr.status === 200) {
        // Tạo một URL cho file Excel
        const blob = new Blob([xhr.response], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);

        // Tạo một thẻ <a> ẩn để tải file
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "TemplateGiftStudent.xlsx";

        // Thêm thẻ <a> vào body và kích hoạt click để tải file
        document.body.appendChild(a);
        a.click();

        // Sau khi tải xong, giải phóng URL và loại bỏ thẻ <a>
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        message.error("Lỗi khi tải file Excel.");
      }
    };

    xhr.send();
  };

  const handleOnchangeImport = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    GiftStudentAPI.importExcel(formData)
      .then((response) => {
        console.log(response);
        message.success("Import thành công!");
        setListStudent(response.data.data);
      })
      .catch((error) => {
        message.error("Lỗi khi import Excel.");
      });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ArchiveId",
      dataIndex: "archiveId",
      key: "archiveId",
    },
    {
      title: "GiftId",
      dataIndex: "giftId",
      key: "giftId",
    },
    {
      title: "Câu lạc bộ",
      dataIndex: "club",
      key: "club",
    },
  ];

  return (
    <div className="tc-listStudent">
      <Card className="mb-2 py-1">
        <Form className="d-flex align-items-center">
          <Button className="search-button" htmlType="submit" type="primary">
            Search
          </Button>
          <Form.Item className="search-input">
            <Input
              size="small"
              placeholder="Nhập mã sinh viên cần tìm"
              prefix={<SearchOutlined />}
            />
          </Form.Item>
          <div className="ml-auto">
            <Button
              className="export-button"
              type="primary"
              onClick={handleOnchangeExport}
            >
              Export excel
            </Button>
            <label className="import-button" type="primary">
              Import excel
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleOnchangeImport}
                style={{ display: "none" }}
              />
            </label>
          </div>
        </Form>
      </Card>
      <Card>
        {/* <Table
          columns={columns}
          dataSource={listStudent}
          rowKey="code"
          pagination={true}
        /> */}
      </Card>
    </div>
  );
}
