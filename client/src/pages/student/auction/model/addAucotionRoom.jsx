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
  Select,
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
  const [quantity, setQuantity] = useState(0);
  const [jump, setJump] = useState(0);
  const [startingPrice, setStartingPrice] = useState(0);
  const [categorySelect, setCategorySelect] = useState(null);
  const [listCategory, setListCategory] = useState([]);
  const loadListArchive = () => {
    ArchiveAPI.findAllUser(user.idUser).then((res) => {
      console.log(res.data.data);
      setListArchiveUser(res.data.data);
    });
  };
  
  const loadDataCategory = (idGift) => {
    ArchiveAPI.getCategoryByIdGift(idGift).then((res) => {
      setListCategory(res.data.data)
    });
  };

  // useEffect(() => {
  //   loadDataCategory();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (visible) {
      setQuantity(0);
      setJump(0);
      setStartingPrice(0);
      form.setFieldsValue({ time: 8 });
      setListCategory([]);
      loadListArchive();
      return () => {
        setArchiveGift(null);
        setQuantity(0);
        setJump(0);
        setStartingPrice(0);
        form.setFieldsValue({ time: 8 });
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const { time } = values;
        if (time === undefined) {
          message.error("Vui lòng chọn thời hạn");
          return;
        }
        if (categorySelect === undefined || categorySelect === null) {
          message.error("Vui lòng chọn thể loại");
          return;
        }
        if (!archiveGift) {
          message.error("Vui lòng chọn vật phẩm để đấu giá");
          return;
        }
        if (startingPrice === undefined || startingPrice <= 0) {
          message.error("Vui lòng nhập giá trị khởi điểm lớn hơn hoặc bằng 0");
          return;
        }
        if (startingPrice === undefined || quantity <= 0) {
          message.error(
            "Số lượng vật phẩm đấu giá là số nguyên dương lớn hơn 0"
          );
          return;
        }
          Modal.confirm({
            title: "Xác nhận",
            content: (
              <span>
                Bạn có muốn đấu giá{" "}
                <span style={{ color: "blue", fontWeight: "bold" }}>
                  {archiveGift?.nameGift}{" "}
                </span>
                không?
              </span>
            ),
            okText: "Đồng ý",
            cancelText: "Hủy",
            onOk: () => {
              
              const dataUpload = {
                idUser: user?.idUser,
                mail: user?.email,
                idGift: archiveGift?.idGift,
                jump,
                startingPrice,
                time,
                name: archiveGift?.nameGift,
                idCategory: categorySelect,
                quantity,
              };
              stompClientAll.send(
                `/action/add-auction`,
                {},
                JSON.stringify(dataUpload)
              );
            },
          });
      })
      .catch((errorInfo) => {
        console.error("Lỗi xảy ra:", errorInfo);
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
        loadDataCategory(item.idGift)
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
          <Form form={form}
            labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 14,
          }} >
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
                        <br />
                        
                        <Form.Item
                          className="w-full text-start"
                          label={
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Loại mật ong :
                            </span>
                          }
                          colon={false}
                        >
                        <Select
                            placeholder="Chọn thể loại"
                            onSelect={(el) => setCategorySelect(el)}
                        >
                          {listCategory?.map((item) => {
                            return (
                              <Select.Option value={item.id}>
                                {item.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                        </Form.Item>
                        <Row gutter={16}>
                          <Col span={10} className="text-end">
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Số lượng :
                            </span>
                          </Col>
                          <Col span={14}>
                            <Input
                              className="input-auction"
                              value={quantity}
                              onChange={(e) => {
                                const newValue = Math.max(
                                  0,
                                  parseInt(e.target.value) || 0
                                );
                                setQuantity(newValue);
                              }}
                              type="number"
                              min={0}
                              step={1}
                            />{" "}
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={10}  className="text-end">
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Giá khởi điểm :
                            </span>
                          </Col>
                          <Col span={14}>
                            <Input
                              className="input-auction"
                              value={startingPrice}
                              onChange={(e) => {
                                const newValue = Math.max(
                                  0,
                                  parseInt(e.target.value) || 0
                                );
                                setStartingPrice(newValue);
                              }}
                              type="number"
                              min={0}
                              step={1}
                            />{" "}
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col span={10}  className="text-end">
                            <span
                              style={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              Bước nhảy :
                            </span>
                          </Col>
                          <Col span={14}>
                            <Input
                              className="input-auction"
                              value={jump}
                              onChange={(e) => {
                                const newValue = Math.max(
                                  0,
                                  parseInt(e.target.value) || 0
                                );
                                setJump(newValue);
                              }}
                              type="number"
                              min={0}
                              step={1}
                            />{" "}
                          </Col>
                        </Row>
                        
                        <Form.Item
                          className="w-full text-start"
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
                        >
                          <Radio.Group className="ml-3"
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
