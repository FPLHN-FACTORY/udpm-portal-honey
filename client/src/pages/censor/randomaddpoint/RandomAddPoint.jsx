import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  Tooltip,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";
import "./index.css";
import ModalImportExcel from "./ModalImportExcel";
import ModalAddChest from "./ModalAddChest";
import ModalAddChestGift from "./ModalAddChestGift";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetChest, SetChest } from "../../../app/reducers/chest/chest.reducer";

const initialDataRandomPoint = {
  minPoint: null,
  maxPoint: null,
  listCategoryPoint: [],
  listStudentPoint: [],
};

const initialDataRandomItem = {
  chestId: "",
  listItem: [],
  listStudentPoint: [],
};

export default function RandomAddPoint() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState([]);
  const [listGiftByChest, setListGiftByChest] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dataPreview, setDataPreview] = useState([]);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [nameFile, setNameFile] = useState("");
  const [chestDetail, setChestDetail] = useState();
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [selectedChest, setSelectedChest] = useState("");
  const [errorMinPoint, setErrorMinPoint] = useState("");
  const [errorMaxPoint, setErrorMaxPoint] = useState("");
  const [errorListCategory, setErrorListCategory] = useState("");
  const [errorChestId, setErrorChestId] = useState("");
  const [dataRandomPoint, setDataRandomPoint] = useState(
    initialDataRandomPoint
  );
  const [dataRandomItem, setDataRandomItem] = useState(initialDataRandomItem);

  const listChest = useAppSelector(GetChest);

  const optionCategory = [];
  category.map((c) =>
    optionCategory.push({
      value: c.id,
      label: c.name,
    })
  );
  const optionChest = [];
  listChest.map((c) => optionChest.push({ value: c.id, label: c.name }));

  const fetchCategory = () => {
    RandomAddPointAPI.fetchAllCategory()
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((err) => {
        message.error("Lỗi: " + err.message);
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    RandomAddPointAPI.getAllChest().then((response) => {
      dispatch(SetChest(response.data.data));
    });
  }, [dispatch]);

  const handleChangeCategory = (value) => {
    setDataRandomPoint({
      ...dataRandomPoint,
      listCategoryPoint: value,
    });
  };

  const handleFetchGiftByChest = (value) => {
    RandomAddPointAPI.getAllGiftByChest(value)
      .then((respone) => {
        setListGiftByChest(respone.data.data);
        const listItemIds = respone.data.data.map((item) => item.id);
        setDataRandomItem({
          ...dataRandomItem,
          chestId: value,
          listItem: listItemIds,
        });
      })
      .catch((err) => {
        message.error("Lỗi: " + err.message);
      });
  };

  const handleChangeChest = (e) => {
    const value = e === undefined ? "" : e;
    if (value !== "") {
      handleFetchGiftByChest(value);
      RandomAddPointAPI.getChestById(e)
        .then((respone) => {
          setChestDetail(respone.data.data);
        })
        .catch((err) => {
          message.error("Lỗi: " + err.message);
        });
    } else {
      setListGiftByChest([]);
      setDataRandomItem({
        ...dataRandomItem,
        chestId: value,
        listItem: [],
      });
    }
  };

  const handleDeleteChestGif = (chestId, giftId, selectedChest) => {
    RandomAddPointAPI.deleteChestGift(chestId, giftId)
      .then(() => {
        handleFetchGiftByChest(selectedChest);
        message.success("Xóa thành công.");
      })
      .catch(() => {
        message.error("Xóa thất bại.");
      });
  };

  const handleValidationRandomItem = () => {
    let check = 0;
    const errors = {
      chestId: "",
      listItem: "",
    };

    if (dataRandomItem.chestId === "") {
      errors.chestId = "Không được để trống loại rương";
    }

    if (dataRandomItem.listItem.length < 1) {
      errors.listItem = "Không được để trống số lượng vật phẩm";
    }

    for (const key in errors) {
      if (errors[key]) {
        check++;
      }
    }

    setErrorChestId(errors.chestId);
    return check;
  };

  const handleValidationRandomPoint = () => {
    let check = 0;
    const errors = {
      minPoint: "",
      maxPoint: "",
      listCategoryPoint: "",
    };

    if (dataRandomPoint.minPoint === null) {
      setDataRandomPoint({ ...dataRandomPoint, minPoint: 0 });
    }
    if (dataRandomPoint.minPoint < 1) {
      errors.minPoint = "Số mật tối thiếu phải > 0";
    } else if (dataRandomPoint.minPoint > 10000) {
      errors.minPoint = "Số mật tối thiếu phải < 10000";
    } else if (
      dataRandomPoint.minPoint > dataRandomPoint.maxPoint ||
      dataRandomPoint.minPoint === dataRandomPoint.maxPoint
    ) {
      errors.minPoint = "Số mật tối thiếu phải nhỏ hơn số mật tối đa";
    } else if (!Number.isInteger(dataRandomPoint.minPoint)) {
      errors.minPoint = "Số mật tối thiếu phải là số nguyên";
    }

    if (dataRandomPoint.maxPoint === null) {
      setDataRandomPoint({ ...dataRandomPoint, maxPoint: 0 });
    }
    if (dataRandomPoint.maxPoint < 1) {
      errors.maxPoint = "Số mật tối đa phải > 0";
    } else if (dataRandomPoint.maxPoint < dataRandomPoint.minPoint) {
      errors.maxPoint = "Số mật tối đa phải lớn hơn số mật tối thiểu";
    } else if (dataRandomPoint.maxPoint > 10000) {
      errors.maxPoint = "Số mật tối đa phải < 10000";
    } else if (!Number.isInteger(dataRandomPoint.maxPoint)) {
      errors.minPoint = "Số mật tối thiếu phải là số nguyên";
    }

    if (dataRandomPoint.listCategoryPoint.length < 1) {
      errors.listCategoryPoint = "Không được để trống thể loại";
    }

    for (const key in errors) {
      if (errors[key]) {
        check++;
      }
    }

    setErrorMinPoint(errors.minPoint);
    setErrorMaxPoint(errors.maxPoint);
    setErrorListCategory(errors.listCategoryPoint);

    return check;
  };

  const handleCreateRandomPoint = (dataRandomPoint) => {
    const check = handleValidationRandomPoint();

    if (check < 1) {
      RandomAddPointAPI.createRandomPoint(dataRandomPoint)
        .then(() => {
          message.success("Tạo ngẫu nhiên mật ong thành công");
          setDataRandomPoint(initialDataRandomPoint);
          setDataRandomItem(initialDataRandomItem);
          setDataPreview([]);
          setNameFile("");
          setSelectedCategories([]);
        })
        .catch(() => {
          message.error("Tạo ngẫu nhiên mật ong thất bại");
        });
    } else {
      message.error(
        "Tạo ngẫu nhiên mật ong thất bại, bạn cần nhập đủ các dữ liệu"
      );
    }
  };

  const handleCreateRandomItem = (dataRandomItem) => {
    const check = handleValidationRandomItem();

    if (check < 1) {
      RandomAddPointAPI.createRandomItem(dataRandomItem)
        .then(() => {
          message.success("Phát rương thành công");
          setDataRandomPoint(initialDataRandomPoint);
          setDataRandomItem(initialDataRandomItem);
          setDataPreview([]);
          setNameFile("");
          setSelectedChest("");
        })
        .catch(() => {
          message.error("Phát rương thất bại");
        });
    } else {
      message.error("Phát rương thất bại, bạn cần nhập đủ các dữ liệu");
    }
  };

  const handleSelectChest = (value) => {
    setSelectedChest(value);
    handleChangeChest(value);
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
    setDataPreview([]);
    setNameFile("");
    setSelectedChest(null);
    setDataRandomPoint(initialDataRandomPoint);
    setDataRandomItem(initialDataRandomItem);
  };

  const columsPreview = [
    {
      title: "Mã sinh viên",
      dataIndex: "userName",
      key: "username",
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

  const items = [
    {
      key: "1",
      label: "Tặng ngẫu nhiên mật ong",
      children: (
        <div>
          <Row
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: 25,
            }}
          >
            <Col gutter={15}>
              <span style={{ fontSize: "18px" }}>
                <b>Tặng ngẫu nhiên mật ong</b>
              </span>
            </Col>
            <Col gutter={8} className="-mr-4">
              <Space
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <Button
                  className="button-css"
                  htmlFor="file-input"
                  style={{
                    display: "inline-block",
                    padding: "10px",
                    zIndex: 2,
                  }}
                  onClick={() => setOpen(true)}
                >
                  <VerticalAlignBottomOutlined />
                  Import Excel
                </Button>
                {open && (
                  <ModalImportExcel
                    open={open}
                    setOpen={setOpen}
                    dataRandomPoint={dataRandomPoint}
                    dataRandomItem={dataRandomItem}
                    setListStudentPoint={setDataRandomPoint}
                    setListStudentItem={setDataRandomItem}
                    nameFile={nameFile}
                    setNameFile={setNameFile}
                    setDataPreview={setDataPreview}
                  />
                )}
                <Button
                  className="button-css"
                  disabled={dataPreview.totalError > 0 ? true : false}
                  onClick={() => handleCreateRandomPoint(dataRandomPoint)}
                >
                  <CheckCircleOutlined />
                  Xác nhận
                </Button>
              </Space>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={6}>
              <Card
                title="Loại mật ong"
                style={{ borderTop: "5px solid #1c315e" }}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                  placeholder="Chọn loại mật ong"
                  value={selectedCategories}
                  onChange={(value) => {
                    setSelectedCategories(value);
                    handleChangeCategory(value);
                  }}
                  options={optionCategory}
                />
                <span className="error">{errorListCategory}</span>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Khoảng mật ong"
                style={{ borderTop: "5px solid #1c315e" }}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Space
                      style={{
                        justifyContent: "space_between",
                        display: "flex",
                        float: "left",
                      }}
                    >
                      <span>Từ</span>
                      <div>
                        <Input
                          style={{ width: "100%" }}
                          type="number"
                          min={0}
                          value={
                            dataRandomPoint.minPoint !== null
                              ? dataRandomPoint.minPoint
                              : 0
                          }
                          onChange={(e) =>
                            setDataRandomPoint({
                              ...dataRandomPoint,
                              minPoint: Number(e.target.value),
                            })
                          }
                        />
                        <span className="error">{errorMinPoint}</span>
                      </div>
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space
                      style={{
                        justifyContent: "space_between",
                        display: "flex",
                        float: "left",
                      }}
                    >
                      <span>Đến</span>
                      <div>
                        <Input
                          type="number"
                          style={{ width: "100%" }}
                          min={0}
                          value={
                            dataRandomPoint.maxPoint !== null
                              ? dataRandomPoint.maxPoint
                              : 0
                          }
                          onChange={(e) =>
                            setDataRandomPoint({
                              ...dataRandomPoint,
                              maxPoint: Number(e.target.value),
                            })
                          }
                        />
                        <span className="error">{errorMaxPoint}</span>
                      </div>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          {activeTabKey === "1" &&
            dataPreview.lstAdminAddPointDTO &&
            dataPreview.lstAdminAddPointDTO.length > 0 && (
              <Card
                style={{ borderTop: "5px solid #1c315e", marginTop: "32px" }}
              >
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
                      {dataPreview && (
                        <b style={{ fontSize: "15px" }}>
                          <span style={{ color: "#FFCC00" }}>Tổng: </span>
                          {dataPreview.total} -
                          <span style={{ color: "green" }}> Thành công: </span>
                          {dataPreview.totalSuccess} -
                          <span style={{ color: "red" }}> Lỗi: </span>
                          {dataPreview.totalError}
                        </b>
                      )}
                    </span>
                  </div>
                </Space>
                <Table
                  dataSource={dataPreview.lstAdminAddPointDTO}
                  columns={columsPreview}
                  pagination={false}
                />
              </Card>
            )}
        </div>
      ),
    },
    {
      key: "2",
      label: "Tặng rương",
      children: (
        <div>
          <Space
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "18px" }}>
              <b>Tặng rương</b>
            </span>
            <Space
              style={{
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <Button
                className="button-css"
                htmlFor="file-input"
                style={{
                  display: "inline-block",
                  padding: "10px",
                  zIndex: 2,
                }}
                onClick={() => setOpen(true)}
              >
                <VerticalAlignBottomOutlined />
                Import Excel
              </Button>
              {open && (
                <ModalImportExcel
                  open={open}
                  setOpen={setOpen}
                  dataRandomPoint={dataRandomPoint}
                  dataRandomItem={dataRandomItem}
                  setListStudentPoint={setDataRandomPoint}
                  setListStudentItem={setDataRandomItem}
                  nameFile={nameFile}
                  setNameFile={setNameFile}
                  setDataPreview={setDataPreview}
                />
              )}
              <Button
                className="button-css"
                disabled={dataPreview.totalError > 0 ? true : false}
                onClick={() => handleCreateRandomItem(dataRandomItem)}
              >
                <CheckCircleOutlined />
                Xác nhận
              </Button>
            </Space>
          </Space>
          <Row gutter={16}>
            <Card
              title={
                <Space
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <div>Loại rương</div>
                  <div>
                    <Tooltip title="Thêm rương">
                      <Button
                        onClick={() => {
                          setChestDetail(null);
                          setShowModal(true);
                        }}
                      >
                        <PlusCircleOutlined style={{ fontSize: "15px" }} />
                      </Button>
                    </Tooltip>
                  </div>
                </Space>
              }
              style={{ width: "300px", borderTop: "5px solid #1c315e" }}
            >
              <Select
                placeholder="Chọn loại rương"
                style={{
                  width: "100%",
                  height: "40px",
                }}
                value={selectedChest}
                options={optionChest}
                onChange={(value) => handleSelectChest(value)}
                allowClear
              />
              <span className="error">{errorChestId}</span>
            </Card>
          </Row>
          {activeTabKey === "2" &&
            dataPreview.lstAdminAddPointDTO &&
            dataPreview.lstAdminAddPointDTO.length > 0 && (
              <Card
                style={{ borderTop: "5px solid #1c315e", marginTop: "32px" }}
              >
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
                      {dataPreview && (
                        <b style={{ fontSize: "15px" }}>
                          <span style={{ color: "#FFCC00" }}>Tổng: </span>
                          {dataPreview.total} -
                          <span style={{ color: "green" }}> Thành công: </span>
                          {dataPreview.totalSuccess} -
                          <span style={{ color: "red" }}> Lỗi: </span>
                          {dataPreview.totalError}
                        </b>
                      )}
                    </span>
                  </div>
                </Space>
                <Table
                  dataSource={dataPreview.lstAdminAddPointDTO}
                  columns={columsPreview}
                  pagination={false}
                />
              </Card>
            )}
        </div>
      ),
    },
  ];

  const colums = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    { title: "Tên vật phẩm", dataIndex: "name", key: "name" },
    {
      title: () => <div>Hành dộng</div>,
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="Xóa rương"
            description="Bạn có chắc chắn muốn xóa?"
            onConfirm={() =>
              handleDeleteChestGif(chestDetail.id, record.id, selectedChest)
            }
            // color="cyan"
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Xóa vật phẩm">
              <Button className="detail-button">
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {showModal && (
        <ModalAddChest
          modalOpen={showModal}
          setModalOpen={setShowModal}
          chest={chestDetail}
          setChest={setChestDetail}
        />
      )}
      <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
        <Tabs
          items={items}
          defaultActiveKey="1"
          activeKey={activeTabKey}
          onChange={handleTabChange}
        />
      </Card>
      {activeTabKey === "2" && dataRandomItem.chestId !== "" && (
        <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
          <Space
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "18px" }}>
              <b>Danh sách vật phẩm</b>
            </span>
            <Space
              style={{
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <ModalAddChestGift
                handleFetchGiftByChest={handleFetchGiftByChest}
                selectedChest={selectedChest}
                chest={chestDetail}
                icon={<PlusCircleOutlined />}
              />
            </Space>
          </Space>
          <Table rowKey="id" columns={colums} dataSource={listGiftByChest} />
        </Card>
      )}
    </div>
  );
}
