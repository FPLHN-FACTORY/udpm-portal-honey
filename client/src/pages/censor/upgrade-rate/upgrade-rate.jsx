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
  Select,
  Modal,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faPenToSquare,
  faRectangleList,
  faPlus,
  faCircleInfo,
  faArrowDownLong,
  faArrowRight,
  faLockOpen,
  faLock,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { UpgradeApi } from "../../../apis/censor/upgrade-rate/upgrade-rate.api";
import {
  GetUpgradeRate,
  SetUpgradeRate,
} from "../../../app/reducers/upgrade-rate/upgrade-rate.reducer";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import ModalCreateUpgradeRate from "./modal-create.jsx";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { SetGift } from "../../../app/reducers/gift/gift.reducer";

const { Option } = Select;

export default function UpgradeRate() {
  const [status, setStatus] = useState(null);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const [modalCreate, setModalCreate] = useState(false);
  const [originalHoneyId, setOriginalHoneyId] = useState(null);
  const [destinationHoneyId, setDestinationHoneyId] = useState(null);
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    fetchData();
    fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    fetchCategory();
    featAllGift();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = () => {
    UpgradeApi.fetchAll({
      page: current - 1,
    }).then((response) => {
      dispatch(SetUpgradeRate(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const fetchCategory = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      dispatch(SetCategory(response.data.data));
    });
  };

  const DeleteUpgradeRate = (record) => {
    console.log({ status: record.status, id: record.id });
    UpgradeApi.delete({ status: record.status, id: record.id })
      .then((response) => {
        if (record.status === 1) {
          message.success("Mở hoạt động thành công!");
        } else {
          message.success("Đóng hoạt động thành công!");
        }
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
      page: current - 1,
    };
    UpgradeApi.fetchAll(filter).then((response) => {
      dispatch(SetUpgradeRate(response.data.data.data));
      setTotal(response.data.data.totalPages);
    });
  };

  const data = useAppSelector(GetUpgradeRate);
  const listCategory = useAppSelector(GetCategory);

  const buttonCreate = () => {
    setModalCreate(true);
    setCurrentRecord(null);
  };

  const buttonCreateCancel = () => {
    setModalCreate(false);
  };

  const buttonUpdate = (record) => {
    setModalCreate(true);
    setCurrentRecord(record);
  };

  const featAllGift = () => {
    UpgradeApi.getAllCensorExist()
      .then((response) => {
        dispatch(SetGift(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const buttonClear = () => {
    setDestinationHoneyId(null);
    setStatus(null);
    setOriginalHoneyId(null);
    setCurrent(1);
    fetchData();
  };

  const openModalDetail = (data) => {
    Modal.info({
      title: "Xem chi tiết",
      maskClosable: true,
      width: 800,
      content: (
        <>
          <Row>
            <Row className="w-full justify-between">
              <Col span={11}>
                <Tooltip title="Loại mật ong cần nâng cấp">
                  <Card className="h-full">
                    <Row>
                      <Col span={14}>
                        <span className="font-semibold text-lg">
                          Loại mật ong:
                        </span>
                      </Col>
                      <Col span={10}>
                        <p className="font-normal text-lg">
                          {" "}
                          {data.originalHoney}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={14}>
                        <span className="font-semibold text-lg">
                          Số lượng mật ong:
                        </span>
                      </Col>
                      <Col span={10}>
                        <p className="font-normal text-lg">
                          {" "}
                          {data.quantityOriginal}
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </Tooltip>
              </Col>
              <Col className="flex justify-center items-center" span={2}>
                <FontAwesomeIcon className=" text-3xl" icon={faPlus} />
              </Col>
              <Col span={11}>
                <Tooltip title="Vật phẩm kèm theo">
                  <Card className="h-full">
                    <Row>
                      <Col span={14}>
                        <span className="font-semibold text-lg">
                          Vật phẩm kèm theo:
                        </span>
                      </Col>
                      <Col span={10}>
                        <p className="font-normal text-lg"> {data.giftName}</p>
                      </Col>
                    </Row>
                  </Card>
                </Tooltip>
              </Col>
            </Row>
            <Row className="w-full flex justify-center items-center my-5">
              <span>
                <FontAwesomeIcon
                  className="font-black text-3xl"
                  icon={faArrowDownLong}
                />
                <Tooltip title="Tỉ lệ thành công">
                  <span className="font-normal text-lg absolute text-red-600">
                    {data.ratio} %
                  </span>
                </Tooltip>
              </span>
            </Row>
            <Row className="w-full flex justify-center items-center">
              <Col
                className="w-full flex justify-center items-center"
                span={24}
              >
                <Tooltip title="Loại mật ong nâng cấp">
                  <Card className="w-1/2">
                    <Row>
                      <Col span={14}>
                        <span className="font-semibold text-lg">
                          Loại mật ong:
                        </span>
                      </Col>
                      <Col span={10}>
                        <p className="font-normal text-lg">
                          {data.destinationHoney}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={14}>
                        <span className="font-semibold text-lg">
                          Số lượng mật ong:
                        </span>
                      </Col>
                      <Col span={10}>
                        <p className="font-normal text-lg">
                          {data.quantityDestination}
                        </p>
                      </Col>
                    </Row>
                  </Card>
                </Tooltip>
              </Col>
            </Row>
          </Row>
        </>
      ),
      onOk() {}, // Xử lý khi người dùng nhấn OK
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: "Loại mật ong nâng cấp",
      dataIndex: "originalHoney",
      key: "originalHoney",
      render: (text, record, index) => (
        <>
          {record.originalHoney} <FontAwesomeIcon icon={faArrowRight} />{" "}
          {record.destinationHoney}{" "}
        </>
      ),
    },
    {
      title: "Số lượng nâng cấp",
      dataIndex: "quantityOriginal",
      key: "quantityOriginal",
      render: (text, record, index) => (
        <>
          {record.quantityOriginal} <FontAwesomeIcon icon={faArrowRight} />{" "}
          {record.quantityDestination}{" "}
        </>
      ),
    },
    {
      title: "Vật phẩm đi kèm",
      dataIndex: "giftName",
      key: "giftName",
    },
    {
      title: "Tỉ lệ",
      dataIndex: "ratio",
      key: "ratio",
      render: (text, record, index) => <span>{record.ratio}%</span>,
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
      render: (_, record) => (
        <Space>
          {record.status === 0 ? (
            <Popconfirm
              title="Đóng hoạt động"
              onConfirm={() => {
                DeleteUpgradeRate(record);
              }}
              okText="Có"
              cancelText="Không"
            >
              <Tooltip title="Đóng hoạt động">
                <Button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    height: "35px",
                  }}
                >
                  <FontAwesomeIcon icon={faLock} />
                </Button>
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Mở hoạt động"
              onConfirm={() => {
                DeleteUpgradeRate(record);
              }}
              okText="Có"
              cancelText="Không"
            >
              <Tooltip title="Mở hoạt động">
                <Button
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    height: "35px",
                  }}
                >
                  <FontAwesomeIcon icon={faLockOpen} />
                </Button>
              </Tooltip>
            </Popconfirm>
          )}
          <Tooltip title="Xem chi tiết">
            <Button
              onClick={() => openModalDetail(record)}
              style={{
                backgroundColor: "red",
                color: "white",
                height: "35px",
              }}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </Tooltip>
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
                <Option>Tất cả</Option>
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
                <Option>Tất cả</Option>
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
                  value={null}
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
      {modalCreate && (
        <ModalCreateUpgradeRate
          visible={modalCreate}
          onCancel={buttonCreateCancel}
          fetchAllData={fetchData}
          currentItem={currentRecord}
        />
      )}
    </div>
  );
}
