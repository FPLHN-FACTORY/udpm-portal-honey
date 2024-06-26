import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Modal, Radio, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { CategoryAPI } from "../../../apis/censor/category/category.api";
import { useAppDispatch } from "../../../app/hooks";
import { UpdateCategory } from "../../../app/reducers/category/category.reducer";
const ModalDetail = (props) => {
  const { category, fetchData } = props;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [image, setImage] = useState(null);
  const [errorImage, setErrorImage] = useState("");

  useEffect(() => {
    if (category.image) {
      setSelectedImageUrl(category.image);
    }
  }, [category]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  form.setFieldsValue(category);

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
  const dispatch = useAppDispatch();
  form.setFieldsValue(category);

  const onFinish = () => {
    form
      .validateFields()
      .then((formValues) => {
        let check = 0;
        if (selectedImageUrl.length === 0) {
          setErrorImage("Ảnh không được để trống");
          check++;
        } else {
          setErrorImage("");
        }

        if (check > 0) {
          return;
        }

        if (formValues.transactionRights === "0") {
          // If transactionRights is 0, show confirmation modal
          Modal.confirm({
            title: "Chú ý",
            content:
              "Bạn có chắc chắn muốn cập nhật thể loại này có thể giao dịch không?",
            onOk: () => {
              handleUpdateCategory(formValues);
            },
            onCancel: () => {
              // Do nothing on cancel
            },
          });
        } else {
          // If transactionRights is 1, directly update the category
          handleUpdateCategory(formValues);
        }
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin.");
      });
  };

  const handleUpdateCategory = (formValues) => {
    CategoryAPI.update({ ...formValues, image: image }, category.id)
      .then((response) => {
        dispatch(UpdateCategory(response.data.data));
        message.success("Thành công!");
        setIsModalOpen(false);
        form.resetFields();
        fetchData();
      })
      .catch((err) => {
        message.error("Lỗi: " + err.message);
      });
  };
  return (
    <>
      <Tooltip title="Chi tiết">
        <Button
          style={{
            backgroundColor: "yellowgreen",
            color: "white",
          }}
          onClick={showModal}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </Tooltip>
      <Modal
        title="Chi tiết thể loại"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          id="detailCategory"
          form={form}
          name="basic"
          onFinish={onFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
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

          <Form.Item label="Mã" name="code">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Tên" name="name">
            <Input />
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
                message: "Vui lòng chọn tùy chọn phê duyệt",
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
              onClick={handleCancel}
              className="submit-button bg-black text-white"
            >
              Đóng
            </Button>
            <Button
              htmlType="submit"
              className="submit-button ml-2 bg-black text-white"
            >
              OK
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDetail;
