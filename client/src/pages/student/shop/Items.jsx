import { Button, Col, InputNumber, Modal, message } from "antd";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import "./item.css";
import "./shop-gift.css";
import { BuyItem } from "../../../apis/student/buyItem/ButItem";
import { StarTwoTone } from "@ant-design/icons";

function ImageRenderer({ image }) {
  if (image) {
    // Chuyển đổi chuỗi byte thành mảng byte
    const byteArray = image.split(",").map(Number);

    // Tạo một Uint8Array từ mảng byte
    const uint8Array = new Uint8Array(byteArray);

    // Chuyển đổi Uint8Array thành Blob
    const blob = new Blob([uint8Array], { type: "image/jpeg" });

    // Tạo URL dữ liệu từ Blob
    const imageUrl = URL.createObjectURL(blob);

    return (
      <img
        src={imageUrl}
        style={{ width: "100px", height: "100px" }}
        alt="Hình ảnh"
      />
    );
  } else {
    return <div>Chưa có ảnh</div>; // Xử lý trường hợp không có hình ảnh
  }
}
const Items = memo(({ filteredItem, fillPoint, updatePoints }) => {
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [fillUserApi, setFillUserApi] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [cardBackgroundColor, setCardBackgroundColor] = useState("#F8DA95");

  const [initialQuantity, setInitialQuantity] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (selectedConversion) {
      setInitialQuantity(selectedConversion.quantity);
    }
  }, [selectedConversion]);

  useEffect(() => {
    fechUserApiById();
  }, []);

  const fechUserApiById = () => {
    BuyItem.getUserAPiByid().then((response) => {
      setFillUserApi({
        ...response.data.data,
        khoa: "17.3",
        phone: "0763104018",
      });
    });
  };

  const handleAddToComboBox = (conversion, index) => {
    setSelectedConversion(conversion);
    if (selectedCardIndex === index) {
      setSelectedCardIndex(-1);
      setCardBackgroundColor("#F8DA95");
    } else {
      setSelectedConversion(conversion);
      setSelectedCardIndex(index);
      setCardBackgroundColor("#CCCC99");
    }
  };

  const onSubmitCreate = () => {
    handleCancel();
    if (!selectedConversion) {
      message.error("Vui lòng chọn một mục trong danh sách chọn");
      return;
    } else if (
      (selectedConversion ? selectedConversion.honey * quantity : 0) >
      fillPoint.point
    ) {
      message.error("Bạn không đủ điểm để đổi quà trong ranh này.");
      return;
    }
    if (selectedConversion.quantity != null) {
      if (quantity > selectedConversion.quantity) {
        message.error("Quà không còn đủ số lượng bạn cần");
        return;
      }
    }

    const dataToAdd = {
      honeyId: fillPoint.id,
      studentId: fillUserApi.idUser,
      honeyPoint: parseInt(selectedConversion ? selectedConversion.honey : 0),
      giftId: selectedConversion ? selectedConversion.id : 0,
      nameGift: selectedConversion.name,
      categoryId: selectedConversion ? selectedConversion.categoryId : 0,
      idArchive: fillUserApi.idUser,
      quantity: quantity,
    };
    createRequest(dataToAdd);
  };

  const createRequest = (addRequest) => {
    BuyItem.createRequest(addRequest)
      .then((response) => {
        if (response.data.success) {
          message.success("Đổi quà thành công");
          if (
            selectedConversion &&
            selectedConversion.status === 0 &&
            selectedConversion.quantity !== null
          ) {
            setSelectedConversion({
              ...selectedConversion,
              quantity: initialQuantity - quantity,
            });
          }
          if (selectedConversion.status === 0) {
            updatePoints(fillPoint.point - selectedConversion.honey * quantity);
          }
        } else {
          message.error("Số lượng mật ong không đủ!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleQuantityChange = (value) => {
    if (isNaN(value) || value <= 0) {
      setError("Giá trị không hợp lệ");
    } else {
      setError(null);
      setQuantity(value);
    }
  };

  return (
    <section className="shop__gift">
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={null}
        footer={null}
        width={350}
        className="css-modal-confim-buy-item"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ fontSize: "16px", color: "white", fontWeight: 700 }}>
            Bạn có xác nhận mua quà không ?
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Button
            type="primary"
            className="btn-xac-nhan"
            onClick={onSubmitCreate}
          >
            xác nhận
          </Button>
          <Button type="primary" className="btn-huy" onClick={handleCancel}>
            Hủy
          </Button>
        </div>
      </Modal>
      <div className="item__list" gutter={16}>
        {filteredItem.map((item, index) => (
          <Col span={6} key={index}>
            <div
              className={`item__card`}
              onClick={() => {
                handleAddToComboBox(item, index);
              }}
              style={{
                borderColor:
                  selectedCardIndex === index ? cardBackgroundColor : "",
                boxShadow:
                  selectedCardIndex === index ? "0px 0px 10px gold" : "",
              }}
            >
              <div className="card__image">
                <ImageRenderer image={item.image} />
              </div>
              {item.status === 1 ? (
                <StarTwoTone
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "20px",
                    fontSize: "18px",
                    color: "red",
                  }}
                />
              ) : null}
              <div style={{ marginTop: "40px", color: "white" }}></div>
              <div className="card__body">
                <h3>{item.name}</h3>
                <div className="card__body__honey">
                  <img
                    src="https://servreality.com/wp-content/uploads/2022/10/game-coin-a-good-investment.png"
                    atl="image"
                  />
                  <span>{item.honey}</span>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </div>
      {selectedConversion && selectedCardIndex > -1 && (
        <div className="item__detail">
          <div className="detail__header">
            <div className="item__detail__image">
              <ImageRenderer image={selectedConversion.image} />
            </div>
            <div class="item__detail__body">
              <h3 title="Ba lô siêu vip">{selectedConversion.name}</h3>{" "}
              <p>Mật ong: {selectedConversion.honey}</p>{" "}
              <span>
                Số lượng: {initialQuantity == null ? "Vô hạn" : initialQuantity}
              </span>
              <p>
                {selectedConversion.status === 1
                  ? "Cần phê duyệt"
                  : "Không phê duyệt"}
              </p>{" "}
            </div>
          </div>

          {selectedConversion && (
            <div className="detail__text">
              <span>{selectedConversion.note}</span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InputNumber
              className="quantity-gift-inside"
              min={1}
              max={1000}
              defaultValue={1}
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          {error && (
            <div
              className="error-message"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {error}
              </span>
            </div>
          )}
          <Button className="detail__button" onClick={showModal}>
            Mua vật phẩm
          </Button>
        </div>
      )}
    </section>
  );
});

export default Items;
