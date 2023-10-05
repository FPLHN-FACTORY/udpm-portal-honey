import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../../app/hooks';
import { AddChest, UpdateChest } from '../../../app/reducers/chest/chest.reducer';
import { Input, Modal, message } from 'antd';
import { ChestAPI } from '../../../apis/censor/chest/chest.api';

export default function ModalAddChest(props) {
    const { modalOpen, setModalOpen, chest } = props;
    const [itemName, setItemName] = useState("");
    const [percent, setPercent] = useState();
  
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (chest) {
        setItemName(chest.name);
        setPercent(chest.percent);
      }
    }, [chest]);
  
    const onSaveSuccess = (result) => {
      if (chest === null) {
        dispatch(AddChest(result.data.data));
      } else {
        dispatch(UpdateChest(result.data.data));
      }
      message.success("Thành công!");
      setModalOpen(false);
    };
  
    const onSaveError = (err) => {
      message.error("Lỗi: " + err.message);
    };
  
    const onCancel = () => {
      setModalOpen(false);
    };
  
    const onSaveButtonClick = () => {
      if (itemName.trim() === "" || percent === null) {
        message.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }
  
      const formValues = {
        name: itemName,
        percent: percent,
      };
  
      if (chest === null) {
        ChestAPI.create(formValues).then(onSaveSuccess).catch(onSaveError);
      } else {
        console.log(formValues);
        ChestAPI.update(formValues, chest.id)
          .then(onSaveSuccess)
          .catch(onSaveError);
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
  
                <div className="ant-form-item">
                  <label className="ant-form-item-label">Tỉ lệ:</label>
                  <div className="ant-form-item-control">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={percent}
                      onChange={(e) => setPercent(e.target.value)}
                    />
                  </div>
                </div>
              </div>
  
              <div className="ant-form-item">
                <div className="ant-form-item-control">
                  <button
                    onClick={onCancel}
                    className="submit-button submit-button-cancel"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={onSaveButtonClick}
                    className="submit-button submit-button-ok"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
}
