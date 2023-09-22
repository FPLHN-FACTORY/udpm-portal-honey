import React, { useState, useEffect } from "react";
import { Modal, Input, message } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { SemesterAPI } from "../../../apis/censor/semester/semester.api";
import {
  AddSemester,
  UpdateSemester,
} from "../../../app/reducers/semester/semester.reducer";
import "./index.css";
import moment from "moment/moment";

const ModalAdd = (props) => {
  const { modalOpen, setModalOpen, semester } = props;
  const [itemName, setItemName] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (semester) {
      setItemName(semester.name);
      setToDate(moment(semester.toDate).format("YYYY-MM-DD"));
      setFromDate(moment(semester.fromDate).format("YYYY-MM-DD"));
    }
  }, [semester]);

  const onSaveSuccess = (result) => {
    if (semester === null) {
      dispatch(AddSemester(result.data.data));
    } else {
      dispatch(UpdateSemester(result.data.data));
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
    if (
      itemName.trim() === "" ||
      toDate.trim() === "" ||
      fromDate.trim() === ""
    ) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const startDate = new Date(toDate);
    const endDate = new Date(fromDate);

    if (startDate >= endDate) {
      message.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc.");
      return;
    }

    const formValues = {
      name: itemName,
      toDate: startDate.getTime(),
      fromDate: endDate.getTime(),
    };

    if (semester === null) {
      SemesterAPI.create(formValues).then(onSaveSuccess).catch(onSaveError);
    } else {
      SemesterAPI.update(formValues, semester.id)
        .then(onSaveSuccess)
        .catch(onSaveError);
      console.log(semester.id);
    }
  };

  return (
    <div>
      <Modal
        className="admin-semeter"
        title="Kỳ học"
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
                <label className="ant-form-item-label">Tên</label>
                <div className="ant-form-item-control">
                  <Input
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
              </div>

              <div className="ant-form-item">
                <label className="ant-form-item-label">Ngày bắt đầu</label>
                <div className="ant-form-item-control">
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="ant-form-item">
                <label className="ant-form-item-label">Ngày kết thúc</label>
                <div className="ant-form-item-control">
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
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
};

export default ModalAdd;
