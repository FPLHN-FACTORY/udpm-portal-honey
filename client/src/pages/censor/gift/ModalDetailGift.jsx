import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Modal, Radio, Select } from "antd";
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
    message.error("Error");
  };

  const { TextArea } = Input;
  const { Option } = Select;
  const { visible, onCancel, onUpdate, gift, fetchData } = props;
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const [isLimitedQuantity, setIsLimitedQuantity] = useState(true);
  const [isLimitedQuantity2, setIsLimitedQuantity2] = useState(true);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [timeType, setTimeType] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  let [selectType, setSelectType] = useState();

  const [categoryQuantities, setCategoryQuantities] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    GiftDetail.fetchAll(gift.id).then((response) => {
      const detailData = response.data.data;
      const categoryIds = detailData.map((item) => item.categoryId);
      const honeyValues = detailData.reduce((acc, item) => {
        acc[item.categoryId] = item.honey;
        return acc;
      }, {});
      setSelectedCategories(categoryIds);
      setCategoryQuantities(honeyValues);
    });
    if (gift.image) {
      const byteArray = gift.image.split(",").map(Number);
      const uint8Array = new Uint8Array(byteArray);
      const blob = new Blob([uint8Array], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);

      setSelectedImageUrl(imageUrl);
    }
    const timeType = gift.fromDate && gift.toDate ? "thời hạn" : "vĩnh viễn";

    setTimeType(timeType);

    fetchCategory();
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
  }, [gift]);

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

  const validateCategories = (value) => {
    if (!value || value.length === 0) {
      return "Vui lòng chọn ít nhất một cấp bậc.";
    }
    return null;
  };
  const changeSelectType = (value) => {
    if (value) {
      initialValues.gift.type = value;
    }
  };

  const handleCategoryChange = (selectedValues) => {
    setSelectedCategories(selectedValues);

    const newCategoryQuantities = { ...categoryQuantities };
    selectedCategories.forEach((category) => {
      if (!selectedValues.includes(category)) {
        delete newCategoryQuantities[category];
      }
    });

    setCategoryQuantities(newCategoryQuantities);

    // Perform custom validation here
    const error = validateCategories(selectedValues);
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
  };
  const handleFileInputChange = (event) => {
    var selectedFile = event.target.files[0];
    if (selectedFile) {
      var FileUploadName = selectedFile.name;
      if (FileUploadName == "") {
        setErrorImage("Bạn chưa chọn ảnh");
        setSelectedImageUrl("");
        setImage([]);
      } else {
        const fileSize = selectedFile.size;
        const checkFileSize = Math.round(fileSize / 1024 / 1024);
        console.log(
          "🚀 ~ file: ModalAddGift.jsx:65 ~ handleFileInputChange ~ checkFileSize:",
          checkFileSize
        );
        if (checkFileSize > 1) {
          setErrorImage("Ảnh không thể lớn hơn 1 MB");
          setSelectedImageUrl("");
          setImage([]);
        } else {
          var Extension = FileUploadName.substring(
            FileUploadName.lastIndexOf(".") + 1
          ).toLowerCase();
          if (
            Extension == "gif" ||
            Extension == "png" ||
            Extension == "bmp" ||
            Extension == "jpeg" ||
            Extension == "jpg" ||
            Extension == "webp"
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
    }
  };

  const fetchCategory = () => {
    CategoryAPI.fetchAllCategory().then((response) => {
      setListCategory(response.data.data);
    });
  };

  const dispatch = useAppDispatch();

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

  const validateStartDate = (rule, value) => {
    const endDate = form.getFieldValue("end");
    if (value && endDate && new Date(value) >= new Date(endDate)) {
      return Promise.reject("Thời gian bắt đầu phải trước thời gian kết thúc.");
    }
    return Promise.resolve();
  };

  const validateEndDate = (rule, value) => {
    const startDate = form.getFieldValue("start");
    if (value && startDate && new Date(value) <= new Date(startDate)) {
      return Promise.reject("Thời gian kết thúc phải sau thời gian bắt đầu.");
    }
    return Promise.resolve();
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        let quantity;
        if (selectedImageUrl.length === 0) {
          return;
        }
        if (isLimitedQuantity) {
          quantity = parseInt(formValues.quantityLimit);
        } else {
          quantity =
            formValues.quantity !== undefined
              ? parseInt(formValues.quantity)
              : null;
        }
        let limitSL;
        if (isLimitedQuantity2) {
          limitSL = parseInt(formValues.limitSoLuong);
        } else {
          limitSL =
            formValues.limitQuantity !== undefined
              ? parseInt(formValues.limitQuantity)
              : null;
        }

        let updatedFromDate = null;
        let updatedToDate = null;

        if (formValues.timeType === "vĩnh viễn") {
          updatedFromDate = null;
          updatedToDate = null;
        } else if (formValues.timeType === "thời hạn") {
          updatedFromDate = new Date(formValues.start).getTime();
          updatedToDate = new Date(formValues.end).getTime();
        }
        const newFieldErrors = {};

        selectedCategories.forEach((categoryId) => {
          const category = listCategory.find((item) => item.id === categoryId);

          const honeyValue = categoryQuantities[category.id] || "";

          if (honeyValue === "" || honeyValue < 0) {
            newFieldErrors[category.id] = true;
          } else {
            newFieldErrors[category.id] = false;
          }
        });

        if (fieldErrors.selectedCategories) {
          return;
        }

        setFieldErrors(newFieldErrors);

        const hasErrors = Object.values(newFieldErrors).some(
          (hasError) => hasError
        );
        if (hasErrors) {
          return;
        }
        GiftAPI.update(
          {
            ...formValues,
            image: image,
            id: gift ? gift.id : null,
            status: formValues.status,
            quantity: quantity,
            limitQuantity: limitSL,
            type: formValues.type,
            honey: formValues.honey,
            honeyCategoryId: formValues.honeyCategoryId,
            note: formValues.note,
            fromDate: updatedFromDate,
            toDate: updatedToDate,
          },
          gift ? gift.id : null
        )
          .then((response) => {
            const selectedCategoryIds = selectedCategories;
            const honeyValues = { ...categoryQuantities };

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
            dispatch(UpdateGift(response.data.data));
            message.success("Cập nhật thành công!");
            onUpdate();
            fetchData();
          })
          .catch((err) => {
            message.error("Lỗi: " + err.message);
          });
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };
  const fromDate = new Date(Number(gift.fromDate));
  const toDate = new Date(Number(gift.toDate));

  const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
  const formattedToDate = moment(toDate).format("YYYY-MM-DD");

  const initialValues = {
    image: gift && gift.image !== null ? gift.image : null,
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
    start: formattedFromDate,
    end: formattedToDate,
  };

  return (
    <Modal
      title="Chi tiết vật phẩm"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
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
          maxWidth: 600,
        }}
        initialValues={initialValues}
        autoComplete="off"
      >
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
          <div style={{ color: "red", paddingLeft: "100px" }}>{errorImage}</div>
        )}
        <Form.Item label="Code" name="code">
          <Input disabled />
        </Form.Item>
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
        <Form.Item label="Số lượng" name="quantity">
          <Radio.Group
            onChange={(e) => {
              setIsLimitedQuantity(e.target.value !== null);
              if (!e.target.value) {
                form.setFieldsValue({ quantityLimit: null });
              }
            }}
          >
            <Radio value={null} defaultChecked={gift && gift.quantity === null}>
              Vô hạn
            </Radio>
            <Radio value={gift && gift.quantity !== null ? gift.quantity : 1}>
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
        >
          <Select placeholder="Chọn loại" onChange={handleTypeChange}>
            <Option value={0}>Quà tặng</Option>
            <Option value={1}>Vật phẩm nâng cấp</Option>
            <Option value={2}>Dụng cụ</Option>
          </Select>
        </Form.Item>
        <div className="select-section">
          <span className="select-asterisk">*</span>
          <span className="select-label">Chọn cấp bậc : </span>
          <Select
            className="select-custom"
            mode="tags"
            placeholder="Chọn cấp bậc"
            onChange={(value) => handleCategoryChange(value)}
            value={selectedCategories}
            maxTagCount={3}
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {listCategory.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div style={{ color: "red", textAlign: "center", marginTop: "-2" }}>
          {fieldErrors.selectedCategories}
        </div>
        {listCategory.map((category) => {
          const categoryId = category.id;
          const honeyValue =
            categoryId in categoryQuantities
              ? categoryQuantities[categoryId]
              : "";
          const isInvalid = honeyValue === "" || honeyValue <= 0;

          if (selectedCategories.includes(categoryId)) {
            return (
              <div className="input-matcate" key={categoryId}>
                <label className="label" htmlFor={`honey_${category.name}`}>
                  <span className="select-asterisk">*</span> Số mật{" "}
                  {category.name} :
                </label>
                <Input
                  type="number"
                  id={`honey_${category.name}`}
                  value={honeyValue}
                  onChange={(e) =>
                    handleCategoryQuantityChange(categoryId, e.target.value)
                  }
                />
                {isInvalid && (
                  <p style={{ color: "red" }}>
                    Số mật phải lớn hơn 0 và không được để trống.
                  </p>
                )}
              </div>
            );
          }
          return null;
        })}
        <Form.Item
          label="Thời gian"
          name="timeType"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thời gian",
            },
          ]}
        >
          <Radio.Group
            value={timeType}
            onChange={(e) => setTimeType(e.target.value)}
          >
            <Radio value="vĩnh viễn">Vĩnh viễn</Radio>
            <Radio value="thời hạn">Thời hạn</Radio>
          </Radio.Group>
        </Form.Item>
        {timeType === "thời hạn" && (
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
                  message: "Vui lòng chọn thời gian kết thúc",
                },
                {
                  validator: validateEndDate,
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </>
        )}

        {console.log(gift.type)}
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
            display: gift.type === 0 || gift.type === 2 ? "none" : "block",
          }}
        >
          <Radio.Group
            value={gift !== null ? gift.status : undefined}
            onChange={(e) => form.setFieldsValue({ status: e.target.value })}
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
            display: selectType === 1 ? "block" : "none",
          }}
        >
          <Radio.Group>
            <Radio value={0}>Cho phép</Radio>
            <Radio value={1}>Không cho phép</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Cộng dồn"
          name="limitQuantity"
          style={{
            display: gift.type === 1 || gift.type === 2 ? "none" : "block",
          }}
        >
          <Radio.Group
            onChange={(e) => {
              setIsLimitedQuantity2(e.target.value !== null);
              if (!e.target.value) {
                form.setFieldsValue({ limitSoLuong: null });
              }
            }}
          >
            <Radio
              value={null}
              defaultChecked={gift && gift.limitQuantity === null}
            >
              Không cho phép
            </Radio>
            <Radio
              value={
                gift && gift.limitQuantity !== null ? gift.limitQuantity : 1
              }
            >
              Cho phép
            </Radio>
          </Radio.Group>
        </Form.Item>
        {isLimitedQuantity2 ? (
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
        <Form.Item label="Ghi chú" name="note">
          <TextArea
            cols="30"
            rows="10"
            style={{ width: "350px", height: "100px" }}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            style={{ marginRight: "20px" }}
            onClick={handleCancel}
            className="submit-button"
          >
            Đóng
          </Button>
          <Button htmlType="submit" className="submit-button ml-2">
            OK
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalDetailGift;
