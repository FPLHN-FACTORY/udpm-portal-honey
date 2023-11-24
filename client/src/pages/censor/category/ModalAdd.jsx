import { Button, Form, Input, Modal, Radio, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import {
  UpdateCategory,
  AddCategory,
} from "../../../app/reducers/category/category.reducer";
import "./index.css";
import { useEffect, useState } from "react";
const ModalThem = (props) => {
  const [listCategory, setListCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [errorCategoryName, setErrorCategoryName] = useState("");

  const { fetchData } = props;

  useEffect(() => {
    CategoryAPI.fetchAll().then((response) => {
      setListCategory(response.data.data.data);
    });
  }, []);

  const handleFileInputChange = (event) => {
    var selectedFile = event.target.files[0];
    if (selectedFile) {
      var FileUploadName = selectedFile.name;
      if (FileUploadName === "") {
        setErrorImage("Bạn chưa chọn ảnh");
        setSelectedImageUrl("");
        setImage([]);
      } else {
        const fileSize = selectedFile.size;
        const checkFileSize = Math.round(fileSize / 1024 / 1024);
        if (checkFileSize > 10) {
          setErrorImage("Ảnh không thể lớn hơn 10 MB");
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
    }
  };

  const onFinishFailed = () => {
    message.error("Error");
  };

  const { modalOpen, setModalOpen, category, onSave } = props;
  const [form] = Form.useForm();
  form.setFieldsValue(category);

  const dispatch = useAppDispatch();
  form.setFieldsValue(category);
  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        const isNameExists = listCategory.some(
          (listCategory) => listCategory.name === categoryName
        );
        let check = 0;
        if (selectedImageUrl.length === 0) {
          setErrorImage("Ảnh không được để trống");
          check++;
        } else {
          setErrorImage("");
        }

        if (categoryName.trim().length === 0) {
          setErrorCategoryName("Tên thể loại không được để trống");
          check++;
        } else {
          if (categoryName.trim().length > 100) {
            setErrorCategoryName("Tên thể loại không quá 100 ký tự");
            check++;
          } else if (isNameExists) {
            setErrorCategoryName("Tên thể loại không được trùng");
            check++;
          } else {
            setErrorCategoryName("");
          }
        }

        if (check === 0) {
          if (formValues.transactionRights === "0") {
            // If transactionRights is 0, show confirmation modal
            Modal.confirm({
              title: "Chú ý",
              content:
                "Bạn có chắc chắn muốn thêm thể loại này được giao dịch không?",
              onOk: () => {
                handleAddCategory(formValues);
              },
              onCancel: () => {},
            });
          } else {
            handleAddCategory(formValues);
          }
        }
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };

  const handleAddCategory = (formValues) => {
    if (category === null) {
      CategoryAPI.create({
        ...formValues,
        image: image,
        name: categoryName,
      })
        .then((result) => {
          dispatch(AddCategory(result.data.data));
          message.success("Thành công!");
          setModalOpen(false);
          form.resetFields();
          const newCategory = {
            id: result.data.data.id,
            name: categoryName,
            image: image,
          };
          onSave && onSave(newCategory);
          fetchData();
        })
        .catch((err) => {
          message.error("Lỗi: " + err.message);
        });
    } else {
      CategoryAPI.update(formValues, category.id)
        .then((response) => {
          dispatch(UpdateCategory(response.data.data));
          message.success("Thành công!");
          setModalOpen(false);
          form.resetFields();
          fetchData();
        })
        .catch((err) => {
          message.error("Lỗi: " + err.message);
        });
    }
  };

  const onCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const initialValues = {
    categoryStatus: "1",
    transactionRights: "1",
  };

  return (
    <>
      <Modal
        title="Thể loại mật ong"
        open={modalOpen}
        onCancel={onCancel}
        footer={null}
      >
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <Form
          id="addCategory"
          initialValues={initialValues}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <div
            onClick={() => {
              document.getElementById("select-avatar").click();
            }}
            className="image-container"
          >
            {image ? <img src={selectedImageUrl} alt="Chọn ảnh" /> : "Chọn ảnh"}
          </div>
          <input
            className="hidden-input"
            id="select-avatar"
            type="file"
            accept="image/*"
            onChange={(event) => handleFileInputChange(event)}
          />
          <span className="error errorImageMes">{errorImage}</span>
          <Form.Item label="Tên">
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <p className="error">{errorCategoryName}</p>
          </Form.Item>
          <Form.Item
            label="Phê duyệt"
            name="categoryStatus"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tùy chọn phê duyệt",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={"1"}>Không phê duyệt</Radio>
              <Radio value={"2"}>Cần phê duyệt</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Giao dịch"
            name="transactionRights"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tùy chọn giao dịch",
              },
            ]}
          >
            <Radio.Group>
              <Radio value={"1"}>Không giao dịch</Radio>
              <Radio value={"0"}>Được giao dịch</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              style={{ marginRight: "20px" }}
              onClick={onCancel}
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
    </>
  );
};

export default ModalThem;
