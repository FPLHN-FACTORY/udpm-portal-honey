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
import "./UpgradeRateManagement.css";
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
import { UpgradeApi } from "../../../apis/censor/upgradeRate/UpgradeRate.api";
import {
  GetUpgradeRate,
  SetUpgradeRate,
  DeleteUpgradeRate,
  ChangeUpgradeRateStatus,
} from "../../../app/reducers/upgradeRate/upgradeRate.reducer";
import ModalCreateUpgradeRate from "./modal-create/ModalCreateUpgradeRate";
import ModalUpdateUpgradeRate from "./modal-update/ModalUpdateUpgradeRate";
const { Option } = Select;

export default function UpgradeRateManagement() {
  const [upgradeRate, setUpgradeRate] = useState(null);
  const [status, setStatus] = useState("");
  const [listCategorySearch, setListCategorySearch] = useState([]);

  const [originalHoney, setOriginalHoney] = useState("");
  const [destinationHoney, setDestinationHoney] = useState("");

  const { id } = useParams();
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(setUpgradeRate([]));
    };
  }, [current]);

  useEffect(() => {
    setDestinationHoney("");
    setOriginalHoney("");
    setStatus("");
    fetchDataCategory();
  }, []);

  const fetchDataCategory = async () => {
    const responeGetAllCategory = await UpgradeApi.getALLCategory();
    setListCategorySearch(responeGetAllCategory.data.data);
  };

  const fetchData = () => {
    let filter = {
      originalHoney: originalHoney,
      destinationHoney: destinationHoney,
      status: status,
      page: current,
      size: 10,
    };
    UpgradeApi.fetchAll(filter).then((response) => {
      dispatch(setUpgradeRate(response.data.data.data));
      console.log(response.data.data.data);
      setTotal(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetUpgradeRate);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Tên loại điểm đầu",
      dataIndex: "originalHoneyName",
      key: "originalHoneyName",
      align: "center",
    },
    {
      title: "Tên loại điểm cuối",
      dataIndex: "destinationHoneyName",
      key: "destinationHoneyName",
      align: "center",
    },
    ,
    {
      title: "Tỉ lệ thành công",
      dataIndex: "ratio",
      key: "ratio",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text) => (
        <Tag
          color={text === "HOAT_DONG" ? "green" : "red"}
          style={{
            fontSize: "14px",
            padding: "5px 10px",
            borderRadius: "10px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {text === "HOAT_DONG" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      key: "action",
      width: "10px",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Đón phòng đấu giá"
            description="Bạn có chắc chắn muốn đóng phòng này không?"
            onConfirm={() => {
              buttonDelete(record.id);
            }}
            okText="Có"
            cancelText="Không"
          >
            <Tooltip title="Đóng phòng đấu giá">
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

  const buttonSearch = async () => {
    setCurrent(1);
    let filter = {
      originalHoneyId: originalHoney,
      destinationHoneyId: destinationHoney,
      status: status,
      page: current,
      size: 10,
    };
    console.log(filter);
    UpgradeApi.fetchAll(filter).then((response) => {
      dispatch(setUpgradeRate(response.data.data.data));
      setTotal(response.data.data.totalPages);
      console.log(response.data.data.data);
    });
  };

  const buttonClear = async () => {
    setStatus("");
    setOriginalHoney("");
    setDestinationHoney("");
    setCurrent(1);
    await fetchData();
  };

  const buttonCreate = () => {
    setModalCreate(true);
  };

  const buttonCreateCancel = () => {
    setModalCreate(false);
    setUpgradeRate(null);
  };

  const buttonUpdate = (record) => {
    setModalUpdate(true);
    setUpgradeRate(record);
  };

  const buttonUpdateCancel = () => {
    setModalUpdate(false);
    setUpgradeRate(null);
  };

  const buttonDelete = (id) => {
    UpgradeApi.changeStatus(id).then(
      (response) => {
        message.success("Đóng thành công!");
        dispatch(ChangeUpgradeRateStatus(response.data.data));
        fetchData();
      },
      (error) => {
        message.error("Đóng thất bại!");
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
          <Row gutter={24} style={{ marginBottom: "15px", paddingTop: "20px" }}>
            <Col span={8}>
              <span>Loại điểm đầu:</span>
              {""}
              <Select
                value={originalHoney}
                onChange={(value) => {
                  setOriginalHoney(value);
                }}
                style={{ width: "100%", marginRight: "10px" }}
              >
                <Option value="">Tất cả</Option>
                {listCategorySearch.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Col>
            <Col span={8}>
              <span>Loại điểm cuối:</span>
              {""}
              <Select
                value={destinationHoney}
                onChange={(value) => {
                  setDestinationHoney(value);
                }}
                style={{ width: "100%", marginRight: "10px" }}
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
                  value="0"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Hoạt động
                </Option>
                <Option
                  value="1"
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
                  border: "none"
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
                Danh sách nâng hạng
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
              Thêm nâng hạng
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
        // auction={auction}
        fetchAllData={fetchData}
      />
    </div>
  );
}
