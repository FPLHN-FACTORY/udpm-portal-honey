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
  ChangeAuctionStatus,
} from "../../../app/reducers/auction/auction.reducer";
import ModalCreateAuction from "./modal-create/ModalCreateAuction.jsx";
import ModalUpdateAuction from "./modal-update/ModalUpdateAuction";
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
    const data = {
      ...searchParams,
      page: current,
      size: size,
    };
    AuctionAPI.fetchAll(data).then((response) => {
      dispatch(SetAuction(response.data.data.data));
      setTotal(response.data.data.totalPages);
      setCurrent(response.data.data.currentPage);
      if (total > response.data.data.totalPages) {
        setCurrent(0);
      } else {
        setCurrent(response.data.data.currentPage);
      }
      console.log("2222" + response.data.data.data);
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
      title: "Tên phòng đấu giá",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại điểm",
      dataIndex: "nameCategory",
      key: "nameCategory",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Từ ",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY HH:MM:ss")}</span>
    },
    {
      title: "Đến",
      dataIndex: "toDate",
      key: "toDate",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY HH:MM:ss")}</span>
    },
    {
      title: "Mật ong",
      dataIndex: "lastPrice",
      key: "lastPrice",
      render: (text) => <span>{text ? text: "?"}</span>
    },
    {
      title: "Vật phẩm đấu giá",
      dataIndex: "giftName",
      key: "giftName",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Giá cố định",
      dataIndex: "startingPrice",
      key: "startingPrice",
      align: "center",
    },
    {
      title: "Giá hiện tại",
      dataIndex: "lastPrice",
      key: "lastPrice",
      align: "center",
      render: (_, record) => {
        if (record.lastPrice === null) {
          return "?";
        } else {
          return record.lastPrice;
        }
      },
    },
    {
      title: "Loại mật ong",
      dataIndex: "nameCategory",
      key: "nameCategory",
      align: "center",
    },
  ];

  const buttonSearch = async () => {
    const values = form.getFieldsValue();
    setSearchParams({
      nameGift: values.nameGift,
      category: values.category,
      type: values.type,
      startingPrice: values.startingPrice,
    });
    setCurrent(0);
  };

  const buttonClear = async () => {
    form.resetFields();
    setSearchParams({
      nameGift: "",
      category: "",
      type: "",
      startingPrice: "",
    });
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

  // const buttonDelete = (id) => {
  //   AuctionAPI.changeStatus(id).then(
  //     (response) => {
  //       message.success("Đóng thành công!");
  //       dispatch(ChangeAuctionStatus(response.data.data));
  //       fetchData();
  //     },
  //     (error) => {
  //       message.error("Đóng thất bại!");
  //     }
  //   );
  // };

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
          <Form form={form}>
            <Row
              gutter={12}
              style={{ marginBottom: "15px", paddingTop: "20px" }}
            >
              <Col span={6}>
                <Form.Item
                  name="nameGift"
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 17 }}
                  label={
                    <span style={{ marginRight: "8px" }}>Tên vật phẩm</span>
                  }
                >
                  <Input
                    onKeyPress={(e) => {
                      if (e.key === " " && e.target.selectionStart === 0) {
                        e.preventDefault();
                      }
                    }}
                    style={{ textAlign: "center", height: "30px" }}
                    placeholder="Tên vật phẩm"
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="category"
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 17 }}
                  label={
                    <span style={{ marginRight: "8px" }}>Loại mật ong</span>
                  }
                >
                  <Select
                    style={{ textAlign: "center" }}
                    placeholder="Chọn loại mật"
                  >
                    {listCategorySearch?.map((item) => {
                      return (
                        <Select.Option value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="type"
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 17 }}
                  label={
                    <span style={{ marginRight: "8px" }}>Loại vật phẩm</span>
                  }
                >
                  <Select
                    style={{ textAlign: "center" }}
                    placeholder="Chọn loại vật phẩm"
                  >
                    {listType?.map((item) => {
                      return (
                        <Select.Option value={item.value}>
                          {item.label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="startingPrice"
                  labelCol={{ span: 9 }}
                  wrapperCol={{ span: 17 }}
                  label={
                    <span style={{ marginRight: "8px" }}>Giá bắt đầu</span>
                  }
                >
                  <Input
                    type="number"
                    style={{
                      textAlign: "center",
                      height: "30px",
                      width: "100%",
                    }}
                    placeholder="Vui lòng nhập giá."
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
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
                Danh sách phòng đấu giá
              </b>
            </span>
          </div>
          <div>
            <Button
              style={{
                color: "white",
                backgroundColor: "rgb(55, 137, 220)",
                textAlign: "center",
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
              Thêm phòng đấu giá
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
            style={{ width: "100%" }}
            dataSource={data}
            rowKey="id"
            columns={columns}
            pagination={false}
          />
          <br></br>
          <div className="pagination__box">
            <Pagination
              simple
              onChange={(value) => {
                setCurrent(value - 1);
              }}
              current={current + 1}
              total={total * size}
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
        fetchAllData={fetchData}
      />
    </div>
  );
}
