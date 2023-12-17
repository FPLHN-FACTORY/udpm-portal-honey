import React, { useState, useEffect } from "react";
import { Modal, Input, message, Button } from "antd";
import { ChestAPI } from "../../../apis/censor/chest/chest.api";

const ModalAdd = (props) => {
  const { modalOpen, setModalOpen, chest } = props;
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    if (chest) {
      setItemName(chest.name);
    }
  }, [chest]);

  const onSaveSuccess = (result) => {
    // ChestAPI.fetchAll().then((response) => {
    //   dispatch(SetChest(response.data.data.data));
    // });
    message.success("Thành công!");
    setModalOpen(false);
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  const onSaveButtonClick = () => {
    if (itemName.trim() === "") {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const formValues = {
      name: itemName,
    };

    if (chest === null) {
      Modal.confirm({
        title: "Bạn có chắc chắn muốn thêm mới rương không?",
        onOk: () => {
          ChestAPI.create(formValues)
            .then(onSaveSuccess)
            .catch((err) => {
              message.error(err.response.data.message);
            });
        },
      });
    } else {
      Modal.confirm({
        title: "Bạn có chắc chắn muốn cập nhật rương không?",
        onOk: () => {
          ChestAPI.update(formValues, chest.id)
            .then(onSaveSuccess)
            .catch((err) => {
              message.error(err.response.data.message);
            });
        },
      });
    }
  };

  return (
    <div>
      <Modal
        className="admin-semeter"
        title="Rương"
        open={modalOpen}
        onCancel={onCancel}
        footer={null}
      >
        <hr className="border-0 bg-gray-300 mt-3 mb-6" />
        <div
          style={{
            maxWidth: 600,
          }}
        >
          <div className="item-custom">
            <div className="ant-form ant-form-horizontal">
              <div className="ant-form-item">
                <label className="ant-form-item-label">Tên:</label>
                <div className="ant-form-item-control">
                  <Input
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="ant-form-item mt-3">
              <div className="flex justify-center">
                <Button
                  onClick={onCancel}
                  className="submit-button submit-button-cancel bg-black text-white"
                >
                  Đóng
                </Button>
                <Button
                  onClick={onSaveButtonClick}
                  className="submit-button submit-button-ok ml-2 bg-black text-white"
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAdd;
