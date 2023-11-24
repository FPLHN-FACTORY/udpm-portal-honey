import { Button, Col, Form, Input, Modal, Radio, Row, Select, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { AddGift } from "../../../app/reducers/gift/gift.reducer";
import { useState, useEffect } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import TextArea from "antd/es/input/TextArea";
import "./index.css";
import { GiftDetail } from "../../../apis/censor/gift/gift-detail.api";

const ModalThem = (props) => {
  const onFinishFailed = () => {
    if (selectedImageUrl.length === 0) {
      setErrorImage("Ảnh không được để trống");
    } else {
      setErrorImage("");
    }
  };

  const { modalOpen, setModalOpen, gift, onSave, fetchData } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [errorImage, setErrorImage] = useState("");
  const [image, setImage] = useState([]);
  const [quantityValue, setQuantityValue] = useState(0);
  const [checkTypeTime, setCheckTypeTime] = useState(2);
  const [limitQuantityValue, setLimitQuantityValue] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [selectType, setSelectType] = useState();

  const [categoryQuantities, setCategoryQuantities] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (selectedValues) => {
    const selectedCategories = listCategory.filter((category) =>
      selectedValues.includes(category.id)
    );
    setSelectedCategories(selectedCategories.map((category) => category.id));
    const newCategoryQuantities = {};
    selectedCategories.forEach((category) => {
      newCategoryQuantities[category.name] = 0;
    });

    setCategoryQuantities(newCategoryQuantities);
  };

  const handleFileInputChange = (event) => {
    var selectedFile = event.target.files[0];
    if (selectedFile) {
      var FileUploadName = selectedFile.name;
      if (FileUploadName === "") {
        setErrorImage("Bạn chưa chọn ảnh");
        setSelectedImageUrl("");
        setImage([]);
      } else {
        var Extension = FileUploadName.substring(
          FileUploadName.lastIndexOf(".") + 1
        ).toLowerCase();
        if (
          Extension === "gif" ||
          Extension === "png" ||
          Extension === "bmp" ||
          Extension === "jpeg" ||
          Extension === "jpg" ||
          Extension === "webp"
        ) {
          setImage(selectedFile);
          var imageUrl = URL.createObjectURL(selectedFile);
          setSelectedImageUrl(imageUrl);
          setErrorImage("");
        } else {
          setErrorImage(
            "Chỉ nhận ảnh có type WEBP, GIF, PNG, JPG, JPEG và BMP. "
          );
          setSelectedImageUrl("");
          setImage([]);
        }
      }
    }
  };

  form.setFieldsValue(gift);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCategory();
    if (gift && gift.quantity !== null) {
      setQuantityValue(1);
    } else {
      setQuantityValue(0);
      form.setFieldsValue({ quantityLimit: 1 });
    }
    if (gift && gift.limitQuantity !== null) {
      setLimitQuantityValue(1);
    } else {
      setLimitQuantityValue(0);
      form.setFieldsValue({ limitSoLuong: 1 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gift]);

  const fetchCategory = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      setListCategory(response.data.data);
    });
  };

  const validateQuantity = (rule, value) => {
    const quantityValue = form.getFieldValue("quantity");
    if (quantityValue === 1 && (!value || value <= 0)) {
      return Promise.reject("Số lượng phải lớn hơn 0.");
    }
    return Promise.resolve();
  };

  const validateLimitQuantity = (rule, value) => {
    const limitQuantityValue = form.getFieldValue("limitQuantity");
    if (limitQuantityValue === 1 && (!value || value <= 0)) {
      return Promise.reject("Số lượng phải lớn hơn 0.");
    }
    return Promise.resolve();
  };

  const validateHoney = (rule, value) => {
    if (!/^\d*$/.test(value)) {
      return Promise.reject("Điểm số phải là số.");
    }
    if (!value || value <= 0) {
      return Promise.reject("Điểm (điểm số) phải lớn hơn 0.");
    }
    return Promise.resolve();
  };

  const validateStartDate = (rule, value) => {
    const endDate = form.getFieldValue("end");
    const startDateValue = value === "" ? null : value;
    form.setFieldsValue({ start: startDateValue });
    if (value && endDate && new Date(value) >= new Date(endDate)) {
      return Promise.reject("Thời gian bắt đầu phải trước thời gian kết thúc.");
    }
    return Promise.resolve();
  };

  const validateEndDate = (rule, value) => {
    const startDate = form.getFieldValue("start");
    const endDateValue = value === "" ? null : value;
    form.setFieldsValue({ end: endDateValue });
    if (value && startDate && new Date(value) <= new Date(startDate)) {
      return Promise.reject("Thời gian kết thúc phải sau thời gian bắt đầu.");
    }
    return Promise.resolve();
  };

  const handleTypeChange = (selectedType) => {
    setSelectType(selectedType);
    if (selectedType === 0) {
      form.setFieldsValue({
        status: 0,
      });
    } else if (selectedType === 1) {
      form.setFieldsValue({
        limitQuantity: 0,
      });
    } else if (selectedType === 2) {
      form.setFieldsValue({
        status: 0,
        limitQuantity: 0,
      });
    }
  };

  const onFinish = () => {
    let check = 0;
    form
      .validateFields()
      .then((formValues) => {
        let quantity = null;
        let limitSL = null;

        if (selectedImageUrl.length === 0) {
          message.error("Không được để trống hình ảnh.");
          check++;
        }
        if (quantityValue === 1) {
          quantity = parseInt(formValues.quantityLimit, 10);
        }
        if (limitQuantityValue === 1) {
          limitSL = parseInt(formValues.limitSoLuong, 10);
        }

        if (isNaN(quantity) && quantityValue === 1) {
          message.error("Vui lòng nhập số lượng giới hạn hợp lệ.");
          check++;
        }
        if (isNaN(limitSL) && limitQuantityValue === 1) {
          message.error("Vui lòng nhập số lượng giới hạn hợp lệ.");
          check++;
        }

        if (check > 0) {
          return;
        }

        let dataCreate = {
          ...formValues,
          image: image,
          quantity: quantity,
          limitQuantity: limitSL,
          fromDate:
            isNaN(Date.parse(new Date(formValues.start))) ||
            formValues.start == null
              ? null
              : Date.parse(new Date(formValues.start)),
          toDate:
            isNaN(Date.parse(new Date(formValues.end))) ||
            formValues.end === null
              ? null
              : Date.parse(new Date(formValues.end)),
        };
        GiftAPI.create(dataCreate)
          .then((result) => {
            selectedCategories.forEach((categoryId) => {
              const category = listCategory.find(
                (item) => item.id === categoryId
              );
              const honeyValue = categoryQuantities[category.name];

              GiftDetail.create({
                giftId: result.data.data.id,
                categoryId: categoryId,
                honey: honeyValue,
              })
                .then(() => {
                  fetchData();
                })
                .catch((err) => {
                  message.error("Lỗi hệ thống !!!");
                });
            });

            dispatch(AddGift(result.data.data));
            message.success("Thành công!");
            setModalOpen(false);
            form.resetFields();
            const newGift = {
              id: result.data.data.id,
              name: result.data.data.name,
              status: result.data.data.status,
              image: image,
              quantity: quantity,
              limitQuantity: limitSL,
              type: result.data.data.type,
              honey: result.data.data.honey,
              honeyCategoryId: result.data.data.honeyCategoryId,
            };
            onSave && onSave(newGift);
          })
          .catch((err) => {
            message.error("Lỗi: " + err.message);
          });
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };

  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={"Thêm mới vật phẩm"}
      visible={modalOpen}
      onCancel={onCancel}
      footer={null}
      width={"80%"}
    >
      <hr className="border-0 bg-gray-300 mt-3 mb-6" />
      <Form
        id="addGift"
        form={form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
       
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          marginTop: 30,
          padding: "0 30px",
          justifyContent : "center"
        }}
        initialValues={{
          remember: true,
          quantity: quantityValue,
          limitQuantity: limitQuantityValue,
          quantityLimit: 1,
          limitSoLuong: 1,
          note: "",
        }}
        autoComplete="off"
      
      >
        <Row className="mb-3">
          <Col xl={4} xs={4}>
            <div
              onClick={() => {
                document.getElementById("select-avatar").click();
              }}
              className="image-container"
            >
              {image ? (
                <img src={selectedImageUrl} alt="Chọn ảnh" />
              ) : (
                "Chọn ảnh"
              )}
            </div>
            <input
              className="hidden-input"
              id="select-avatar"
              type="file"
              accept="image/*"
              onChange={(event) => handleFileInputChange(event)}
            />
            {errorImage && (
              <div style={{ color: "red"}}>
                {errorImage}
              </div>
            )}
          </Col>
          <Col xl={10} xs={10}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên Quà không để trống",
                },
                {
                  min: 4,
                  message: "Tên vật phẩm phải tối thiểu 4 kí tự",
                },
                {
                  max: 100,
                  message: "Tên vật phẩm phải tối đa 100 kí tự",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tùy chọn số lượng",
                },
              ]}
            >
              <Radio.Group onChange={(e) => setQuantityValue(e.target.value)}>
                <Radio value={0}>Vô hạn</Radio>
                <Radio value={1} style={{ marginLeft: 95 }}>
                  Giới hạn
                </Radio>
              </Radio.Group>
            </Form.Item>
            {form.getFieldValue("quantity") === 1 && (
              <Form.Item
                label="Số lượng giới hạn"
                name="quantityLimit"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng giới hạn",
                  },
                  {
                    validator: validateQuantity,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            )}
            <Form.Item
              label="Loại vật phẩm"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại",
                },
              ]}
            >
              <Select onChange={handleTypeChange} placeholder="Chọn loại">
                <Option value={0}>Quà tặng</Option>
                <Option value={1}>Vật phẩm nâng cấp</Option>
                <Option value={2}>Danh hiệu</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Loại mật quy đổi"
              name="honeyCategoryId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn cấp",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn cấp bậc"
                onChange={handleCategoryChange}
              >
                {listCategory.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {selectedCategories.map((categoryId) => {
              const category = listCategory.find(
                (item) => item.id === categoryId
              );

              return (
                <Form.Item
                  label={`Số mật ${category.name}`}
                  name={`honey_${category.name}`}
                  key={category.id}
                  rules={[
                    {
                      required: true,
                      message: `Vui lòng nhập số mật ${category.name}`,
                    },
                    {
                      validator: validateHoney,
                    },
                  ]}
                >
                  <Input
                    type="number"
                    value={categoryQuantities[category.name]}
                    onChange={(e) => {
                      const newQuantities = { ...categoryQuantities };
                      newQuantities[category.name] = e.target.value;
                      setCategoryQuantities(newQuantities);
                    }}
                  />
                </Form.Item>
              );
            })}
          </Col>
          <Col xl={10} xs={10} className="pl-2">
            <Form.Item
              label="Thời gian hết hạn"
              name="checkTypeDate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian hết hạn",
                },
              ]}
            >
              <Radio.Group className="flex" defaultValue={2} onChange={(e) => {
                setCheckTypeTime(e.target.value);
                form.setFieldValue("numberDateEnd", null);
                form.setFieldValue("start", null);
                form.setFieldValue("end", null);
              }}>
                <Radio value={0}>Theo ngày bắt đầu</Radio>
                <Radio value={1}>Theo khoảng ngày</Radio>
                <Radio value={2}>Vô hạn</Radio>
              </Radio.Group>
            </Form.Item>
            {
              checkTypeTime === 0 ?
                <>
                  <Form.Item
                    label={<span>Thời gian hết hạn <br/>(Theo ngày)</span>}
                    name="numberDateEnd"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn thời gian hết hạn",
                      },
                      {
                        validator: (_, value) => {
                          if (value.trim().length === 0) {
                            return Promise.resolve();
                          }
                          const regex = /^[1-9]+$/;
                          if (!regex.test(value)) {
                            return Promise.reject(new Error('Vui lòng nhập một số nguyên dương'));
                          }
                  
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                </> : checkTypeTime === 1 ?
                <>
                  <Form.Item
                    label="Thời gian bắt đầu"
                    name="start"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn thời gian hết hạn",
                      },
                      {
                        validator: validateStartDate,
                      },
                    ]}
                  >
                    <Input type="date" />
                  </Form.Item>

                  <Form.Item
                    label="Thời gian kết thúc"
                    name="end"
                    rules={[
                      {
                        validator: validateEndDate,
                      },
                    ]}
                  >
                    <Input type="date" />
                  </Form.Item>
                </> : <></>
            }
            <Form.Item
              label="Yêu cầu phê duyệt"
              name="status"
              initialValue={1}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tùy chọn phê duyệt",
                },
              ]}
              style={{
                display:
                  selectType === 0 || selectType === 2 ? "none" : "block",
              }}
            >
              <Radio.Group>
                <Radio value={0}>Không phê duyệt</Radio>
                <Radio value={1} style={{ marginLeft: 30 }}>
                  Cần phê duyệt
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Giao dịch"
              name="transactionGift"
              initialValue={0}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tùy chọn giao dịch",
                },
              ]}
              style={{
                display: selectType === 1 ? "block" : "none",
              }}
            >
              <Radio.Group>
                <Radio value={0}>Cho phép</Radio>
                <Radio value={1} style={{ marginLeft: 77 }}>
                  Không cho phép
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Cộng dồn"
              name="limitQuantity"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tùy chọn số lượng",
                },
              ]}
              style={{
                display:
                  selectType === 1 || selectType === 2 ? "none" : "block",
              }}
            >
              <Radio.Group
                onChange={(e) => setLimitQuantityValue(e.target.value)}
              >
                <Radio value={0}>Không cho phép</Radio>
                <Radio value={1} style={{ marginLeft: 37 }}>
                  Cho phép
                </Radio>
              </Radio.Group>
            </Form.Item>
            {form.getFieldValue("limitQuantity") === 1 && (
              <Form.Item
                label="Số lượng tối đa"
                name="limitSoLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng giới hạn cho phép",
                  },
                  {
                    validator: validateLimitQuantity,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            )}
            <Form.Item label="Ghi chú" name="note">
              <TextArea
                cols="30"
                rows="10"
                style={{ width: "350px", height: "100px" }}
                autoSize={{ minRows: 4, maxRows: 20 }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="text-center pb-4">
          <Col span={24}>
              <Button 
                onClick={onCancel}
                className="submit-button bg-black text-white"
              >
                Đóng
              </Button>
              <Button htmlType="submit" className="submit-button 
                  submit-button bg-black text-white ml-2">
                OK
              </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalThem;
