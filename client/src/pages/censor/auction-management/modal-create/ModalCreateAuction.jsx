import {
  Form,
  Input,
  Modal,
  Radio,
  message,
  Button,
  Row,
  Col,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { AuctionAPI } from "../../../../apis/censor/auction/auction.api";
import { AddAuction } from "../../../../app/reducers/auction/auction.reducer";
import moment from "moment/moment";
import {
  GetCategory,
  SetCategory,
} from "../../../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

const ModalCreateAuction = ({ visible, onCancel, fetchAllData }) => {
  const [name, setName] = useState("");
  const [errorNameAuction, setErrorNameAuction] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [errorFromDate, setErrorFromDate] = useState("");

  const [toDate, setToDate] = useState("");
  const [errorToDate, setErrorToDate] = useState("");

  const [honey, setHoney] = useState("");
  const [errorHoney, setErrorHoney] = useState("");

  const [startingPrice, setStartingPrice] = useState("");
  const [errorStartingPrice, setErrorStartingPrice] = useState("");

  const [jump, setJump] = useState("");
  const [errorJump, setErrorJump] = useState("");

  const [status, setStatus] = useState("");

  const [honeyCategoryId, setHoneyCategoryId] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (visible === true) {
      if (listCategory.length > 0) {
        setHoneyCategoryId(listCategory[0].id);
      }
      return () => {
        setName("");
        setFromDate("");
        setToDate("");
        setHoney("");
        setStartingPrice("");
        setJump("");
        setStatus("1");
        setHoneyCategoryId("");
        setErrorNameAuction("");
        setErrorFromDate("");
        setErrorToDate("");
        setErrorStartingPrice("");
        setErrorJump("");
        setErrorHoney("");
      };
    }
  }, [visible]);

  useEffect(() => {
    featAllCategory();
  }, []);

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
    let regex_so = /^[1-9][0-9]*$/;

    // validate honey
    if (honey.trim().length === 0) {
      setErrorHoney("Mật ong không được để trống");
      check++;
    } else {
      if (!regex_so.test(honey)) {
        setErrorHoney("Mật ong phải là số nguyên dương");
        check++;
      } else {
        setErrorHoney("");
      }
    }

    // validate name
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

    // validate jump
    if (jump.toString().trim().length === 0) {
      setErrorJump("Bước nhảy không được để trống");
      check++;
    } else {
      if (!regex_so.test(jump)) {
        setErrorJump("Bước nhảy phải là số nguyên dương");
        check++;
      } else {
        setErrorHoney("");
      }
    }

    // validate starting price
    if (startingPrice.toString().trim().length === 0) {
      setErrorStartingPrice("Giá tiền ban đầu không được để trống");
      check++;
    } else {
      if (!regex_so.test(startingPrice)) {
        setErrorStartingPrice("Giá tiền ban đầu phải là số nguyên dương");
        check++;
      } else {
        setErrorHoney("");
      }
    }

    // validate ngày
    if (fromDate === "") {
      setErrorFromDate("Thời gian bắt đầu không được để trống");
      check++;
    } else {
      setErrorFromDate("");
    }
    if (toDate === "") {
      setErrorToDate("Thời gian kết thúc không được để trống");
      check++;
    } else {
      setErrorToDate("");
    }
    if (new Date(fromDate) >= new Date(toDate)) {
      setErrorFromDate(
        "Thời gian bắt đầu không được lớn hơn thời gian kết thúc"
      );
      check++;
    } else {
      if (fromDate === "") {
        setErrorFromDate("Thời gian bắt đầu không được để trống");
        check++;
      } else {
        setErrorFromDate("");
      }
    }
    if (check === 0) {
      let obj = {
        name: name,
        fromDate: moment(fromDate, "YYYY-MM-DD").valueOf(),
        toDate: moment(toDate, "YYYY-MM-DD").valueOf(),
        startingPrice: startingPrice,
        jump: jump,
        status: status,
        honey: honey,
        honeyCategoryId: honeyCategoryId,
      };

      console.log(obj);
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
          message.error(error.response.data.message);
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
          <span style={{ fontSize: "18px" }}>Thêm mới phiên đấu giá</span>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Tên phiên đấu giá:</span> <br />
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
              <span>Thể loại:</span> <br />
              <Select
                style={{ width: "100%" }}
                value={honeyCategoryId}
                onChange={(value) => {
                  setHoneyCategoryId(value);
                }}
                size="large"
                placeholder="Thể loại"
                options={[
                  ...listCategory.map((category) => {
                    return {
                      value: category.id,
                      label: category.name,
                    };
                  }),
                ]}
              />
              <span className="error">{}</span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Thời gian bắt đầu:</span> <br />
              <Input
                value={moment(fromDate).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
                type="date"
              />
              <span className="error">{errorFromDate}</span>
            </Col>
            <Col span={12}>
              <span>Thời gian kết thúc:</span> <br />
              <Input
                value={moment(toDate).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
                type="date"
              />
              <span className="error">{errorToDate}</span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Giá tiền ban đầu:</span> <br />
              <Input
                value={startingPrice}
                onChange={(e) => {
                  setStartingPrice(e.target.value);
                }}
                type="text"
              />
              <span className="error">{errorStartingPrice}</span>
            </Col>
            <Col span={12}>
              <span>Bước nhảy:</span> <br />
              <Input
                value={jump}
                onChange={(e) => {
                  setJump(e.target.value);
                }}
                type="text"
              />
              <span className="error">{errorJump}</span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Mật ong:</span> <br />
              <Input
                value={honey}
                onChange={(e) => {
                  setHoney(e.target.value);
                }}
                type="text"
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
              >
                <Radio value={"1"}>Mở</Radio>
                <Radio value={"0"}>Đóng</Radio>
              </Radio.Group>
              <span className="error">{}</span>
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
