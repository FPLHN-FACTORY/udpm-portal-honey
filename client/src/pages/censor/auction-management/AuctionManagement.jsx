import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Table,
  Tag,
  Pagination,
  message,
  Tooltip,
  Popconfirm,
  Input,
  Select,
} from "antd";
import "./auction-management.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFilter,
  faPenToSquare,
  faRectangleList,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { AuctionAPI } from "../../../apis/censor/auction/auction.api";
import {
  GetAuction,
  SetAuction,
  DeleteAuction,
  UpdateAuction,
} from "../../../app/reducers/auction/auction.reducer";
import ModalCreateAuction from "./modal-create/ModalCreateAuction.jsx";
import ModalUpdateAuction from "./modal-update/ModalUpdateAuction";
import { GetCategory } from "../../../app/reducers/category/category.reducer";
import moment from "moment";
const { Option } = Select;

export default function AuctionMangement() {
  const [auction, setAuction] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [honeyCategoryId, setHoneyCategoryId] = useState("");
  const [listCategorySearch, setListCategorySearch] = useState([]);
  const { id } = useParams();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(SetAuction([]));
    };
  }, [current]);

  useEffect(() => {
    setName("");
    setStatus("");
    setHoneyCategoryId("");
    fetchDataCategory();
  }, []);

  const fetchDataCategory = async () => {
    const responeGetAllCategory = await AuctionAPI.getALLCategory();
    setListCategorySearch(responeGetAllCategory.data.data);
  };

  const fetchData = () => {
    let filter = {
      name: name,
      status: status,
      honeyCategoryId: honeyCategoryId,
      page: current,
      size: 10,
    };
    AuctionAPI.fetchAll(filter).then((response) => {
      dispatch(SetAuction(response.data.data.data));
      setTotal(response.data.data.totalPages);
      console.log(response.data.data.data);
    });
  };

  const data = useAppSelector(GetAuction);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thời gian",
      dataIndex: "fromDateAndToDate",
      key: "fromDateAndToDate",
      render: (text, record) => {
        const fromDate = new Date(record.fromDate);
        const formattedFromDate = `${fromDate.getDate()}/${
          fromDate.getMonth() + 1
        }/${fromDate.getFullYear()}`;

        const toDate = new Date(record.toDate);
        const formattedToDate = `${toDate.getDate()}/${
          toDate.getMonth() + 1
        }/${toDate.getFullYear()}`;

        return (
          <span>
            {formattedFromDate} - {formattedToDate}
          </span>
        );
      },
    },
    {
      title: "Giá tiền ban đầu",
      dataIndex: "startingPrice",
      key: "startingPrice",
    },
    {
      title: "Bước nhảy",
      dataIndex: "jump",
      key: "jump",
    },
    {
      title: "Thể loại",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Mật ong",
      dataIndex: "honey",
      key: "honey",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => (
        <Tag
          color={parseInt(text) === 0 || text === "HOAT_DONG"   ? "green" : "red"}
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            borderRadius: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {parseInt(text) === 0 || text === "HOAT_DONG"  ? "Mở" : "Đóng"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      key: "action",
      width: "10px",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa phiên đấu giá"
            description="Bạn có chắc chắn muốn xóa bản ghi này không?"
            onConfirm={() => {
              buttonDelete(record.id);
            }}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Xóa">
              <Button
                style={{
                  backgroundColor: "#FF9900",
                  color: "white",
                  height: "35px",
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Tooltip>
          </Popconfirm>
          <Button
            onClick={() => {
              buttonUpdate(record);
            }}
            style={{
              backgroundColor: "#0066CC",
              color: "white",
              height: "35px",
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Space>
      ),
    },
  ];

  const buttonSearch = async () => {
    setCurrent(1);
    let filter = {
      name: name,
      status: status,
      honeyCategoryId: honeyCategoryId,
      page: current,
      size: 10,
    };
    console.log(filter);
    AuctionAPI.fetchAll(filter).then((response) => {
      dispatch(SetAuction(response.data.data.data));
      setTotal(response.data.data.totalPages);
      console.log(response.data.data.data);
    });
  };

  const buttonClear = async () => {
    setName("");
    setStatus("");
    setHoneyCategoryId("");
    setCurrent(1);
    await fetchData();
  };

  const buttonCreate = () => {
    setModalCreate(true);
  };

  const buttonCreateCancel = () => {
    setModalCreate(false);
    setAuction(null);
  };

  const buttonUpdate = (record) => {
    setModalUpdate(true);
    setAuction(record);
  };

  const buttonUpdateCancel = () => {
    setModalUpdate(false);
    setAuction(null);
  };

  const buttonDelete = (id) => {
    AuctionAPI.delete(id).then(
      (response) => {
        message.success("Xóa thành công!");
        dispatch(DeleteAuction(response.data.data));
        fetchData();
      },
      (error) => {
        message.success("Xóa thất bại!");
      }
    );
  };

  return (
    <div>
      <Card style={{ borderTop: "5px solid #FFCC00" }}>
      <div className="filter__auction">
        <FontAwesomeIcon
          icon={faFilter}
          size="2px"
          style={{ fontSize: "26px" }}
        />{" "}
        <span style={{ fontSize: "18px", fontWeight: "500" }}>Bộ lọc</span>
     
            <Row
              gutter={24}
              style={{ marginBottom: "15px", paddingTop: "20px" }}
            >
              <Col span={8}>
                <span>Tên phiên đấu giá:</span>{" "}
                <Input                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Col>
              <Col span={8}>
                <span>Thể loại:</span>
                {""}
                <Select
                  value={honeyCategoryId}
                  onChange={(value) => {
                    setHoneyCategoryId(value);
                  }}
                  style={{ width: "100%", marginRight: "10px"}}
                >
                  <Option value="">Tất cả</Option>
                  {listCategorySearch.map((item) => {
                    return <Option value={item.id}>{item.name}</Option>;
                  })}
                </Select>
              </Col>
              <Col span={8}>
                <span>Trạng thái:</span>
                {""}
                <Select
                  value={status}
                  onChange={(value) => {
                    setStatus(value);
                  }}
                  style={{
                    width: "100%",
                    fontSize: "13px",
                  }}
                >
                  <Option
                    value=""
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Tất cả
                  </Option>
                  <Option
                    value="1"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Mở
                  </Option>
                  <Option
                    value="0"
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    Đóng
                  </Option>
                </Select>
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
                }}
              >
                Làm mới
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
        <Space
          style={{
            justifyContent: "space-between",
            display: "flex",
            marginBottom: "16px",
          }}
        >
          <div>
            <span style={{ fontSize: "18px" }}>
              <FontAwesomeIcon icon={faRectangleList} size="xl" />
              <b style={{ marginLeft: "5px", fontWeight: "500" }}>
                Danh sách đấu giá
              </b>
            </span>
          </div>

          <div>
            <Button
              style={{
                color: "white",
                backgroundColor: "rgb(55, 137, 220)",
              }}
              onClick={buttonCreate}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size="1x"
                style={{
                  backgroundColor: "rgb(55, 137, 220)",
                  marginRight: "5px",
                }}
              />
              Thêm phiên đấu giá
            </Button>
          </div>
        </Space>

        <div
          style={{
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Table
          style={{width: "100%"}}
            dataSource={data}
            rowKey="id"
            columns={columns}
            pagination={false}
          />
          <br></br>
          <div className="pagination__box">
            <Pagination
              simple
              current={current}
              onChange={(page) => {
                setCurrent(page);
              }}
              total={total * 10}
            />
          </div>
        </div>
      </Card>

      <ModalCreateAuction
        visible={modalCreate}
        onCancel={buttonCreateCancel}
        fetchAllData={fetchData}
      />
      <ModalUpdateAuction
        visible={modalUpdate}
        onCancel={buttonUpdateCancel}
        auction={auction}
      />
    </div>
  );
}
