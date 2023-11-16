import { FormOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Tooltip } from "antd";
import { useState } from "react";
import moment from "moment";

const ModalDetail = (props) => {
  const { semester } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
    if (semester) {
      setItemName(semester.name);
      setToDate(moment(semester.toDate).format("YYYY-MM-DD"));
      setFromDate(moment(semester.fromDate).format("YYYY-MM-DD"));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="admin-semeter">
      <Tooltip title="Chi tiết">
        <Button
          className="detail-button"
          style={{ padding: "1px 0.7rem" }}
          onClick={showModal}
        >
          <FormOutlined className="icon" />
        </Button>
      </Tooltip>
      <Modal
        title="Chi tiết kỳ học"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div style={{ maxWidth: 600 }}>
          <div>
            <div className="ant-form-item">
              <label className="ant-form-item-label">Mã</label>
              <div className="ant-form-item-control">
                <Input value={semester?.code || ""} readOnly />
              </div>
            </div>

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
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  type="date"
                />
              </div>
            </div>

            <div className="ant-form-item">
              <label className="ant-form-item-label">Ngày kết thúc</label>
              <div className="ant-form-item-control">
                <Input
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  type="date"
                />
              </div>
            </div>

            <div className="ant-form-item">
              <div className="ant-form-item-control">
                <Button
                  type="primary"
                  onClick={handleCancel}
                  className="bg-#1d4ed8-400 text-white"
                >
                  Đóng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDetail;
