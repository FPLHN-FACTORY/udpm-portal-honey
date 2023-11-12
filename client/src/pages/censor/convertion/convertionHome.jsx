import {
  Card,
  Input,
  Pagination,
  Space,
  Table,
  Tooltip,
  Col,
  Row,
  Button,
} from "antd";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
export default function ConversionHome() {
  const [totalPages, setTotalPages] = useState(0);
  const [current, setCurrent] = useState(1);
  const [text, setText] = useState(1);
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchDataConversion();
  }, []);
  const fetchDataConversion = () => {
    ConversionAPI.fetchAllPage({
      page: 1,
      size: 10,
      textSearch: text,
    }).then((response) => {
      dispatch(SetConversion(response.data.data.data));
      setTotalPages(response.data.data.totalPages);
    });
  };
  const buttonClear = () => {
    // setDestinationHoneyId(null);
    setCurrent(1);
    fetchDataConversion();
  };
  const buttonSearch = () => {
    setCurrent(1);
    let filter = {
      textSearch: text,
      page: current - 1,
    };
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
      render: (text) => <span>{`${text} / 1`}</span>,
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
      <Card style={{ borderTop: "5px solid #FFCC00" }}>
        <div className="filter__auction">
          <FontAwesomeIcon
            icon={faFilter}
            size="2px"
            style={{ fontSize: "26px" }}
          />{" "}
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
          <Row gutter={24} style={{ marginBottom: "15px", paddingTop: "20px" }}>
            <Col span={24}>
              <span>Mã quy đổi: </span>
              {""}
              <Input
                style={{ borderRadius: "10px", width: "40%" }}
                // value={searchByName}
                onChange={(value) => {
                  setText(value);
                }}
                placeholder="Tìm kiếm theo mã"
              />
            </Col>
          </Row>
        </div>
        <Space
          style={{
            justifyContent: "center",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <Row>
            <Col span={12}>
              <Button
                onClick={buttonSearch}
                style={{
                  marginRight: "8px",
                  backgroundColor: "rgb(55, 137, 220)",
                  color: "white",
                }}
              >
                Tìm kiếm
              </Button>
            </Col>
            <Col span={12}>
              <Button
                onClick={buttonClear}
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#FF9900",
                  color: "white",
                  outline: "none",
                  border: "none",
                }}
              >
                Làm mới
              </Button>
            </Col>
          </Row>
        </Space>
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
            current={current}
            onChange={(page) => {
              setCurrent(page);
            }}
            total={totalPages * 10}
          />
        </div>
      </Card>
    </>
  );
}
