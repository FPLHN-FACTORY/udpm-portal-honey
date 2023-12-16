import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { AddChest } from "../../../app/reducers/chest/chest.reducer";
import { Button, Input, Modal, message } from "antd";
import { RandomAddPointAPI } from "../../../apis/censor/random-add-point/random-add-point.api";
import { ChestAPI } from "../../../apis/censor/chest/chest.api";

export default function ModalAddChest(props) {
  const { modalOpen, setModalOpen, chest } = props;
  const [itemName, setItemName] = useState("");
  const [errorChest, setErrorChest] = useState("");
  const [listNameChest, setListNameChest] = useState([]);

  const dispatch = useAppDispatch();

  const getAllNameChest = () => {
    RandomAddPointAPI.getAllNameChest().then((result) => {
      setListNameChest(result.data.data);
    });
  };

  useEffect(() => {
    getAllNameChest();
    if (chest) {
      setItemName(chest.name);
    }
  }, [chest]);

  const handleValidate = () => {
    let check = 0;
    const errors = {
      nameChest: "",
    };

    if (itemName.trim() === "") {
      errors.nameChest = "Không được để trống tên";
    } else if (listNameChest.includes(itemName)) {
      errors.nameChest = "Tên rương đã tồn tại";
    } 
    // else if (/[^a-zA-Z0-9_\s]+/.test(itemName)) {
    //   errors.nameChest = "Tên rương không được chứa ký tự đặc biệt";
    // }

    for (const key in errors) {
      if (errors[key]) {
        check++;
      }
    }

    setErrorChest(errors.nameChest);
    return check;
  };

  const onSaveSuccess = (result) => {
    dispatch(AddChest(result.data.data));
    message.success("Thành công!");
    setModalOpen(false);
  };

  const onSaveError = (err) => {
    if (err && err.message) {
      message.error("Lỗi: " + err.message);
    }
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  const onSaveButtonClick = () => {
    const check = handleValidate();

    if (check < 1) {
      const formValues = {
        name: itemName,
      };
      ChestAPI.create(formValues).then(onSaveSuccess).catch(onSaveError);
    } else {
      onSaveError();
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
                    maxLength={100}
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <span className="text-danger">{errorChest}</span>
                </div>
              </div>
            </div>

            <div className="ant-form-item">
              <div className="ant-form-item-control mt-5 ml-36">
                <Button
                  onClick={onCancel}
                  className="submit-button submit-button-ok ml-2 bg-black text-white"
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
}
