import { Input, Modal, Radio, message, Button, Row, Col, Select } from "antd";
import { useEffect, useState } from "react";
import { AddUpgradeRate } from "../../../app/reducers/upgrade-rate/upgrade-rate.reducer";
import { UpgradeApi } from "../../../apis/censor/upgrade-rate/upgrade-rate.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const ModalCreateUpgradeRate = ({ visible, onCancel, fetchAllData }) => {
  const [status, setStatus] = useState("");
  const [originalHoney, setOriginalHoney] = useState("");
  const [errorOriginalHoney, setErrorOriginalHoney] = useState("");
  const [destinationHoney, setDestinationHoney] = useState("");
  const [errorDestinationHoney, setErrorDestinationHoney] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [ratio, setRatio] = useState("");
  const [errorRatio, setErrorRatio] = useState("");

  const [originalHoneyIdSL, setOriginalHoneyIdSL] = useState("");
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
        setRatio("");
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

    if (
      destinationHoney.toString().trim() === originalHoney.toString().trim()
    ) {
      setErrorOriginalHoney("Điểm cuối và điểm đầu không được trùng nhau");
      setErrorDestinationHoney("Điểm cuối và điểm đầu không được trùng nhau");
      check++;
    } else {
      setErrorOriginalHoney("");
      setErrorDestinationHoney("");
    }

    if (status.toString().trim().length === 0) {
      setErrorStatus("Trạng thái không được để trống");
      check++;
    } else {
      setErrorStatus("");
    }

    if (ratio.toString().trim().length === 0) {
      setErrorRatio("Tỉ lệ nâng cấp không được để trống");
      check++;
    } else {
      setErrorRatio("");
    }

    if (ratio.toString().trim() < 0 || ratio.toString().trim() > 100) {
      setErrorRatio("Tỉ lệ nâng cấp không được nhỏ hơn 0 và lớn hơn 100");
      check++;
    } else {
      setErrorRatio("");
    }

    if (check === 0) {
      let obj = {
        originalHoneyId: originalHoney,
        destinationHoneyId: destinationHoney,
        status: status,
        ratio: ratio,
      };

      const originalHoneyId = listCategory.find(
        (item) => item.id === originalHoneyIdSL
      );
      const destinationHoneyId = listCategory.find(
        (item) => item.id === destinationHoneyIdSL
      );
      UpgradeApi.create(obj).then(
        (response) => {
          message.success("Thêm thành công!");
          let objCreate = {
            ...response.data.data,
          };
          console.log(
            "🚀 ~ file: ModalCreateAuction.jsx:126 ~ create ~ objCreate:",
            objCreate
          );
          fetchAllData();
          dispatch(AddUpgradeRate(objCreate));
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
          <Row gutter={24} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Loại điểm đầu:</span> <br />
              <Select
                style={{ width: "100%" }}
                value={originalHoney}
                onChange={(value) => {
                  setOriginalHoney(value);
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
                  setDestinationHoney(value);
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
          <Row gutter={24} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <span>Tỉ lệ nâng cấp:</span>
              {""}
              <Input
                type="number"
                value={ratio}
                onChange={(e) => setRatio(e.target.value)}
              />
              <span className="error">{errorRatio}</span>
            </Col>
            <Col span={12}>
              <span>Trạng thái:</span> <br />
              <Radio.Group
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <Radio value={"0"}>Hoạt động</Radio>
                <Radio value={"1"}>Không hoạt động</Radio>
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
export default ModalCreateUpgradeRate;
