import { Button, Card, Input, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClubAPI } from "../../../apis/censor/club/club.api";
import ModalGift from "./ModalGift";
import TableGift from "./TableGift";

const DetailClub = () => {
  const { id } = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [club, setClub] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    form.setFieldsValue(club);
  }, [club]);

  const fetchData = () => {
    ClubAPI.detail(id).then((response) => {
      setClub(response.data.data);
    });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Card className="px-10 pt-5 mb-2">
        <h1
          style={{ fontSize: "22px", marginTop: "-20px", textAlign: "center" }}
        >
          Câu Lạc Bộ:{" "}
        </h1>
        <Form name="basic" labelAlign="left" form={form}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <Form.Item label="Mã câu lạc bộ" name="code">
                <Input
                  readOnly
                  style={{
                    marginLeft: "10px",
                    width: "300px",
                    fontWeight: "bold",
                  }}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="Tên câu lạc bộ" name="name">
                <Input
                  readOnly
                  style={{ marginLeft: "10px", width: "300px" }}
                />
              </Form.Item>
            </div>
          </div>

          <Form.Item>
            <div>
              <Button type="primary" onClick={showModal}>
                Thêm vật phẩm cho CLB
              </Button>
              <ModalGift visible={modalVisible} onCancel={handleCancel} />
            </div>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <TableGift />
      </Card>
    </>
  );
};
export default DetailClub;
