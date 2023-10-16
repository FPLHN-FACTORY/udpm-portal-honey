import { Card, Input, Pagination, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, EyeOutlined, FormOutlined } from "@ant-design/icons";
import { ConversionAPI } from "../../../apis/censor/conversion/conversion.api";
import ModalDetailConversion from "./ModalDetail";
import ModalAddConversion from "./ModelAdd";
import ModalUpdateConversion from "./ModelUpdate";
import "./Home.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetConversion,
  SetConversion,
} from "../../../app/reducers/conversion/conversion.reducer";

export default function ConversionHome() {
  const [listConversion, setListConversion] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    size: 5,
    textSearch: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchDataConversion(filter);
  }, [filter]);
  const fetchDataConversion = (filter) => {
    ConversionAPI.fetchAllPage(filter).then((response) => {
      dispatch(SetConversion(response.data.data.data));
      setTotalPages(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetConversion);

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
      render: (text) => <span>{`${text} / 0.25`}</span>,
    },
    {
      title: () => <div>Hành động</div>,
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
              // value={searchByName}
              onChange={(e) => {
                setFilter({ ...filter, textSearch: e.target.value });
              }}
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
                  <Tooltip>
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
            dataSource={data}
            rowKey="id"
            pagination={false}
          />
        </div>
        <div className="mt-5 text-center">
          <Pagination
            simple
            current={filter.page}
            onChange={(page) => {
              setFilter({ ...filter, page: page });
            }}
            total={totalPages * 10}
          />
        </div>
      </Card>
    </>
  );
}
