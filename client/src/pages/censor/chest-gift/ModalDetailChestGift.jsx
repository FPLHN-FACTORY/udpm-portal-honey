import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { EyeOutlined } from "@ant-design/icons";
import moment from "moment";
const ModalDetail = (props) => {
  const { chest } = props;
  const [dataChest, setDataChest] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "To date",
      dataIndex: "toDate",
      key: "toDate",
    },
    {
      title: "From date",
      dataIndex: "fromDate",
      key: "fromDate",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [chest.id]);

  const fetchData = async () => {
    ChestGiftAPI.getChestGift(chest.id).then((response) => {
      const formattedData = response.data.data.map((item) => ({
        ...item,
        toDate: moment(item.toDate).format("DD/MM/YYYY"),
        fromDate: moment(item.fromDate).format("DD/MM/YYYY"),
      }));
      setDataChest(formattedData);
    });
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleDeleteSelected = async () => {
    try {
      ChestGiftAPI.deleteGift({
        chestId: chest.id,
        listGift: selectedRowKeys,
      }).then((response) => {
        fetchData();
        setSelectedRowKeys([]);
        message.success("Xóa thành công.");
      });
    } catch (error) {
      message.error("Xóa thất bại.");
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <Tooltip title="Mở rương">
        <Button
          className="detail-button"
          style={{ padding: "1px 0.7rem" }}
          onClick={() => setModalVisible(true)}
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
        onCancel={() => setModalVisible(false)}
      >
        <div>
          <Button
            type="primary"
            onClick={handleDeleteSelected}
            style={{ marginBottom: "10px" }}
            disabled={!hasSelected}
            loading={loading}
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
