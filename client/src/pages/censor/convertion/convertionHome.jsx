import { Card, Input, Pagination, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { ConversionAPI } from "../../../apis/censor/conversion/conversion.api";
import ModalDetailConversion from "./ModalDetail";
import ModalAddConversion from "./ModelAdd";
import ModalUpdateConversion from "./ModelUpdate";
import "./Home.css";

export default function ConversionHome() {
  const [listConversion, setListConversion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchByName, setSearchByName] = useState("");

  useEffect(() => {
    fetchData(currentPage - 1, searchByName);
  }, [currentPage, searchByName]);

  const handleOnChangePage = (page) => {
    fetchData(page - 1, searchByName);
    setCurrentPage(page);
  };

  const fetchData = (currentPage, searchByName) => {
    ConversionAPI.searchByName(currentPage, searchByName).then((response) => {
      setListConversion(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tỉ lệ",
      dataIndex: "ratio",
      key: "ratio",
    },
    {
      title: () => <div>Action</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chi tiết">
            <ModalUpdateConversion
              conversion={record}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <ModalDetailConversion conversion={record} icon={<FormOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card className="mb-2">
        <form class="flex items-center">
          <div class="relative w-full mr-6">
            <Input
              style={{ borderRadius: "10px", width: "40%" }}
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
              placeholder="Tìm kiếm tên hoặc mã..."
            />
          </div>
          <div>
            <div
              className="flex flex-row-reverse"
              style={{ float: "right", display: "flex" }}
            >
              <div>
                <span>
                  <Tooltip title="Thêm quà">
                    <ModalAddConversion icon={<EyeOutlined />} />
                  </Tooltip>
                </span>
              </div>
            </div>
          </div>
        </form>
      </Card>

      <Card>
        <div className="mt-5">
          <Table
            columns={columns}
            dataSource={listConversion}
            rowKey="id"
            pagination={false}
          />
        </div>
        <div className="mt-5 text-center">
          <Pagination
            simple
            current={currentPage}
            onChange={handleOnChangePage}
            total={totalPages * 10}
          />
        </div>
      </Card>
    </>
  );
}
