/* eslint-disable jsx-a11y/alt-text */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../app/hooks";
import { GetUser } from "../../../../app/reducers/users/users.reducer";
import { ArchiveAPI } from "../../../../apis/student/archive/ArchiveAPI";

export default function ModalAddAuction({
  visible,
  onOK,
  onCancel,
  stompClientAll,
}) {
  const [form] = Form.useForm();
  const user = useAppSelector(GetUser);
  const [listArchiveUser, setListArchiveUser] = useState([]);
  const [archiveGift, setArchiveGift] = useState(null);

  const loadListArchive = () => {
    ArchiveAPI.findAllUser(user.idUser).then((res) => {
      setListArchiveUser(res.data.data);
    });
  };

  useEffect(() => {
    loadListArchive();
  }, [visible]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        return new Promise((resolve, reject) => {
          Modal.confirm({
            title: "Xác nhận",
            content: (
              <span>
                Bạn có muốn đấu giá{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  {archiveGift.nameGift}{" "}
                </span>
                không ?
              </span>
            ),
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => resolve(values),
            onCancel: () => reject(),
          });
        });
      })
      .then((values) => {
        // Lấy giá trị từ form khi người dùng đã hoàn thành
        const { startingPrice, time, jump } = values;
        if (startingPrice === undefined) {
          message.error("Vui lòng nhập giá trị khởi điểm hợp lệ.");
          return;
        } else if (isNaN(Number(startingPrice)) || Number(startingPrice) < 0) {
          message.error("Vui lòng nhập giá trị khởi điểm lớn hơn hoặc bằng 0.");
          return;
        }

        if (time === undefined) {
          message.error("Vui lòng thời hạn.");
          return;
        }

        if (archiveGift === null) {
          message.error("Vui lòng chọn vật phẩm để đấu giá.");
          return;
        }
        const dataUpload = {
          idUser: user.idUser,
          idGift: archiveGift.idGift,
          jump: jump,
          startingPrice: startingPrice,
          time: time,
          name: archiveGift.nameGift,
          idCategory: archiveGift.idCategory,
        };
        stompClientAll.send(
          `/action/add-auction`,
          {},
          JSON.stringify(dataUpload)
        );
        onOK();
        form.resetFields();
        message.success("Tạo đấu giá thành công.");
      })
      .catch((errorInfo) => {
        console.log("Lỗi xảy ra:", errorInfo);
      });
  };

  const handleArchiveGift = (item) => {
    Modal.confirm({
      title: "Xác nhận",
      content: (
        <span>
          Bạn có muốn đấu giá món đồ{" "}
          <span style={{ color: "blue", fontWeight: "bold" }}>
            {item.nameGift}
          </span>
          ?
        </span>
      ),
      okText: "Đồng ý",
      cancelText: "Hủy",
      onOk: () => {
        setArchiveGift(item);
      },
    });
  };

  return (
    <>
      <Modal
        open={visible}
        onOk={onOK}
        onCancel={onCancel}
        footer={null}
        width={1000}
        closeIcon={<span className="custom-close-icon">X</span>}
      >
        <div
          className="modal-create-auction"
          style={{ minWidth: "800px", Height: "1000px" }}
        >
          <Form form={form}>
            <Card>
              <div className="bar-transaction" />
              <Row
                style={{
                  padding: "5px 15px 0px 15px",
                }}
              >
                <Col span={12}>
                  <div className="tag-backgroup">
                    <b className="text-title"></b>
                  </div>
                </Col>
                <Col span={12} className="col-title-balo">
                  <div>
                    <b className="title-balo">
                      <img
                        className="img-balo"
                        height={"30px"}
                        src={require("../../../../assets/images/balo-student.png")}
                        alt="balo"
                      />
                      TÚI ĐỒ
                    </b>
                  </div>
                </Col>
              </Row>
              <Row className="row-content">
                <Col span={7} className="chest-transaction">
                  <Row className="row-items">
                    <Col span={4}>
                      <div className="chess-square-note">
                        {archiveGift === null ? (
                          <div>
                            <div className="item">
                              <img
                                src={require("../../../../assets/images/ui-student/avata-item.png")}
                                alt=""
                              />
                            </div>
                            <span className="name-item">Siêu nhân đỏ</span>
                          </div>
                        ) : (
                          <div>
                            <div className="item">
                              <img 
                                src={archiveGift.image}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <span className="name-item">
                              {archiveGift.nameGift}
                            </span>
                          </div>
                        )}

                        <hr
                          style={{
                            height: "2px",
                            width: "85%",
                            backgroundColor: "black",
                          }}
                        />

                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Giá khởi điểm :
                            </span>
                          }
                          colon={false}
                          name="startingPrice"
                          style={{ marginTop: "30px" }}
                        >
                          <Input type="number" className="input-auction" />
                        </Form.Item>
                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Bước nhảy :
                            </span>
                          }
                          colon={false}
                          name="jump"
                        >
                          <Input type="number" className="input-auction" />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Thời hạn :
                            </span>
                          }
                          colon={false}
                          name="time"
                          style={{ marginRight: "auto", marginLeft: "0px" }}
                        >
                          <Radio.Group
                            style={{ marginLeft: "5px", marginTop: "30%" }}
                          >
                            <Space direction="vertical">
                              <Radio value={8}>08 giờ</Radio>
                              <Radio value={16}>16 giờ</Radio>
                              <Radio value={24}>24 giờ</Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>

                        <div className="div-button">
                          <Button
                            type="primary"
                            htmlType="submit"
                            className="button-xac-nhan"
                            onClick={handleSubmit}
                          >
                            Tạo bàn
                          </Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col span={17}>
                  <Row className="row-chest">
                    {listArchiveUser.length <= 0 ? (
                      <Col span={24} style={{ textAlign: "center" }}>
                        <div className="item">
                          <img
                            style={{
                              width: "70%",
                              height: "70%",
                              marginTop: "80px",
                            }}
                            src="https://bizweb.dktcdn.net/100/368/179/themes/738982/assets/empty-cart.png?1655829755743"
                            alt="Ảnh mặc định"
                          />
                        </div>
                      </Col>
                    ) : (
                      listArchiveUser.map((square) => (
                        <Col key={square} span={4}>
                          <div
                            className="chess-square"
                            onClick={() => handleArchiveGift(square)}
                          >
                            <div className="item">
                              {square.image == null ? (
                                <img
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                  src="https://png.pngtree.com/png-clipart/20230328/ourlarge/pngtree-game-item-box-png-image_6671647.png"
                                  alt="Ảnh mặc định"
                                />
                              ) : (
                                <img
                                  src={square.image}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </Col>
                      ))
                    )}
                  </Row>
                </Col>
              </Row>
            </Card>
          </Form>
        </div>
      </Modal>
    </>
  );
}
