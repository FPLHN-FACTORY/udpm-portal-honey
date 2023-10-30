import { Button, Col, InputNumber, message } from "antd";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import "./item.css";
import "./shop-gift.css";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
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
const Gift = memo(({ filteredConversions, fillPoint, updatePoints }) => {
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [fillUserApi, setFillUserApi] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [cardBackgroundColor, setCardBackgroundColor] = useState("#F8DA95");
  const [initialQuantity, setInitialQuantity] = useState(null);
  useEffect(() => {
    fechUserApiById();
  }, []);

  useEffect(() => {
    if (selectedConversion) {
      setInitialQuantity(selectedConversion.quantity);
    }
  }, [selectedConversion]);

  const fechUserApiById = () => {
    ResquestConversion.getUserAPiByid().then((response) => {
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
    if (!selectedConversion) {
      message.error("Vui lòng chọn một mục trong danh sách chọn");
      return;
    }
    if (
      (selectedConversion.honey ? selectedConversion.honey : 0) >
      fillPoint.point
    ) {
      message.error("Bạn không đủ điểm để đổi quà trong ranh này.");
      return;
    }
    if (selectedConversion.quantity != null) {
      if (quantity > initialQuantity) {
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
    ResquestConversion.createRequest(addRequest)
      .then((response) => {
        if (response.data.success) {
          message.success("Đổi quà thành công");
          if (
            selectedConversion &&
            initialQuantity !== null &&
            selectedConversion.status === 0
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
          message.error("Bạn không đủ điểm để đổi quà trong ranh này!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleQuantityChange = (value) => {
    // if (isNaN(value) || value <= 0) {
    //   message.error("Giá trị không hợp lệ");
    // } else {

    // }
    setQuantity(value);
  };
  return (
    <section className="shop__gift">
      <div className="item__list" gutter={16}>
        {filteredConversions.map((item, index) => (
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
          <div className="quantity-gift">
            <InputNumber
              className="quantity-gift-inside"
              min={0}
              max={500}
              defaultValue={0}
              value={quantity}
              onChange={handleQuantityChange}
              // onBlur={handleQuantityChange}
            />
          </div>
          <Button className="detail__button" onClick={onSubmitCreate}>
            Mua quà
          </Button>
        </div>
      )}
    </section>
  );
});

export default Gift;
