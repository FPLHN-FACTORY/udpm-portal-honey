import React, { useState } from "react";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  SetChestGift,
  GetChestGift,
} from "../../../app/reducers/chest-gift/chest-gift.reducer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PushGift } from "../../../app/reducers/gift/gift.reducer";
const ModalDetail = (props) => {
  const { chest } = props;
  const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "toDate",
      key: "toDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "fromDate",
      key: "fromDate",
    },
  ];

  const fetchData = async () => {
    ChestGiftAPI.getChestGift(chest.id).then((response) => {
      const formattedData = response.data.data.map((item) => ({
        ...item,
        toDate: moment(item.toDate).format("DD/MM/YYYY"),
        fromDate: moment(item.fromDate).format("DD/MM/YYYY"),
      }));
      dispatch(SetChestGift(formattedData));
    });
  };

  const dataChest = useAppSelector(GetChestGift);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleOnClick = () => {
    setModalVisible(true);
    fetchData();
  };

  const handleDeleteSelected = async () => {
    try {
      ChestGiftAPI.deleteGift({
        chestId: chest.id,
        listGift: selectedRowKeys,
      }).then((response) => {
        dispatch(PushGift(response.data.data));
        fetchData();
        setSelectedRowKeys([]);
        message.success("Xóa thành công.");
      });
    } catch (error) {
      message.error("Xóa thất bại.");
      console.error("Error deleting data:", error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedRowKeys([]);
  }

  return (
    <div>
      <Tooltip title="Mở rương">
        <Button
          className="detail-button"
          style={{ padding: "1px 0.7rem" }}
          onClick={() => handleOnClick()}
        >
          <EyeOutlined className="icon" />
        </Button>
      </Tooltip>
      <Modal
        title="Vật phẩm"
        open={modalVisible}
        onOk={() => {
          setModalVisible(false);
        }}
        onCancel={() => handleCancel()}
      >
        <div>
          <Button
            type="primary"
            onClick={handleDeleteSelected}
            style={{ marginBottom: "10px" }}
            disabled={!hasSelected}
          >
            Xóa
          </Button>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataChest}
          rowKey="id"
        />
      </Modal>
    </div>
  );
};
export default ModalDetail;
