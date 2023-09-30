import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tabs,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  DropboxOutlined,
  SearchOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";
import "./index.css";

export default function RandomAddPoint() {
  const [student, setStudent] = useState([]);
  const [category, setCategory] = useState([]);
  const [typeGift, setTypeGift] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [listGiftByType, setListGiftByType] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [errorMinPoint, setErrorMinPoint] = useState("");
  const [errorMaxPoint, setErrorMaxPoint] = useState("");
  const [errorNumberStudent, setErrorNumberStudent] = useState("");
  const [errorListCategory, setErrorListCategory] = useState("");
  const [errorNumberItem, setErrorNumberItem] = useState("");
  const [errorNumberChest, setErrorNumberChest] = useState("");
  const [errorListType, setErrorListType] = useState("");
  const [errorListStudent, setErrorListStudent] = useState("");
  const [dataRandomPoint, setDataRandomPoint] = useState({
    minPoint: null,
    maxPoint: null,
    numberStudent: null,
    listCategoryPoint: [],
    listStudent: [],
  });
  const [dataRandomItem, setDataRandomItem] = useState({
    numberChest: null,
    listItem: [],
    type: null,
    listStudent: [],
  });
  const [filter, setFilter] = useState({
    emailSearch: "",
  });
  const optionCategory = [];
  category.map((c) =>
    optionCategory.push({
      value: c.id,
      label: c.name,
    })
  );
  const optionTypeGift = [];
  typeGift.map((t) =>
    optionTypeGift.push({
      value: t,
      label: t === 0 ? "Quà tặng" : t === 1 ? "Vật phẩm" : "Bộ dụng cụ",
    })
  );
  const optionGiftByType = [];
  listGiftByType.map((g) =>
    optionGiftByType.push({
      value: g.id,
      label: g.name,
    })
  );

  useEffect(() => {
    fetchCategory();
    fetchStudent(filter);
    fetchTypeGift();
    console.log(listGiftByType);
    console.log(dataRandomItem);
  }, [filter, dataRandomItem, listGiftByType]);

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

  const fetchStudent = (filter) => {
    setLoading(true);
    RandomAddPointAPI.fetchAllStudent(filter)
      .then((response) => {
        setStudent(response.data.data);
      })
      .catch(() => {
        message.error("Vui lòng f5 tải lại trang");
      });
    setLoading(false);
  };

  const fetchTypeGift = () => {
    setLoading(true);
    RandomAddPointAPI.fetchAllTypeGift()
      .then((response) => {
        setTypeGift(response.data.data);
      })
      .catch(() => {
        message.error("Vui lòng f5 tải lại trang");
      });
    setLoading(false);
  };

  const handleChangeCategory = (value) => {
    setDataRandomPoint({ ...dataRandomPoint, listCategoryPoint: value });
  };

  const handleChangeType = (value) => {
    setDataRandomItem({ ...dataRandomItem, type: value });
    setLoading(true);
    RandomAddPointAPI.getGiftByType(value)
      .then((response) => {
        setListGiftByType(response.data.data);
      })
      .catch(() => {
        message.error("Vui lòng f5 tải lại trang");
      });
    setLoading(false);
  };

  const handleStudentSelection = (studentId, checked) => {
    if (checked) {
      setDataRandomPoint((prevData) => ({
        ...prevData,
        listStudent: [...prevData.listStudent, studentId],
      }));
      setDataRandomItem((prevData) => ({
        ...prevData,
        listStudent: [...prevData.listStudent, studentId],
      }));
    } else {
      setDataRandomPoint((prevData) => ({
        ...prevData,
        listStudent: prevData.listStudent.filter((id) => id !== studentId),
      }));
      setDataRandomItem((prevData) => ({
        ...prevData,
        listStudent: prevData.listStudent.filter((id) => id !== studentId),
      }));
    }
  };

  const handleValidationRandomPoint = () => {
    let check = 0;
    const errors = {
      minPoint: "",
      maxPoint: "",
      numberStudent: "",
      listCategoryPoint: "",
      listStudent: "",
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

    if (dataRandomPoint.numberStudent === null) {
      errors.numberStudent = "Không được để trống số lượng";
    } else if (dataRandomPoint.numberStudent < 1) {
      errors.numberStudent = "Số lượng phải > 0";
    }

    if (dataRandomPoint.listCategoryPoint.length < 1) {
      errors.listCategoryPoint = "Không được để trống thể loại";
    }

    if (dataRandomPoint.listStudent.length < 1) {
      errors.listStudent = "Số lượng sinh viên phải >0";
    }

    for (const key in errors) {
      if (errors[key]) {
        check++;
      }
    }

    setErrorMinPoint(errors.minPoint);
    setErrorMaxPoint(errors.maxPoint);
    setErrorNumberStudent(errors.numberStudent);
    setErrorListCategory(errors.listCategoryPoint);
    setErrorListStudent(errors.listStudent);

    return check;
  };

  const handleValidationRandomItem = () => {
    let check = 0;
    const errors = {
      numberItem: "",
      numberChest: "",
      type: "",
      listStudent: "",
    };

    if (dataRandomItem.listItem.length < 1) {
      errors.numberItem = "Không được để trống số lượng vật phẩm";
    }

    if (dataRandomItem.numberChest === null) {
      errors.numberChest = "Không được để trống số lượng rương";
    } else if (dataRandomItem.numberChest < 0) {
      errors.numberChest = "Số lượng rương phải > -1";
    }

    if (dataRandomItem.type === null) {
      errors.type = "Không được để trống thể loại";
    }

    if (dataRandomItem.listStudent.length < 1) {
      errors.listStudent = "Số lượng sinh viên phải >0";
    }

    for (const key in errors) {
      if (errors[key]) {
        check++;
      }
    }

    setErrorNumberItem(errors.numberItem);
    setErrorNumberChest(errors.numberChest);
    setErrorListType(errors.type);
    setErrorListStudent(errors.listStudent);

    return check;
  };

  const handleCreateRandomPoint = (dataRandomPoint) => {
    const check = handleValidationRandomPoint();

    if (check < 1) {
      setLoading(true);
      RandomAddPointAPI.createRandomPoint(dataRandomPoint)
        .then(() => {
          message.success("Tạo random point thành công");
        })
        .catch(() => {
          message.error("Tạo random point thất bại");
        });
      setLoading(false);
    } else {
      message.error(
        "Tạo random mật ong thất bại, bạn cần nhập đủ các dữ liệu và chọn sinh viên"
      );
    }
  };

  const handleCreateRandomItem = (dataRandomItem) => {
    const check = handleValidationRandomItem();

    if (check < 1) {
      setLoading(true);
      RandomAddPointAPI.createRandomItem(dataRandomItem)
        .then(() => {
          message.success("Tạo random Item thành công");
        })
        .catch(() => {
          message.error("Tạo random Item thất bại");
        });
      setLoading(false);
    } else {
      message.error(
        "Tạo random vật phẩm thất bại, bạn cần nhập đủ các dữ liệu và chọn sinh viên"
      );
    }
  };

  const handleExportExcel = () => {
    setLoading(true);
    RandomAddPointAPI.createExportExcel()
      .then(() => {
        message.success("Export excel thành công");
      })
      .catch((err) => {
        message.error("Export excel thất bại");
      });
    setLoading(false);
  };

  const handleFileInputChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(formData);
    setLoading(true);
    RandomAddPointAPI.createImportExcel(formData)
      .then(() => {
        message.success("Import excel thành công");
      })
      .catch(() => {
        message.error("Import excel thất bại");
      });
    setLoading(false);
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={
            selectedStudents.length === student.length && student.length > 0
          }
          indeterminate={
            selectedStudents.length > 0 &&
            selectedStudents.length < student.length
          }
          onChange={(e) => {
            const checked = e.target.checked;
            setSelectAll(checked);
            if (checked) {
              setSelectedStudents(student.map((student) => student.id));
              setDataRandomPoint((prevData) => ({
                ...prevData,
                listStudent: student.map((student) => student.id),
              }));
              setDataRandomItem((prevData) => ({
                ...prevData,
                listStudent: student.map((student) => student.id),
              }));
            } else {
              setSelectedStudents([]);
              setDataRandomPoint((prevData) => ({
                ...prevData,
                listStudent: [],
              }));
              setDataRandomItem((prevData) => ({
                ...prevData,
                listStudent: [],
              }));
            }
          }}
        />
      ),
      dataIndex: "selection",
      render: (text, record) => (
        <Checkbox
          checked={selectedStudents.includes(record.id)}
          onChange={(e) => {
            const studentId = record.id;
            const checked = e.target.checked;
            handleStudentSelection(studentId, checked);
            const newSelectedStudents = checked
              ? [...selectedStudents, studentId]
              : selectedStudents.filter((id) => id !== studentId);
            setSelectedStudents(newSelectedStudents);
          }}
        />
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
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
            <Button
              className="button-css"
              onClick={() => handleCreateRandomPoint(dataRandomPoint)}
            >
              <CheckCircleOutlined />
              Xác nhận
            </Button>
          </Space>
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Loại mật ong">
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                  placeholder="Chọn loại mật ong"
                  defaultValue={[]}
                  onChange={handleChangeCategory}
                  options={optionCategory}
                />
                <span className="error">{errorListCategory}</span>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Số lượng">
                <Input
                  style={{ width: "100%" }}
                  type="number"
                  min={0}
                  defaultValue={dataRandomPoint.numberStudent}
                  onChange={(e) =>
                    setDataRandomPoint({
                      ...dataRandomPoint,
                      numberStudent: Number(e.target.value),
                    })
                  }
                />
                <span className="error">{errorNumberStudent}</span>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Khoảng mật ong">
                <Space
                  style={{
                    justifyContent: "space_between",
                    display: "flex",
                  }}
                >
                  <span>Từ</span>
                  <div>
                    <Input
                      style={{ width: "100%" }}
                      type="number"
                      min={0}
                      defaultValue={dataRandomPoint.minPoint}
                      onChange={(e) =>
                        setDataRandomPoint({
                          ...dataRandomPoint,
                          minPoint: Number(e.target.value),
                        })
                      }
                    />
                    <span className="error">{errorMinPoint}</span>
                  </div>
                  <span>Đến</span>
                  <div>
                    <Input
                      type="number"
                      style={{ width: "100%" }}
                      min={0}
                      defaultValue={dataRandomPoint.maxPoint}
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
            <Button
              className="button-css"
              onClick={() => handleCreateRandomItem(dataRandomItem)}
            >
              <CheckCircleOutlined />
              Xác nhận
            </Button>
          </Space>
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Loại vật phẩm">
                <Select
                  placeholder="Chọn loại vật phẩm"
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                  onChange={(e) => handleChangeType(e)}
                  options={optionTypeGift}
                />
                <span className="error">{errorListType}</span>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Số lượng vật phẩm">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Chọn vật phẩm"
                  style={{
                    width: "100%",
                    height: "40px",
                  }}
                  defaultValue={[]}
                  onChange={(e) =>
                    setDataRandomItem({ ...dataRandomItem, listItem: e })
                  }
                  options={optionGiftByType}
                />
                <span className="error">{errorNumberItem}</span>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Số lượng rương">
                <Input
                  style={{ width: "100%" }}
                  type="number"
                  min={0}
                  defaultValue={dataRandomItem.numberChest}
                  onChange={(e) =>
                    setDataRandomItem({
                      ...dataRandomItem,
                      numberChest: Number(e.target.value),
                    })
                  }
                />{" "}
                <span className="error">{errorNumberChest}</span>
              </Card>
            </Col>
            <Col span={6}></Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Spin spinning={loading}>
        <Card style={{ borderTop: "5px solid #FFCC00" }}>
          <Space
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <Space style={{ float: "left" }}>
              <Input
                style={{ width: "300px" }}
                placeholder="tìm sinh viên theo mã"
                value={search}
                prefix={<SearchOutlined />}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                className="button-css"
                icon={<SearchOutlined />}
                onClick={() => setFilter({ ...filter, emailSearch: search })}
              >
                Tìm kiếm
              </Button>
            </Space>
            <Space style={{ float: "right" }}>
              <Button className="button-css" onClick={() => setOpen(!open)}>
                <DropboxOutlined />
                {open === true ? "Đóng random" : "Mở random"}
              </Button>
            </Space>
          </Space>
        </Card>
        {open && (
          <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
            <Tabs items={items} defaultActiveKey="1" />
          </Card>
        )}
        <Card style={{ marginTop: "16px", borderTop: "5px solid #FFCC00" }}>
          <Space
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontSize: "18px" }}>
              <b>Danh sách sinh viên</b>
            </span>
            <Space style={{ float: "right" }}>
              <Button
                className="button-css"
                htmlFor="file-input"
                style={{
                  display: "inline-block",
                  padding: "10px",
                  zIndex: 2,
                }}
              >
                <VerticalAlignBottomOutlined />
                Import Excel
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => handleFileInputChange(e)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    cursor: "pointer",
                    opacity: 0,
                    zIndex: 1,
                  }}
                />
              </Button>
              <Button
                className="button-css"
                onClick={() => handleExportExcel()}
              >
                <VerticalAlignTopOutlined />
                Export Excel
              </Button>
            </Space>
          </Space>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={student.filter(
              (item) =>
                item !== null && typeof item === "object" && "id" in item
            )}
          />
        </Card>
      </Spin>
    </div>
  );
}
