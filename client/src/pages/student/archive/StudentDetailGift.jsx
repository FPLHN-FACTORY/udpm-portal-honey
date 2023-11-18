import { message, Modal } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import React, { useEffect } from "react";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { SetGiftArchive } from "../../../app/reducers/archive-gift/gift-archive.reducer";

const DetailArchiveGift = (props) => {
  const { archivegift, filter, modalVisible, setModalVisible } = props;
  const dispatch = useAppDispatch();
  const [note, setNote] = useState("");

  useEffect(() => {
    detailArchiveGift();
  }, []);

  const fetchData = () => {
    ArchiveAPI.getArchive(filter).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
    });
  };

  const detailArchiveGift = () => {
    ArchiveAPI.detail(archivegift.id).then((response) => {
      setNote(response.data.data.note);
    });
  };

  const deleteGift = () => {
    ArchiveAPI.delete(archivegift.id).then(
      (response) => {
        fetchData();
        message.success("Sử dụng thành công");
      },
      (err) => {
        message.error("Sử dụng thất bại");
      }
    );
  };
  const handelOk = (e) => {
    deleteGift();
  };

  return (
    <div>
      <Modal
        title="Thông tin"
        open={modalVisible}
        onOk={() => {
          handelOk();
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      >
        <TextArea
          rows={4}
          value={note}
          disabled
          style={{
            backgroundColor: "#f0f0f0",
            color: "#888",
            border: "1px solid #d9d9d9",
            textAlign: "center",
          }}
        />
      </Modal>
    </div>
  );
};
export default DetailArchiveGift;
