import {
  Input,
  Modal,
  Radio,
  message,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
} from "antd";
import { useEffect, useState } from "react";
import { AuctionAPI } from "../../../../apis/censor/auction/auction.api";
import { AddAuction } from "../../../../app/reducers/auction/auction.reducer";
import {
  GetCategory,
  SetCategory,
} from "../../../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { GiftAPI } from "../../../../apis/censor/gift/gift.api";
import dayjs from "dayjs";

const ModalCreateAuction = ({ visible, onCancel, fetchAllData }) => {
  const [name, setName] = useState("");
  const [errorNameAuction, setErrorNameAuction] = useState("");
  const [honey, setHoney] = useState(0);
  const [errorHoney, setErrorHoney] = useState("");
  const [errorItem, setErrorItem] = useState("");
  const [errorDates, setErrorDates] = useState("");
  const [status, setStatus] = useState(0);
  const [errorStatus, setErrorStatus] = useState("");
  const [honeyCategoryId, setHoneyCategoryId] = useState("");
  const [errorHoneyCategory, setErrorHoneyCategory] = useState("");
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState("");
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [errorQuantity, setErrorQuantity] = useState("");
  const dispatch = useAppDispatch();

  const fetchDataItem = () => {
    GiftAPI.fetchAllGift().then((response) => {
      setItems(response.data.data);
    });
  };

  useEffect(() => {
    fetchDataItem();
  }, []);

  useEffect(() => {
    if (visible === true) {
      return () => {
        setName("");
        setHoney(0);
        setStatus(0);
        setHoneyCategoryId("");
        setItemId("");
        setErrorNameAuction("");
        setErrorHoney("");
        setErrorStatus("");
        setErrorItem("");
        setQuantity(0);
        setErrorDates("");
        setErrorQuantity("");
        setErrorHoneyCategory("");
        setFromDate(null);
        setToDate(null);
      };
    }
  }, [visible]);

  useEffect(() => {
    featAllCategory();
  }, []);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const [fromDate, toDate] = dates;
      setFromDate(fromDate.valueOf());
      setToDate(toDate.valueOf());
    } else {
      setFromDate(null);
      setToDate(null);
    }
  };

  const listCategory = useAppSelector(GetCategory);

  const featAllCategory = async () => {
    AuctionAPI.getALLCategory()
      .then((respone) => {
        dispatch(SetCategory(respone.data.data));
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const create = () => {
    let check = 0;
    if (honey === 0 || honey > 1000000000) {
      setErrorHoney(
        "Số lượng mật ong phải là số nguyên dương lớn hơn 0 và nhỏ hơn bằng 1 tỷ"
      );
      check++;
    } else {
      setErrorHoney("");
    }
    if (honeyCategoryId === "") {
      setErrorHoneyCategory("Vui lòng chọn loại điểm");
      check++;
    } else {
      setErrorHoneyCategory("");
    }
    if (name.toString().trim().length === 0) {
      setErrorNameAuction("Tên phiên đấu giá không được để trống");
      check++;
    } else {
      if (name.trim().length > 100) {
        setErrorNameAuction("Tên phiên đấu giá không quá 100 ký tự");
        check++;
      } else {
        setErrorNameAuction("");
      }
    }
    if (itemId === "" || itemId === undefined || itemId === null) {
      setErrorItem("Vui lòng chọn vật phẩm đấu giá");
      check++;
    } else {
      setErrorItem("");
    }
    if (
      fromDate === undefined ||
      fromDate === null ||
      fromDate === "" ||
      toDate === undefined ||
      toDate === null ||
      toDate === ""
    ) {
      setErrorDates("Vui lòng chọn thời gian đấu giá");
      check++;
    } else {
      setErrorDates("");
    }
    if (status.toString().trim().length === 0) {
      setErrorStatus("Trạng thái không được để trống");
      check++;
    } else {
      setErrorStatus("");
    }
    if (quantity === 0 || quantity > 1000000000) {
      setErrorQuantity(
        "Số lượng vật phẩm đấu giá là số nguyên dương lớn hơn 0 và nhỏ hơn bằng 1 tỷ"
      );
      check++;
    } else {
      setErrorQuantity("");
    }
    if (check === 0) {
      let obj = {
        name: name,
        status: status,
        honey: honey,
        honeyCategoryId: honeyCategoryId,
        giftId: itemId,
        fromDate: fromDate,
        toDate: toDate,
        quantity: quantity,
      };

      const categoryNameItem = listCategory.find(
        (item) => item.id === honeyCategoryId
      );
      AuctionAPI.create(obj).then(
        (response) => {
          message.success("Thêm thành công!");
          let objCreate = {
            ...response.data.data,
            categoryName: categoryNameItem.name,
            categoryId: categoryNameItem.id,
          };
          fetchAllData();
          dispatch(AddAuction(objCreate));
          onCancel();
        },
        (error) => {
          // message.error(error.response.data.message);
        }
      );
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        width={750}
        footer={null}
        className="modal_show_detail"
      >
        {" "}
        <div style={{ paddingTop: "0", borderBottom: "1px solid black" }}>
          <span style={{ fontSize: "18px" }}>Thêm mới phòng đấu giá</span>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Tên phòng đấu giá:</span> <br />
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />
              <p className="error">{errorNameAuction}</p>
            </Col>
            <Col span={12}>
              <span>Loại điểm:</span> <br />
              <Select
                value={honeyCategoryId}
                onChange={(value) => {
                  setHoneyCategoryId(value);
                }}
                placeholder="Thể loại"
                style={{
                  width: "100%",
                  height: "40px",
                }}
                options={[
                  { value: "", label: "Chọn thể loại" },
                  ...listCategory.map((category) => {
                    return {
                      value: category.id,
                      label: category.name,
                    };
                  }),
                ]}
              />
              <span className="error">{errorHoneyCategory}</span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Mật ong:</span> <br />
              <Input
                value={honey}
                onChange={(e) => {
                  const newValue = Math.max(0, parseInt(e.target.value) || 0);
                  setHoney(newValue);
                }}
                type="number"
                min={0}
                step={1}
              />
              <span className="error">{errorHoney}</span>
            </Col>
            <Col span={12}>
              <span>Trạng thái:</span> <br />
              <Radio.Group
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                style={{ lineHeight: "50px" }}
              >
                <Radio value={0}>Mở</Radio>
                <Radio value={1}>Đóng</Radio>
              </Radio.Group>
              <br />
              <span className="error">{errorStatus}</span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Vật phẩm đấu giá:</span> <br />
              <Select
                value={itemId}
                onChange={(value) => {
                  setItemId(value);
                }}
                style={{ height: "40px", width: "100%" }}
              >
                <Option value="">Chọn vật phẩm</Option>
                {items.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
              <span className="error">{errorItem}</span>
            </Col>
            <Col span={12}>
              <span>Số lượng :</span> <br />
              <Input
                value={quantity}
                onChange={(e) => {
                  const newValue = Math.max(0, parseInt(e.target.value) || 0);
                  setQuantity(newValue);
                }}
                type="number"
                min={0}
                step={1}
              />{" "}
              <br />
              <span className="error">{errorQuantity}</span>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <span>Thời gian đấu giá:</span> <br />
              <RangePicker
                renderExtraFooter={() => "Chọn ngày"}
                onChange={handleDateChange}
                format={"DD/MM/YYYY"}
                placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
                style={{ height: "40px", width: "100%" }}
                value={[
                  fromDate ? dayjs(fromDate) : null,
                  toDate ? dayjs(toDate) : null,
                ]}
              />
              <br />
              <span className="error">{errorDates}</span>
            </Col>
          </Row>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ paddingTop: "15px" }}>
            <Button
              style={{
                marginRight: "5px",
                backgroundColor: "rgb(61, 139, 227)",
                color: "white",
              }}
              onClick={create}
            >
              Thêm
            </Button>
            <Button
              style={{
                backgroundColor: "red",
                color: "white",
              }}
              onClick={onCancel}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ModalCreateAuction;
