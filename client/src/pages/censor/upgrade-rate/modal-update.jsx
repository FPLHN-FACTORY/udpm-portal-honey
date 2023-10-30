import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, Button, Radio, message } from "antd";
import { UpdateUpgradeRate } from "../../../app/reducers/upgrade-rate/upgrade-rate.reducer";
import { UpgradeApi } from "../../../apis/censor/upgrade-rate/upgrade-rate.api";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import {
  GetGift,
  SetGift,
} from "../../../app/reducers/gift/gift.reducer";
const { Option } = Select;

const ModalUpdateUpgradeRate = ({
  visible,
  onCancel,
  currentItem,
  fetchAllData,
}) => {
  const animatedComponents = makeAnimated();
  const dispatch = useDispatch();
  const listCategory = useSelector(GetCategory);
  const listGift = useSelector(GetGift);

  const [form] = Form.useForm();
  const [originalHoneyId, setOriginalHoneyId] = useState("");
  const [destinationHoneyId, setDestinationHoneyId] = useState("");
  const [quantityOriginalHoney, setQuantityOriginalHoney] = useState("");
  const [quantityDestinationHoney, setQuantityDestinationHoney] = useState("");
  const [idGifts, setIdGifts] = useState([]);

  useEffect(() => {
    if (visible) {
      fetchAllCategory();
    }
  }, [visible]);

  useEffect(() => {
    featAllGift();
  }, [visible]);

  useEffect(() => {
    if (visible && currentItem) {
      console.log("🚀 ~ file: modal-update.jsx:47 ~ useEffect ~ currentItem:", currentItem)
      const originalHoney = listCategory.find(
        (category) => category.name === currentItem.originalHoneyName
      );
      const destinationHoney = listCategory.find(
        (category) => category.name === currentItem.destinationHoneyName
      );

      if (originalHoney) {
        setOriginalHoneyId(originalHoney.id);
      }
      if (destinationHoney) {
        setDestinationHoneyId(destinationHoney.id);
      }
      
      form.setFieldsValue({
        originalHoney: originalHoneyId,
        destinationHoney: destinationHoneyId,
        quantityOriginalHoney: quantityOriginalHoney,
        quantityDestinationHoney: quantityDestinationHoney,
        ratio: currentItem.ratio,
        status: currentItem.status,
        code: currentItem.code,
      });
    }
  }, [visible, currentItem, listCategory, form]);

  const fetchAllCategory = async () => {
    UpgradeApi.getALLCategory()
      .then((response) => {
        dispatch(SetCategory(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const featAllGift = async () => {
    UpgradeApi.getAllCensorExist()
      .then((response) => {
        dispatch(SetGift(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const update = () => {
    form.validateFields().then((values) => {
      const updatedData = {
        originalHoneyId: values.originalHoney,
        destinationHoneyId: values.destinationHoney,
        ratio: values.ratio,
        status: values.status,
        code: values.code,
      };

      UpgradeApi.update(updatedData, currentItem.id)
        .then((response) => {
          message.success("Cập nhật thành công!");
          const updatedItem = {
            id: currentItem.id,
            originalHoneyId: values.originalHoney,
            destinationHoneyId: values.destinationHoney,
            ratio: values.ratio,
            status: values.status,
            code: values.code,
          };
          dispatch(UpdateUpgradeRate(updatedItem));
          fetchAllData();
          onCancel();
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={750}
      footer={null}
      className="modal_show_detail"
    >
      <div style={{ paddingTop: "0", borderBottom: "1px solid black" }}>
        <span style={{ fontSize: "18px" }}>Cập nhật nâng hạng</span>
      </div>
      <div style={{ marginTop: "15px" }}>
        <Form form={form} onFinish={update}>
          <Form.Item label="Code" name="code">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            name="originalHoney"
            label="Loại điểm đầu"
            rules={[
              { required: true, message: "Điểm đầu không được để trống" },
            ]}
          >
            <Select style={{ width: "100%" }} size="large">
              {listCategory.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="destinationHoney"
            label="Loại điểm cuối"
            rules={[
              { required: true, message: "Điểm cuối không được để trống" },
            ]}
          >
            <Select style={{ width: "100%" }} size="large">
              {listCategory.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="ratio"
            label="Tỉ lệ nâng cấp"
            rules={[
              { required: true, message: "Tỉ lệ nâng cấp không được để trống" },
              { min: 0, max: 100, message: "Tỉ lệ nâng cấp từ 0 đến 100" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Radio.Group
              value={currentItem !== null ? currentItem.status : ""}
              disabled={true}
            >
              <Radio value={0}>Hoạt động</Radio>
              <Radio value={1}>Không hoạt động</Radio>
            </Radio.Group>
          </Form.Item>
          <div style={{ textAlign: "right" }}>
            <div style={{ paddingTop: "15px" }}>
              <Button
                style={{
                  marginRight: "5px",
                  backgroundColor: "rgb(61, 139, 227)",
                  color: "white",
                }}
                type="primary"
                htmlType="submit"
              >
                Cập nhật
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
        </Form>
      </div>
    </Modal>
  );
};

export default ModalUpdateUpgradeRate;
