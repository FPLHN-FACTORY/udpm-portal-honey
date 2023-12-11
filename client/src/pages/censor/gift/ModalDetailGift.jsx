import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { UpdateGift } from "../../../app/reducers/gift/gift.reducer";
import { GiftAPI } from "../../../apis/censor/gift/gift.api";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import moment from "moment";
import { GiftDetail } from "../../../apis/censor/gift/gift-detail.api";
import "./index.css";

const ModalDetailGift = (props) => {
  const onFinishFailed = () => {
    if (selectedImageUrl.length === 0) {
      setErrorImage("Ảnh không được để trống");
    } else {
      setErrorImage("");
    }
  };

  const { TextArea } = Input;
  const { Option } = Select;
  const { visible, onCancel, onUpdate, gift, fetchData } = props;
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const [isLimitedQuantity, setIsLimitedQuantity] = useState(true);
  const [isLimitedQuantity2, setIsLimitedQuantity2] = useState(true);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [errorImage, setErrorImage] = useState("");
  let [selectType, setSelectType] = useState();
  const [categoryQuantities, setCategoryQuantities] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  const [checkTypeTime, setCheckTypeTime] = useState(null);
  useEffect(() => {
    GiftDetail.fetchAll(gift.id).then((response) => {
      const detailData = response.data.data;
      setSelectType(gift.type);
      const cateAddOption = detailData.map((item) => ({
        id: item.categoryId,
        name: item.categoryName,
      }));
      fetchCategory(cateAddOption);
      const categoryIds = detailData.map((item) => item.categoryId);
      const honeyValues = detailData.reduce((acc, item) => {
        acc[item.categoryId] = parseInt(item.honey);
        return acc;
      }, {});
      setSelectedCategories(categoryIds);
      setCategoryQuantities(honeyValues);
    });
    if (gift.toDate !== null && gift.fromDate !== null) {
      form.setFieldValue("checkTypeDate", 1);
      setCheckTypeTime(1);
    } else {
      form.setFieldValue("checkTypeDate", 2);
      setCheckTypeTime(2);
    }

    if (gift.image) {
      setSelectedImageUrl(gift.image);
    }

    // fetchCategory(cateAddOption);
    if (gift && gift.quantity !== null) {
      setIsLimitedQuantity(true);
    } else {
      setIsLimitedQuantity(false);
      form.setFieldsValue({ quantityLimit: 1 });
    }
    if (gift && gift.limitQuantity !== null) {
      setIsLimitedQuantity2(true);
    } else {
      setIsLimitedQuantity2(false);
      form.setFieldsValue({ limitSoLuong: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gift]);

  const handleTypeChange = (selectedType) => {
    setSelectType(selectedType);
    if (selectedType === 0) {
      form.setFieldsValue({
        status: 0,
      });
    } else if (selectedType === 1) {
      // form.setFieldsValue({
      //   limitQuantity: 0,
      // });
    } else if (selectedType === 2) {
      form.setFieldsValue({
        status: 0,
        honeyCategoryId: null,
        checkTypeDate: 2,
      });
    }
  };

  const validateCategories = (value) => {
    if (!value || value.length === 0) {
      return "Vui lòng chọn ít nhất một cấp bậc.";
    }
    return null;
  };

  const handleCategoryChange = (selectedValues) => {
    // Filter selectedValues to include only valid category IDs
    const filteredSelectedValues = selectedValues.filter((value) =>
      listCategory.some((category) => category.id === value)
    );

    setSelectedCategories(filteredSelectedValues);

    const newCategoryQuantities = { ...categoryQuantities };
    filteredSelectedValues.forEach((category) => {
      if (!selectedValues.includes(category)) {
        delete newCategoryQuantities[category];
      }
    });

    setCategoryQuantities(newCategoryQuantities);

    const error = validateCategories(filteredSelectedValues);
    setFieldErrors({ ...fieldErrors, selectedCategories: error });
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  const handleCategoryQuantityChange = (categoryId, value) => {
    const newQuantities = { ...categoryQuantities };
    newQuantities[categoryId] = value;
    setCategoryQuantities(newQuantities);
    const newFieldErrors = { ...fieldErrors };
    if (parseInt(value) <= 0) {
      newFieldErrors[categoryId] = true;
    } else {
      newFieldErrors[categoryId] = false;
    }
    if (!/^\d*$/.test(value)) {
      newFieldErrors[categoryId] = true;
    } else {
      newFieldErrors[categoryId] = false;
    }
    setFieldErrors(newFieldErrors);
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

  const fetchCategory = (cateAddOption) => {
    CategoryAPI.fetchAllCategory().then((response) => {
      const mergedList = [...response.data.data];
      cateAddOption.forEach((item2) => {
        const existingItem = mergedList.find((item1) => item1.id === item2.id);

        if (!existingItem) {
          mergedList.push(item2);
        }
      });
      setListCategory(mergedList);
    });
  };

  const dispatch = useAppDispatch();

  const validateQuantity = (rule, value) => {
    const quantityValue = form.getFieldValue("quantity");
    if (quantityValue === 1 && (!value || value <= 0)) {
      return Promise.reject("Số lượng phải lớn hơn 0.");
    }
    if (!/^\d*$/.test(value)) {
      return Promise.reject("Số lượng phải là số nguyên dương.");
    }
    return Promise.resolve();
  };
  const validateLimitQuantity = (rule, value) => {
    if (!/^\d*$/.test(value)) {
      return Promise.reject("Số lượng phải là số nguyên dương.");
    }
    const limitQuantityValue = form.getFieldValue("limitQuantity");
    if (limitQuantityValue === 1 && (!value || value <= 0)) {
      return Promise.reject("Số lượng phải lớn hơn 0.");
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

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        const hasCategoryErrors = Object.values(fieldErrors).some(
          (hasError) => hasError
        );

        if (hasCategoryErrors) {
          message.error("Số lượng mật phải là số nguyên dương lớn hơn 0");
          return;
        }

        const quantity = isLimitedQuantity
          ? parseInt(formValues.quantityLimit)
          : formValues.quantity !== undefined
          ? parseInt(formValues.quantity)
          : null;

        const limitSL = isLimitedQuantity2
          ? parseInt(formValues.limitSoLuong)
          : formValues.limitQuantity !== undefined
          ? parseInt(formValues.limitQuantity)
          : null;

        if (checkTypeTime === 0) {
          formValues.end = null;
          formValues.start = null;
        } else if (checkTypeTime === 1) {
          formValues.numberEndDate = undefined;
        } else {
          formValues.end = null;
          formValues.start = null;
          formValues.numberEndDate = undefined;
        }
        const data = {
          ...formValues,
          image: image,
          id: gift ? gift.id : null,
          status: formValues.status,
          quantity: isNaN(quantity) ? null : quantity,
          limitQuantity: isNaN(limitSL) ? null : limitSL,
          type: formValues.type,
          honey: formValues.honey,
          honeyCategoryId: formValues.honeyCategoryId,
          note: formValues.note,
          fromDate:
            isNaN(Date.parse(new Date(formValues.start))) ||
            formValues.start == null
              ? null
              : Date.parse(new Date(formValues.start)),
          toDate:
            isNaN(Date.parse(new Date(formValues.end))) ||
            formValues.end == null
              ? null
              : Date.parse(new Date(formValues.end)),
          scoreRatio:
            formValues.scoreRatio !== undefined
              ? parseInt(formValues.scoreRatio)
              : null,
          score:
            formValues.score !== undefined
              ? parseFloat(formValues.score)
              : null,
          scoreRatioMin:
            formValues.scoreRatioMin !== undefined
              ? parseInt(formValues.scoreRatioMin)
              : null,
          scoreRatioMax:
            formValues.scoreRatioMax !== undefined
              ? parseInt(formValues.scoreRatioMax)
              : null,
        };

        Modal.confirm({
          title: "Bạn có chắc chắn cập nhật dữ liệu không?",
          onOk: () => {
            GiftAPI.update(data, gift ? gift.id : null)
              .then((response) => {
                // Handle success
                const selectedCategoryIds = selectedCategories;
                const honeyValues = { ...categoryQuantities };

                // Update or create GiftDetail entries
                GiftDetail.fetchAll(gift.id).then((response) => {
                  const detailData = response.data.data;
                  const categoryIdsInDetail = detailData.map(
                    (item) => item.categoryId
                  );
                  const categoryIdsToDelete = categoryIdsInDetail.filter(
                    (categoryId) => !selectedCategoryIds.includes(categoryId)
                  );

                  categoryIdsToDelete.forEach((categoryId) => {
                    const detailItem = detailData.find(
                      (item) => item.categoryId === categoryId
                    );

                    if (detailItem) {
                      GiftDetail.delete(detailItem.id)
                        .then(() => {})
                        .catch((err) => {
                          message.error("Lỗi khi xóa: " + err.message);
                        });
                    }
                  });

                  selectedCategoryIds.forEach((categoryId) => {
                    const honey = honeyValues[categoryId];
                    const existingItem = detailData.find(
                      (item) => item.categoryId === categoryId
                    );

                    if (existingItem) {
                      GiftDetail.update({ honey }, existingItem.id)
                        .then(() => {})
                        .catch((err) => {
                          message.error("Lỗi khi cập nhật: " + err.message);
                        });
                    } else {
                      GiftDetail.create({
                        giftId: gift.id,
                        categoryId,
                        honey,
                      })
                        .then(() => {})
                        .catch((err) => {
                          message.error("Lỗi khi thêm mới: " + err.message);
                        });
                    }
                  });
                });

                // Dispatch action and show success message
                dispatch(UpdateGift(response.data.data));
                message.success("Cập nhật thành công!");
                onUpdate();
                fetchData();
              })
              .catch((err) => {
                message.error(err.response.data.message);
              });
          },
          okText: "Đồng ý",
          cancelText: "Hủy",
        });
      })
      .catch((errorInfo) => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };

  const fromDate = new Date(Number(gift.fromDate));
  const toDate = new Date(Number(gift.toDate));

  const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
  const formattedToDate = moment(toDate).format("YYYY-MM-DD");

  const initialValues = {
    image: gift && gift.image !== null && gift.image !== "" ? gift.image : null,
    quantity: gift && gift.quantity !== null ? gift.quantity : null,
    quantityLimit: gift && gift.quantity !== null ? gift.quantity : null,
    limitQuantity:
      gift && gift.limitQuantity !== null ? gift.limitQuantity : null,
    limitSoLuong:
      gift && gift.limitQuantity !== null ? gift.limitQuantity : null,
    name: gift && gift.name ? gift.name : "",
    code: gift && gift.code ? gift.code : "",
    status: gift && gift.status !== null ? gift.status : 0,
    type: gift && gift.type ? gift.type : 0,
    transactionGift: gift && gift.transactionGift ? gift.transactionGift : 0,
    note: gift && gift.note ? gift.note : "",
    timeType: gift.fromDate && gift.toDate ? "thời hạn" : "vĩnh viễn",
    start: gift.fromDate != null ? formattedFromDate : null,
    end: gift.toDate != null ? formattedToDate : null,
    scoreRatio: gift.scoreRatio != null ? gift.scoreRatio : null,
    score: gift.score != null ? gift.score : null,
    scoreRatioMin: gift.scoreRatioMin != null ? gift.scoreRatioMin : null,
    scoreRatioMax: gift.scoreRatioMax != null ? gift.scoreRatioMax : null,
    checkTypeDate: 2,
  };

  return (
    <Modal
      title="Chi tiết vật phẩm"
      onCancel={handleCancel}
      footer={null}
      visible={visible}
      width={"80%"}
    >
      <Form
        id="detailGift"
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
          justifyContent: "center",
        }}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Row className="mb-5">
          <Col xl={4} xs={4}>
            <div
              onClick={() => {
                document.getElementById("select-avatar").click();
              }}
              className="image-container"
            >
              {<img src={selectedImageUrl} alt="Chọn ảnh" />}
            </div>
            <input
              className="hidden-input"
              id="select-avatar"
              type="file"
              accept="image/*"
              onChange={(event) => handleFileInputChange(event)}
            />
            {errorImage && (
              <div style={{ color: "red", paddingLeft: "100px" }}>
                {errorImage}
              </div>
            )}
          </Col>
          <Col xl={10} xs={10} className="pl-2">
            <Form.Item label="Code" name="code">
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Tên vật phẩm không để trống",
                },
                {
                  validator: (_, value) => {
                    // if ((value + "").trim().length === 0) {
                    //   return Promise.reject(
                    //     new Error("Tên vật phẩm không để trống")
                    //   );
                    // }
                    if ((value + "").trim().length < 4) {
                      return Promise.reject(
                        new Error("Tên vật phẩm phải tối thiểu 4 kí tự")
                      );
                    }
                    if ((value + "").trim().length > 100) {
                      return Promise.reject(
                        new Error("Tên vật phẩm tối đa 100 kí tự")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Số lượng" name="quantity">
              <Radio.Group
                onChange={(e) => {
                  setIsLimitedQuantity(e.target.value !== null);
                  if (!e.target.value) {
                    form.setFieldsValue({ quantityLimit: null });
                  }
                }}
              >
                <Radio
                  value={null}
                  defaultChecked={gift && gift.quantity === null}
                >
                  Vô hạn
                </Radio>
                <Radio
                  style={{ marginLeft: 95 }}
                  value={gift && gift.quantity !== null ? gift.quantity : 1}
                >
                  Giới hạn
                </Radio>
              </Radio.Group>
            </Form.Item>
            {isLimitedQuantity ? (
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
            ) : null}
            <Form.Item
              label="Loại vật phẩm"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại",
                },
              ]}
              style={{ height: 40 }}
            >
              <Select
                placeholder="Chọn loại"
                onChange={handleTypeChange}
                className="select-custom"
              >
                <Option value={0}>Quà tặng</Option>
                <Option value={1}>Vật phẩm nâng cấp</Option>
                <Option value={2}>Danh hiệu</Option>
              </Select>
            </Form.Item>
            {selectType !== 2 && (
              <Form.Item
                label="Loại mật quy đổi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại",
                  },
                ]}
                style={{ height: 40 }}
              >
                <Select
                  className="select-custom"
                  mode="tags"
                  placeholder="Loại mật quy đổi"
                  onChange={(value) => handleCategoryChange(value)}
                  value={selectedCategories}
                  maxTagCount={3}
                  showSearch
                  filterOption={(input, option) =>
                    // console.log(option)
                    option.children.indexOf(input) >= 0
                  }
                >
                  {listCategory.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            {selectType !== 2 && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "-2" }}
              >
                {fieldErrors.selectedCategories}
              </div>
            )}

            {selectType !== 2 &&
              listCategory.map((category) => {
                const categoryId = category.id;
                const honeyValue =
                  categoryId in categoryQuantities
                    ? categoryQuantities[categoryId]
                    : "";
                form.setFieldValue(`honey_${category.id}`, honeyValue);

                if (selectedCategories.includes(categoryId)) {
                  return (
                    <Form.Item
                      label={
                        <span
                          style={{ wordBreak: "break-word", textWrap: "wrap" }}
                        >
                          Số mật {category.name}
                        </span>
                      }
                      name={`honey_${category.id}`}
                      key={category.id}
                      rules={[
                        {
                          required: true,
                          message: `Vui lòng nhập số mật ${category.name}`,
                        },
                        {
                          validator: (_, value) => {
                            const regex = /^[1-9]\d*$/;
                            if (!regex.test(value) || value === 0) {
                              return Promise.reject(
                                new Error("Vui lòng nhập một số nguyên dương")
                              );
                            }

                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        id={`honey_${category.name}`}
                        onChange={(e) =>
                          handleCategoryQuantityChange(
                            categoryId,
                            e.target.value
                          )
                        }
                      />
                    </Form.Item>
                  );
                }
                return null;
              })}
          </Col>

          <Col xl={10} xs={10} className="pl-2">
            {selectType !== 2 && (
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
                <Radio.Group
                  className="flex"
                  defaultValue={checkTypeTime}
                  onChange={(e) => {
                    setCheckTypeTime(e.target.value);
                  }}
                >
                  {/* <Radio
                    defaultChecked={gift && gift.numberEndDate !== null}
                    value={0}
                  >
                    Theo ngày bắt đầu
                  </Radio> */}
                  <Radio
                    defaultChecked={
                      gift && gift.toDate !== null && gift.fromDate !== null
                    }
                    value={1}
                  >
                    Theo khoảng ngày
                  </Radio>
                  <Radio
                    defaultChecked={
                      gift &&
                      gift.numberEndDate !== null &&
                      gift.toDate !== null &&
                      gift.fromDate !== null
                    }
                    value={2}
                  >
                    Vô hạn
                  </Radio>
                </Radio.Group>
              </Form.Item>
            )}
            {checkTypeTime === 0 && selectType !== 2 ? (
              <>
                <Form.Item
                  label={
                    <span>
                      Thời gian hết hạn <br />
                      (Theo ngày)
                    </span>
                  }
                  name="numberEndDate"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn thời gian hết hạn",
                    },
                    {
                      validator: (_, value) => {
                        if ((value + "").trim().length === 0) {
                          return Promise.resolve();
                        }
                        const regex = /^[0-9]+$/;
                        if (!regex.test(value) || value === 0) {
                          return Promise.reject(
                            new Error("Vui lòng nhập một số nguyên dương")
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </>
            ) : checkTypeTime === 1 && selectType !== 2 ? (
              <>
                <Form.Item
                  label="Thời gian bắt đầu"
                  name="start"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn thời gian bắt đầu",
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
                      required: true,
                      message: "Vui lòng chọn thời gian hết hạn",
                    },
                    {
                      validator: validateEndDate,
                    },
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
              </>
            ) : (
              <></>
            )}

            <Form.Item
              label="Phê duyệt"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tùy chọn phê duyệt",
                },
              ]}
              style={{
                display: selectType === 2 ? "none" : "block",
              }}
            >
              <Radio.Group
                value={gift !== null ? gift.status : undefined}
                onChange={(e) =>
                  form.setFieldsValue({ status: e.target.value })
                }
              >
                <Radio value={0}>Không phê duyệt</Radio>
                <Radio value={1}>Cần phê duyệt</Radio>
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
                display:
                  selectType === 0 || selectType === 1 ? "block" : "none",
              }}
            >
              <Radio.Group>
                <Radio value={0}>Cho phép</Radio>
                <Radio value={1}>Không cho phép</Radio>
              </Radio.Group>
            </Form.Item>
            {selectType === 0 && (
              <Form.Item
                label="Cộng dồn"
                name="limitQuantity"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn cấu hình cộng dồn",
                  },
                ]}
              >
                <Radio.Group
                  onChange={(e) => {
                    setIsLimitedQuantity2(e.target.value !== 0);
                    if (e.target.value === 0) {
                      form.setFieldsValue({ limitSoLuong: null });
                    } else {
                      form.setFieldsValue({ limitSoLuong: gift.limitQuantity });
                    }
                  }}
                >
                  <Radio
                    value={0}
                    defaultChecked={gift && gift.limitQuantity === null}
                  >
                    Không cho phép
                  </Radio>
                  <Radio
                    value={1}
                    defaultChecked={gift && gift.limitQuantity !== null}
                  >
                    Cho phép
                  </Radio>
                </Radio.Group>
              </Form.Item>
            )}
            {isLimitedQuantity2 && selectType === 0 ? (
              <Form.Item
                label="Số lượng tối đa"
                name="limitSoLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng giới hạn",
                  },
                  {
                    validator: validateLimitQuantity,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            ) : null}

            {selectType === 0 && (
              <>
                <Form.Item
                  label="Điểm quy đổi"
                  name="score"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Điểm quy đổi giới hạn cho phép",
                    },
                    {
                      validator: (_, value) => {
                        if (value <= 0 || value > 10) {
                          return Promise.reject(
                            new Error(
                              "Vui lòng nhập một số lớn hơn 0 và nhỏ hơn 10"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Trọng số quy đổi"
                  name="scoreRatio"
                  rules={[
                    {
                      required: true,
                      message:
                        "Vui lòng nhập Trọng số quy đổi giới hạn cho phép",
                    },
                    {
                      validator: (_, value) => {
                        const regex = /^[0-9]+$/;
                        if (!regex.test(value) || value === 0) {
                          return Promise.reject(
                            new Error("Vui lòng nhập một số nguyên dương")
                          );
                        }
                        if (value <= 0 || value > 100) {
                          return Promise.reject(
                            new Error(
                              "Vui lòng nhập một số lớn hơn 0 và nhỏ hơn 100"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Trọng số nhỏ nhất"
                  name="scoreRatioMin"
                  rules={[
                    {
                      validator: (_, value) => {
                        const regex = /^[0-9]+$/;
                        if (!regex.test(value) || value === 0) {
                          return Promise.reject(
                            new Error("Vui lòng nhập một số nguyên dương")
                          );
                        }
                        if (value <= 0 || value > 100) {
                          return Promise.reject(
                            new Error(
                              "Vui lòng nhập một số lớn hơn 0 và nhỏ hơn 100"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Trọng số lớn nhất"
                  name="scoreRatioMax"
                  rules={[
                    {
                      validator: (_, value) => {
                        const regex = /^[0-9]+$/;
                        if (!regex.test(value)) {
                          return Promise.reject(
                            new Error("Vui lòng nhập một số nguyên dương")
                          );
                        }
                        if (value <= 0 || value > 100) {
                          return Promise.reject(
                            new Error(
                              "Vui lòng nhập một số lớn hơn 0 và nhỏ hơn 100"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
              </>
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
              onClick={handleCancel}
              className="submit-button bg-black text-white"
            >
              Đóng
            </Button>
            <Button
              htmlType="submit"
              className="submit-button 
                  submit-button bg-black text-white ml-2"
            >
              OK
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalDetailGift;
