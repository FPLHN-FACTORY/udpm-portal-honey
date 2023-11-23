import { Input, Modal, Radio, message, Button, Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import { AuctionAPI } from "../../../../apis/censor/auction/auction.api";
import { UpdateAuction } from "../../../../app/reducers/auction/auction.reducer";
import { GetCategory } from "../../../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

const ModalUpdateAuction = ({ visible, onCancel, auction, fetchAllData }) => {
  const [name, setName] = useState("");
  const [errorNameAuction, setErrorNameAuction] = useState("");
  const [honey, setHoney] = useState("");
  const [errorHoney, setErrorHoney] = useState("");
  const [status, setStatus] = useState("");
  const [honeyCategoryId, setHoneyCategoryId] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auction !== null) {
      setName(auction.name);
      setHoney(auction.honey);
      setStatus(auction.status == "HOAT_DONG" ? "0" : "1");
      setHoneyCategoryId(auction.categoryId);
      return () => {
        setName("");
        setHoney("");
        setStatus("");
        setHoneyCategoryId("");
        setErrorStatus("");
      };
    }
  }, [auction]);

  const listCategory = useAppSelector(GetCategory);

  const update = () => {
    let check = 0;
    let regex_so = /^[1-9][0-9]*$/;

    // validate name
    if (name.trim().length === 0) {
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

    // validate honey
    if (honey.toString().trim().length === 0) {
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

    if (status.toString().trim().length === 0) {
      setErrorStatus("Trạng thái không được để trống");
      check++;
    } else {
      setErrorStatus("");
    }

    if (check === 0) {
      let obj = {
        id: auction.id,
        name: name,
        status: status,
        honey: honey,
        honeyCategoryId: honeyCategoryId,
      };

      const categoryNameItem = listCategory.find(
        (item) => item.id === honeyCategoryId
      );
      AuctionAPI.update(obj, auction.id).then(
        (response) => {
          message.success("Sửa thành công!");
          let objCreate = {
            ...response.data.data,
            categoryName: categoryNameItem.name,
            categoryId: categoryNameItem.id,
          };
          dispatch(UpdateAuction(objCreate));
          fetchAllData();
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
          <span style={{ fontSize: "18px" }}>Sửa phòng đấu giá</span>
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
              <span className="error">{errorNameAuction}</span>
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
              <span className="error">{errorStatus}</span>
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
                  // (e.target.value);
                }}
              >
                <Radio value={"0"}>Mở</Radio>
                <Radio value={"1"}>Đóng</Radio>
              </Radio.Group>
              <span className="error">{setErrorStatus}</span>
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
              onClick={update}
            >
              Sửa
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
export default ModalUpdateAuction;
