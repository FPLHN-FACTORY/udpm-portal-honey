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
import { UpgradeApi } from "../../../apis/censor/upgrade-rate/upgrade-rate.api";
import {
  GetUpgradeRate,
  SetUpgradeRate,
} from "../../../app/reducers/upgrade-rate/upgrade-rate.reducer";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import ModalCreateUpgradeRate from "./modal-create.jsx";
import ModalUpdateUpgradeRate from "./modal-update.jsx";

const { Option } = Select;

export default function UpgradeRate() {
  const [auction, setAuction] = useState(null);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [originalHoneyId, setOriginalHoneyId] = useState("");
  const [destinationHoneyId, setDestinationHoneyId] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [current]);

  const fetchData = () => {
    UpgradeApi.fetchAll({
      page: current - 1,
    }).then((response) => {
      console.log(response.data.data.data);
      dispatch(SetUpgradeRate(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const fetchCategory = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      setListCategory(response.data.data);
    });
  };

  const DeleteUpgradeRate = (id) => {
    UpgradeApi.delete(id)
      .then((response) => {
        message.success("Đóng nâng cấp thành công!");
        fetchData();
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const buttonSearch = () => {
    setCurrent(1);
    let filter = {
      originalHoneyId: originalHoneyId,
      destinationHoneyId: destinationHoneyId,
      status: status,
      page: current,
    };
    UpgradeApi.fetchAll(filter).then((response) => {
      console.log(response.data.data.data);
      dispatch(SetUpgradeRate(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetUpgradeRate);

  const buttonCreate = () => {
    setModalCreate(true);
  };

  const buttonCreateCancel = () => {
    setModalCreate(false);
    setAuction(null);
  };

  const buttonUpdate = (record) => {
    setModalUpdate(true);
    setCurrentRecord(record);
  };

  const buttonUpdateCancel = () => {
    setModalUpdate(false);
    setAuction(null);
  };

  const buttonClear = async () => {
    setDestinationHoneyId("");
    setStatus("");
    setOriginalHoneyId("");
    setCurrent(1);
    await fetchData();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mật ban đầu",
      dataIndex: "originalHoneyName",
      key: "originalHoneyName",
    },
    {
      title: "Số lượng mật ban đầu",
      dataIndex: "quantityOriginalHoney",
      key: "quantityOriginalHoney",
    },
    {
      title: "Mật sau khi nâng cấp",
      dataIndex: "destinationHoneyName",
      key: "destinationHoneyName",
    },
    {
      title: "Số lượng mật tạo được",
      dataIndex: "quantityDestinationHoney",
      key: "quantityDestinationHoney",
    },
    {
      title: "Tỉ lệ",
      dataIndex: "ratio",
      key: "ratio",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => (
        <Tag
          color={status === 0 ? "green" : "red"}
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            borderRadius: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {status === 0 ? "Hoạt động" : "Không hoạt động"}
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
            title="Đóng nâng cấp"
            onConfirm={() => {
              DeleteUpgradeRate(record.id);
            }}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Đóng nâng cấp">
              <Button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  height: "35px",
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Tooltip>
          </Popconfirm>
          <Tooltip title="Sửa">
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
          </Tooltip>
        </Space>
      ),
    },
  ];

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
          <Row gutter={24} style={{ marginBottom: "15px", paddingTop: "20px" }}>
            <Col span={8}>
              <span>Mật ban đầu:</span>
              {""}
              <Select
                value={originalHoneyId}
                onChange={(value) => {
                  setOriginalHoneyId(value);
                }}
                style={{ width: "100%", marginRight: "10px" }}
              >
                <Option value="">Tất cả</Option>
                {listCategory.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Col>
            <Col span={8}>
              <span>Mật sau khi nâng cấp:</span>
              {""}
              <Select
                value={destinationHoneyId}
                onChange={(value) => {
                  setDestinationHoneyId(value);
                }}
                style={{ width: "100%", marginRight: "10px" }}
              >
                <Option value="">Tất cả</Option>
                {listCategory.map((item) => {
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
                  value={""}
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Tất cả
                </Option>
                <Option
                  value={0}
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Hoạt động
                </Option>
                <Option
                  value={1}
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Không hoạt động
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
                Danh sách nâng cấp
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
              Thêm nâng cấp
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
            columns={columns}
            dataSource={data}
            rowKey="id"
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

      <ModalCreateUpgradeRate
        visible={modalCreate}
        onCancel={buttonCreateCancel}
        fetchAllData={fetchData}
      />

      <ModalUpdateUpgradeRate
        visible={modalUpdate}
        onCancel={buttonUpdateCancel}
        fetchAllData={fetchData}
        currentItem={currentRecord}
        buttonUpdateCancel={buttonUpdateCancel}
      />
    </div>
  );
}
