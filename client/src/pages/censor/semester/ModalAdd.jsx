import React, { useState, useEffect } from "react";
import { Modal, Input, message, Select } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { SemesterAPI } from "../../../apis/censor/semester/semester.api";
import {
  AddSemester,
  UpdateSemester,
} from "../../../app/reducers/semester/semester.reducer";
import "./index.css";
import moment from "moment/moment";

const ModalAdd = (props) => {
  const { modalOpen, setModalOpen, semester, fetchAll } = props;

  const [itemName, setItemName] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [errorItemName, setErrorItemName] = useState("");
  const [errorFromDate, setErrorFromDate] = useState("");
  const [errorToDate, setErrorToDate] = useState("");
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("0");
  const dispatch = useAppDispatch();
  const { Option } = Select;
  useEffect(() => {
    listsemester();
    if (semester) {
      setItemName(semester.name);
      setStatus(semester.status);
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
    fetchAll();
  };

  const listsemester = () => {
    SemesterAPI.fetchAllSemester().then((result) => {
      setList(result.data.data);
    });
  };

  const onSaveError = (error) => {
    console.log("Error Response:", error.response); // Hiển thị thông tin lỗi
    if (error.response && error.response.data && error.response.data.message) {
      message.error(error.response.data.message);
    } else {
      message.error("Lỗi.");
    }
  };

  const onCancel = () => {
    setModalOpen(false);
  };

  const onSaveButtonClick = () => {
    let check = 0;
    if (itemName.trim().length === 0) {
      setErrorItemName("Tên học kỳ không được để trống");
      check++;
    } else {
      if (itemName.trim().length > 225) {
        setErrorItemName("Tên học kỳ không quá 100 ký tự");
        check++;
      } else {
        setErrorItemName("");
      }
    }
    if (toDate.trim().length === 0) {
      setErrorToDate("Ngày bắt đầu không được để trống");
      check++;
    } else {
      setErrorToDate("");
    }
    if (fromDate.trim().length === 0) {
      setErrorFromDate("Ngày kết thúc không được để trống");
      check++;
    } else {
      setErrorFromDate("");
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (startDate >= endDate) {
      message.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc.");
      check++;
      return;
    }

    if (semester) {
      for (const existingSemester of list) {
        const existingStartDate = new Date(existingSemester.fromDate);
        const existingEndDate = new Date(existingSemester.toDate);

        if (
          (startDate >= existingStartDate && startDate <= existingEndDate) ||
          (endDate >= existingStartDate && endDate <= existingEndDate)
        ) {
          message.error(
            "Thời gian học kỳ mới không thể trùng hoặc nằm trong khoảng của học kỳ khác."
          );
          check++;
          return;
        }
      }
    } else {
      // for (const existingSemester of list) {
      //   const existingStartDate = new Date(existingSemester.fromDate);
      //   const existingEndDate = new Date(existingSemester.toDate);
      //   if (startDate >= existingStartDate && endDate <= existingEndDate) {
      //     message.error(
      //       "Học kỳ mới không được nằm trong khoảng thời gian của học kỳ khác."
      //     );
      //     check++;
      //     return;
      //   }
      //   if (startDate <= existingStartDate && endDate >= existingEndDate) {
      //     message.error(
      //       "Học kỳ mới không được chứa khoảng thời gian của học kỳ hiện tại."
      //     );
      //     check++;
      //     return;
      //   }
      // }
    }

    const formValues = {
      name: itemName,
      toDate: endDate.getTime(),
      fromDate: startDate.getTime(),
      status: status,
    };

    if (check === 0) {
      if (semester === null) {
        SemesterAPI.create(formValues).then(onSaveSuccess).catch(onSaveError);
      } else {
        SemesterAPI.update(formValues, semester.id)
          .then(onSaveSuccess)
          .catch(onSaveError);
      }
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
                  <p className="error">{errorItemName}</p>
                </div>
              </div>

              <div className="ant-form-item">
                <label className="ant-form-item-label">Ngày bắt đầu</label>
                <div className="ant-form-item-control">
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                  <p className="error">{errorToDate}</p>
                </div>
              </div>

              <div className="ant-form-item">
                <label className="ant-form-item-label">Ngày kết thúc</label>
                <div className="ant-form-item-control">
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                  <p className="error">{errorFromDate}</p>
                </div>
              </div>
            </div>

            <Select
              value={status} // Giá trị mặc định
              onChange={(value) => setStatus(value)}
              style={{ width: "100%" }}
              placeholder="Chọn trạng thái"
            >
              <Option value="0">Hoạt động</Option>
              <Option value="2">Chưa hoạt động</Option>
            </Select>

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
