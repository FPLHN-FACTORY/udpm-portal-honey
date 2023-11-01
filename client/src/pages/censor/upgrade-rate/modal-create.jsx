import { Input, Modal, message, Button, Row, Col, Form } from "antd";
import { useEffect } from "react";
import { AddUpgradeRate } from "../../../app/reducers/upgrade-rate/upgrade-rate.reducer";
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
  const listGift = useAppSelector(GetGift);
  const animatedComponents = makeAnimated();
  

  // useEffect(() => {
  //   if (visible === true) {
  //     if (listCategory.length > 0) {
  //       form.setFieldsValue({
  //         originalHoney: listCategory[0].id,
  //         destinationHoney: listCategory[0].id,
  //       });
  //     } else {
  //       form.resetFields();
  //     }
  //   }
  // }, [visible]);

  // useEffect(() => {
  //   if (visible === true) {
  //     if (listGift.length > 0) {
  //       form.setFieldsValue({
  //         idGifts: listGift[0].id,
  //       });
  //     } else {
  //       form.resetFields();
  //     }
  //   }
  // }, [visible]);

  useEffect(() => {
    featAllCategory();
  }, []);

  useEffect(() => {
    featAllGift();
  }, []);

  const featAllGift = async () => {
    UpgradeApi.getAllCensorExist()
      .then((response) => {
        dispatch(SetGift(response.data.data));
      })
      .catch((error) => {
        message.error(error);
      });
  };

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
      console.log("🚀 ~ file: modal-create.jsx:85 ~ form.validateFields ~ values:", values)
      const idLstGift = [];
      if(values.idGifts && values.idGifts[0].value){
        for (let gift of values.idGifts) {
          idLstGift.push(gift.value);
        }
      }else return message.error("Danh sách vật phẩm dùng để nâng cấp không được để trống");
      let obj = {
        originalHoneyId: values.originalHoney.value,
        destinationHoneyId: values.destinationHoney.value,
        quantityOriginalHoney: values.quantityOriginalHoney,
        quantityDestinationHoney: values.quantityDestinationHoney,
        idGifts : idLstGift,
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
          form.resetFields();
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
                style={{ width: "100%" }}
                size="large"
                options={listCategory.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="quantityOriginalHoney"
              label="Số lượng điểm đầu"
              rules={[
                {
                  required: true,
                  message: "Số lượng điểm đầu không được để trống",
                }
              ]}
            >
              <Input type="number" />
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
                options={listCategory.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="quantityDestinationHoney"
              label="Số lượng điểm cuối"
              rules={[
                {
                  required: true,
                  message: "Số lượng điểm cuối không được để trống",
                }
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="idGifts"
              label="Vật phẩm để nâng cấp"
              rules={[
                { required: true, message: "Danh sách vật phẩm nâng cấp không được để trống" },
              ]}
            >
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
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
