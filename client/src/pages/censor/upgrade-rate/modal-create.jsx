import { Input, Modal, message, Button, Form, Select } from "antd";
import { UpgradeApi } from "../../../apis/censor/upgrade-rate/upgrade-rate.api";
import {
  GetCategory,
} from "../../../app/reducers/category/category.reducer";
import {
  GetGift,
} from "../../../app/reducers/gift/gift.reducer";
import { useAppSelector } from "../../../app/hooks";
import { useEffect, useState } from "react";

const ModalCreateUpgradeRate = ({
  visible,
  onCancel,
  fetchAllData,
  currentItem
}) => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  useEffect(() => {
    form.setFieldsValue(null);
    console.log(currentItem);
    if (currentItem) {
      const updatedCurrentItem = {
        originalHoney: currentItem.originalId,
        destinationHoney: currentItem.destinationId,
        idGifts: currentItem.giftId.split(", "),
        ratio: currentItem.ratio,
        quantityOriginal: currentItem.quantityOriginal,
        quantityDestination: currentItem.quantityDestination,
      };

      if (currentItem.id) {
        setId(currentItem.id);
      }
      console.log(updatedCurrentItem);
      // form.setFieldsValue({ idGifts: updatedCurrentItem.giftName });
      form.setFieldsValue(updatedCurrentItem);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const listCategory = useAppSelector(GetCategory);
  const listGift = useAppSelector(GetGift);

  const create = () => {
    form.validateFields().then((values) => {
      let obj = {
        upgradeRateId: id,
        originalHoneyId: values.originalHoney,
        destinationHoneyId: values.destinationHoney,
        quantityOriginalHoney: values.quantityOriginal,
        quantityDestinationHoney: values.quantityDestination,
        idGifts : values.idGifts,
        ratio: values.ratio,
        status: 0,
      };
      console.log(obj);

      UpgradeApi.create(obj).then(
        (response) => {
          console.log(response.data.data);
          if (response.data.data) {
            if (id) {
              message.success("Cập nhật thành công!");
            } else {
              message.success("Thêm mới thành công!");
            }
          } else {
            if (id) {
              message.success("Cập nhật Thất bại!");
            } else {
              message.success("Thêm mới Thất bại!");
            }
          }
          fetchAllData();
          form.resetFields();
          onCancel();
        }
      );
    });
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
        <div style={{ paddingTop: "0", borderBottom: "1px solid black" }}>
          <span style={{ fontSize: "18px" }}> {id ? "Cập nhật nâng hạng" : "Thêm mới nâng hạng"}</span>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Form form={form} onFinish={create}
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}>
            <Form.Item
              name="originalHoney"
              label="Loại điểm đầu"
              rules={[
                { required: true, message: "Điểm đầu không được để trống" },
              ]}
            >
              <Select
                className="w-full"
                size="large"
                allowClear
                options={listCategory.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="quantityOriginal"
              label="Số lượng điểm đầu"
              rules={[
                {
                  required: true,
                  message: "Số lượng điểm đầu không được để trống",
                }
              ]}
            >
              <Input
                className="w-full" type="number" />
            </Form.Item>
            <Form.Item
              name="destinationHoney"
              label="Loại điểm cuối"
              rules={[
                {
                  required: true,
                  message: "Điểm cuối không được để trống",
                },
              ]}
            >
              <Select
                className="w-full"
                size="large"
                options={listCategory.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="quantityDestination"
              label="Số lượng điểm cuối"
              rules={[
                {
                  required: true,
                  message: "Số lượng điểm cuối không được để trống",
                }
              ]}
            >
              <Input
                className="w-full" type="number" />
            </Form.Item>
            <Form.Item
              name="idGifts"
              label="Vật phẩm để nâng cấp"
              rules={[
                { required: true, message: "Danh sách vật phẩm nâng cấp không được để trống" },
              ]}
            >
              <Select
                className="w-full"
                closeMenuOnSelect={false}
                mode="multiple"
                key={"idGifts"}
                options={listGift.map((gift) => ({
                  value: gift.id,
                  label: gift.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="ratio"
              label="Tỉ lệ nâng cấp"
              placeholder="Tỉ lệ nâng cấp"
              rules={[
                {
                  required: true,
                  message: "Tỉ lệ nâng cấp không được để trống",
                },
                {
                  validator: (rule, value) => {
                    if (value >= 0 && value <= 100) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Tỉ lệ nâng cấp phải nằm trong khoảng từ 0 đến 100');
                  },
                },
              ]}
            >
              <Input
                className="w-full" type="number" />
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
          </Form>
        </div>
      </Modal>
    </>
  );
};
export default ModalCreateUpgradeRate;
