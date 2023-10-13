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
  Spin,
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
import ModalUpLoadFile from "./ModalUploadFile";
import ModalConfirm from "./ModalConfirm";

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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dataPreview, setDataPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detailChest, setDetailChest] = useState();
  const [nameFile, setNameFile] = useState("");
  const [nameFileUpload, setNameFileUpload] = useState("");
  const [chest, setChest] = useState({ id: "", name: "", percent: "" });
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
    setLoading(true);
    RandomAddPointAPI.fetchAllCategory()
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((err) => {
        message.error("Lỗi: " + err.message);
      });
    setLoading(false);
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

  const handleChangeChest = (e) => {
    const value = e === undefined ? "" : e;
    setLoading(true);
    if (value !== "") {
      setDataRandomItem({
        ...dataRandomItem,
        chestId: value,
      });
      RandomAddPointAPI.getAllGiftByChest(e)
        .then((respone) => {
          setListGiftByChest(respone.data.data);
        })
        .catch((err) => {
          message.error("Lỗi: " + err.message);
        });
      RandomAddPointAPI.getChestById(e)
        .then((respone) => {
          setChest(respone.data.data);
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
    setLoading(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setDataRandomItem((prevState) => ({
      ...prevState,
      listItem: newSelectedRowKeys,
    }));
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const handleDeleteChestGif = (chestId, giftId) => {
    setLoading(true);
    RandomAddPointAPI.deleteChestGift(chestId, giftId)
      .then(() => {
        message.success("Xóa thành công.");
      })
      .catch(() => {
        message.error("Xóa thất bại.");
      });
    setLoading(false);
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
      // numberStudent: "",
      listCategoryPoint: "",
    };

    if (dataRandomPoint.maxPoint === null) {
      errors.maxPoint = "Không được để trống số mật tối đa";
    } else if (dataRandomPoint.maxPoint < 0) {
      errors.maxPoint = "Số mật tối đa phải > -1";
    } else if (dataRandomPoint.maxPoint < dataRandomPoint.minPoint) {
      errors.maxPoint = "Số mật tối đa phải lớn hơn số mật tối thiểu";
    }

    if (dataRandomPoint.minPoint === null) {
      errors.minPoint = "Không được để trống số mật tối thiếu";
    } else if (dataRandomPoint.minPoint < 0) {
      errors.minPoint = "Số mật tối thiếu phải > -1";
    } else if (dataRandomPoint.minPoint > dataRandomPoint.maxPoint) {
      errors.minPoint = "Số mật tối thiếu phải nhỏ hơn số mật tối đa";
    }

    // if (dataRandomPoint.numberStudent === null) {
    //   errors.numberStudent = "Không được để trống số lượng";
    // } else if (dataRandomPoint.numberStudent < 1) {
    //   errors.numberStudent = "Số lượng phải > 0";
    // }

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
    // setErrorNumberStudent(errors.numberStudent);
    setErrorListCategory(errors.listCategoryPoint);

    return check;
  };

  const handleCreateRandomPoint = (dataRandomPoint) => {
    const check = handleValidationRandomPoint();

    if (check < 1) {
      setLoading(true);
      RandomAddPointAPI.createRandomPoint(dataRandomPoint)
        .then(() => {
          message.success("Tạo ngẫu nhiên mật ong thành công");
          setDataRandomPoint(initialDataRandomPoint);
          setDataRandomItem(initialDataRandomItem);
          setNameFile("");
          setSelectedCategories([]);
        })
        .catch(() => {
          message.error("Tạo ngẫu nhiên mật ong thất bại");
        });
      setLoading(false);
    } else {
      message.error(
        "Tạo ngẫu nhiên mật ong thất bại, bạn cần nhập đủ các dữ liệu"
      );
    }
  };

  const handleCreateRandomItem = (dataRandomItem) => {
    const check = handleValidationRandomItem();

    if (check < 1) {
      setLoading(true);
      RandomAddPointAPI.createRandomItem(dataRandomItem)
        .then(() => {
          message.success("Tạo ngẫu nhiên vật phẩm thành công");
          setDataRandomPoint(initialDataRandomPoint);
          setDataRandomItem(initialDataRandomItem);
          setNameFile("");
          setSelectedChest("");
        })
        .catch(() => {
          message.error("Tạo ngẫu nhiên vật phẩm thất bại");
        });
      setLoading(false);
    } else {
      message.error(
        "Tạo ngẫu nhiên vật phẩm thất bại, bạn cần nhập đủ các dữ liệu"
      );
    }
  };

  const handleTabChange = (key) => {
    setActiveTabKey(key);
  };

  const handleClostPreview = () => {
    setDataPreview([]);
    setNameFileUpload("");
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
      title: "Vật phẩm",
      dataIndex: "lstGift",
      key: "lstGift",
      render: (_, record) => {
        return record.lstGift === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.lstGift}</span>
        );
      },
    },
    {
      title: "Mật ong",
      dataIndex: "lstHoney",
      key: "lstHoney",
      render: (_, record) => {
        return record.lstHoney === null ? (
          <span style={{ color: "orange" }}>không có dữ liệu</span>
        ) : (
          <span>{record.lstHoney}</span>
        );
      },
    },
    {
      title: "trạng thái",
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
      label: "Ngãu nhiên mật ong",
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
              <b>Tặng ngẫu nhiên mật ong</b>
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
                  setLoading={setLoading}
                  dataRandomPoint={dataRandomPoint}
                  dataRandomItem={dataRandomItem}
                  setListStudentPoint={setDataRandomPoint}
                  setListStudentItem={setDataRandomItem}
                  nameFile={nameFile}
                  setNameFile={setNameFile}
                />
              )}
              <Button
                className="button-css"
                onClick={() => handleCreateRandomPoint(dataRandomPoint)}
              >
                <CheckCircleOutlined />
                Xác nhận
              </Button>
            </Space>
          </Space>
          <Row gutter={16}>
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
            <Col span={10}>
              <Card
                title="Khoảng mật ong"
                style={{ borderTop: "5px solid #1c315e" }}
              >
                <Space
                  style={{
                    justifyContent: "space_between",
                    display: "flex",
                  }}
                >
                  <span>Từ</span>
                  <Space
                    style={{
                      justifyContent: "space_between",
                      display: "flex",
                      float: "left",
                    }}
                  >
                    <div>
                      <Input
                        style={{ width: "100%" }}
                        type="number"
                        min={0}
                        value={
                          dataRandomPoint.minPoint !== null
                            ? dataRandomPoint.minPoint
                            : ""
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
                  <span>Đến</span>
                  <Space
                    style={{
                      justifyContent: "space_between",
                      display: "flex",
                      float: "left",
                    }}
                  >
                    <div>
                      <Input
                        type="number"
                        style={{ width: "100%" }}
                        min={0}
                        value={
                          dataRandomPoint.maxPoint !== null
                            ? dataRandomPoint.maxPoint
                            : ""
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
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "2",
      label: "Ngẫu nhiên vật phẩm",
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
              <b>Tặng ngẫu vật phẩm</b>
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
                  setLoading={setLoading}
                  dataRandomPoint={dataRandomPoint}
                  dataRandomItem={dataRandomItem}
                  setListStudentPoint={setDataRandomPoint}
                  setListStudentItem={setDataRandomItem}
                  nameFile={nameFile}
                  setNameFile={setNameFile}
                />
              )}
              <Button
                className="button-css"
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
                          setDetailChest(null);
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
                onChange={(value) => {
                  setSelectedChest(value);
                  handleChangeChest(value);
                }}
                allowClear
              />
              <span className="error">{errorChestId}</span>
            </Card>
          </Row>
        </div>
      ),
    },
    {
      key: "3",
      label: "Phát vật phẩm",
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
              <b>Phát vật phẩm</b>
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
                onClick={() => setOpenUpload(true)}
              >
                <VerticalAlignBottomOutlined />
                Upload File
              </Button>
              {openUpload && (
                <ModalUpLoadFile
                  openUpload={openUpload}
                  setOpenUpload={setOpenUpload}
                  setLoading={setLoading}
                  setDataPreview={setDataPreview}
                  nameFileUpload={nameFileUpload}
                  setNameFileUpload={setNameFileUpload}
                />
              )}
            </Space>
          </Space>
          {dataPreview.length > 0 && (
            <Card style={{ borderTop: "5px solid #FFCC00" }}>
              <Row style={{ marginBottom: "32px" }}>
                <b style={{ fontSize: "25px" }}>Dữ liệu import</b>
              </Row>
              <Table
                dataSource={dataPreview}
                columns={columsPreview}
                pagination={false}
              />
              <Space
                style={{
                  justifyContent: "right",
                  display: "flex",
                  marginTop: "32px",
                }}
              >
                <Button
                  className="button-css"
                  onClick={() => handleClostPreview()}
                >
                  CLOSE
                </Button>

                <Button
                  className="button-css"
                  onClick={() => setOpenConfirm(true)}
                >
                  ADD
                </Button>
                {openConfirm && (
                  <ModalConfirm
                    dataPreview={dataPreview}
                    openConfirm={openConfirm}
                    setOpenConfirm={setOpenConfirm}
                    setDataPreview={setDataPreview}
                    setNameFileUpload={setNameFileUpload}
                  />
                )}
              </Space>
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
            onConfirm={() => handleDeleteChestGif(chest.id, record.id)}
            color="cyan"
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
          chest={detailChest}
          SetChest={setDetailChest}
        />
      )}
      <Spin spinning={loading}>
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
                  chest={chest}
                  icon={<PlusCircleOutlined />}
                />
              </Space>
            </Space>
            {/* {dataRandomItem.chestId !== "" && ( */}
            <Table
              rowSelection={rowSelection}
              rowKey="id"
              columns={colums}
              dataSource={listGiftByChest}
            />
            {/* )} */}
          </Card>
        )}
      </Spin>
    </div>
  );
}
