import React, { useState } from "react";
import { Button, Modal, Table, Tooltip, message } from "antd";
import { ChestGiftAPI } from "../../../apis/censor/chest-gift/chest-gift.api";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { GetGift, SetGift } from "../../../app/reducers/gift/gift.reducer";
import { AddChestGift } from "../../../app/reducers/chest-gift/chest-gift.reducer";
const ModalAddGiftToChest = (props) => {
  const { chest } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useAppDispatch();
  const columns = [
    {
      title: "Mã",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
  ];

  const fetchData = () => {
    ChestGiftAPI.getGiftNotJoinChest(chest.id).then((response) => {
      dispatch(SetGift(response.data.data));
    });
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setModalOpen(false);
  }; 
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: "checkbox",
  };

  const handleOnclick = () => {
    setModalOpen(true);
    fetchData();
  };

  const handleOk = () => {
    if (selectedRowKeys.length > 0) {
      Modal.confirm({
        title: "Bạn có chắc chắn muốn thêm vật phẩm vào rương không?",
        onOk: () => {
          ChestGiftAPI.addGiftToChest({
            chestId: chest.id,
            listGift: selectedRowKeys,
          })
            .then((response) => {
              dispatch(AddChestGift(response.config.data));
              fetchData();
              message.success("Thêm thành công.");
            })
            .catch((error) => {
              message.error("Thêm không thành công.");
            });
        }
      })
    }else{
      message.error("Vui lòng chọn vật phẩm !!!")
    }
  };
  const data = useAppSelector(GetGift);
  return (
    <>
      <Tooltip title="Thêm vật phẩm">
        <Button
          // className="add-button1"
          style={{ backgroundColor: "green" }}
          onClick={() => handleOnclick()}
        >
          <PlusCircleOutlined className="icon" style={{ color: "white" }} />
        </Button>
      </Tooltip>
      {modalOpen && 
      <Modal
        title="Vật phẩm"
        open={modalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
          <Table
            className="text-center"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey={"id"}
          pagination={{
            pageSize: 5,
          }}
        />
      </Modal>}
    </>
  );
};

export default ModalAddGiftToChest;
