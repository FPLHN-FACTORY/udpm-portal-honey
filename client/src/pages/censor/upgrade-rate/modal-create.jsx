import { Input, Modal, message, Button, Row, Col, Select, Form } from "antd";
import { useEffect } from "react";
import { AddUpgradeRate } from "../../../app/reducers/upgrade-rate/upgrade-rate.reducer";
import { UpgradeApi } from "../../../apis/censor/upgrade-rate/upgrade-rate.api";
import {
  GetCategory,
  SetCategory,
} from "../../../app/reducers/category/category.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const ModalCreateUpgradeRate = ({
  visible,
  onCancel,
  fetchAllData,
  currentItem,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const listCategory = useAppSelector(GetCategory);

  useEffect(() => {
    if (visible === true) {
      if (listCategory.length > 0) {
        form.setFieldsValue({
          originalHoney: listCategory[0].id,
          destinationHoney: listCategory[0].id,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible]);

  useEffect(() => {
    featAllCategory();
  }, []);

  const featAllCategory = async () => {
    UpgradeApi.getALLCategory()
      .then((response) => {
        dispatch(SetCategory(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const create = () => {
    form.validateFields().then((values) => {
      let obj = {
        originalHoneyId: values.originalHoney,
        destinationHoneyId: values.destinationHoney,
        ratio: values.ratio,
        status: "0",
      };

      UpgradeApi.create(obj).then(
        (response) => {
          message.success("Thêm thành công!");
          let objCreate = {
            ...response.data.data,
          };
          fetchAllData();
          dispatch(AddUpgradeRate(objCreate));
          onCancel();
        },
        (error) => {
          message.error(error.response.data.message);
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
          <span style={{ fontSize: "18px" }}>Thêm mới nâng hạng</span>
        </div>
        <div style={{ marginTop: "15px" }}>
          <Form form={form} onFinish={create}>
            <Form.Item
              name="originalHoney"
              label="Loại điểm đầu"
              rules={[
                { required: true, message: "Điểm đầu không được để trống" },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Thể loại"
                options={listCategory.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
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
                style={{ width: "100%" }}
                size="large"
                placeholder="Thể loại"
                options={listCategory.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="ratio"
              label="Tỉ lệ nâng cấp"
              rules={[
                {
                  required: true,
                  message: "Tỉ lệ nâng cấp không được để trống",
                },
                {
                  min: 0,
                  max: 100,
                  message: "Tỉ lệ nâng cấp từ 0 đến 100",
                },
              ]}
            >
              <Input type="number" />
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
