import { Input, Modal, Radio, message, Button, Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import { AddAuction } from "../../../../app/reducers/upgradeRate/upgradeRate.reducer";

import {
  GetCategory,
  SetCategory,
} from "../../../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { UpgradeApi } from "../../../apis/censor/upgradeRate/UpgradeRate.api";

const ModalCreateAuction = ({ visible, onCancel, fetchAllData }) => {
  const [name, setName] = useState("");
  const [errorNameAuction, setErrorNameAuction] = useState("");
  const [status, setStatus] = useState("");
  const [originalHoney, setOriginalHoney] = useState("");
  const [errorOriginalHoney, setErrorOriginalHoney] = useState("");
  const [destinationHoney, setDestinationHoney] = useState("");
  const [errorDestinationHoney, setErrorDestinationHoney] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  const [OriginalHoneyIdSL, setOriginalHoneyIdSL] = useState("");
  const [destinationHoneyIdSL, setDestinationHoneyIdSL] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (visible === true) {
      if (listCategory.length > 0) {
        setOriginalHoneyIdSL(listCategory[0].id);
        setDestinationHoneyIdSL(listCategory[0].id);
      }
      return () => {
        setStatus("");
        setDestinationHoney("");
        setOriginalHoney("");
        setErrorOriginalHoney("");
        setErrorDestinationHoney("");
        setErrorStatus("");
      };
    }
  }, [visible]);

  useEffect(() => {
    featAllCategory();
  }, []);

  const listCategory = useAppSelector(GetCategory);

  const featAllCategory = async () => {
    UpgradeApi.getALLCategory()
      .then((respone) => {
        dispatch(SetCategory(respone.data.data));
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const create = () => {
    let check = 0;

    if (originalHoney.toString().trim().length === 0) {
      setErrorOriginalHoney("Điểm đầu không được để trống");
      check++;
    } else {
      setErrorOriginalHoney("");
    }

    if (destinationHoney.toString().trim().length === 0) {
      setErrorDestinationHoney("Điểm cuối không được để trống");
      check++;
    } else {
      setErrorDestinationHoney("");
    }

    if (status.toString().trim().length === 0) {
      setErrorStatus("Trạng thái không được để trống");
      check++;
    } else {
      setErrorStatus("");
    }

    if (check === 0) {
      let obj = {
        originalHoneyId: originalHoney,
        destinationHoneyId: destinationHoney,
        status: status,
      };

      console.log(obj);
      const originalHoneyId = listCategory.find(
        (item) => item.id === originalHoney
      );
      const destinationHoneyId = listCategory.find(
        (item) => item.id === destinationHoney
      );
      UpgradeApi.create(obj).then(
        (response) => {
          console.log("🚀 ~ file: ModalCreateAuction.jsx:99 ~ create ~ response:", response)
          message.success("Thêm thành công!");
          let objCreate = {
            ...response.data.data,
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
          <span style={{ fontSize: "18px" }}>Thêm mới nâng hạng</span>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
          <Col span={12}>
              <span>Loại điểm đầu:</span> <br />
              <Select
                style={{ width: "100%" }}
                value={originalHoney}
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
              <span className="error">{errorOriginalHoney}</span>
            </Col>
            <Col span={12}>
              <span>Loại điểm cuối:</span> <br />
              <Select
                style={{ width: "100%" }}
                value={destinationHoney}
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
              <span className="error">{errorDestinationHoney}</span>
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Trạng thái:</span> <br />
              <Radio.Group
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <Radio value={"0"} >
                  Hoạt động
                </Radio>
                <Radio value={"1"} >
                  Không hoạt động
                </Radio>
              </Radio.Group>
              <br></br>
              <span className="error">{errorStatus}</span>
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
