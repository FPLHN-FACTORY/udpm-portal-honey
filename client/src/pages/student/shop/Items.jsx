import { Button, Card, Col, Form, Row, Tabs, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./item.css";
import "./shop-gift.css";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
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
const Items = memo(({ filteredItem }) => {
  const [fillCategory, setFillCategory] = useState([]);
  const [fillGift, setFillGift] = useState([]);
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [fillUserApi, setFillUserApi] = useState([]);
  const [fillPoint, setFillPoint] = useState({ point: 0 });
  const [categoryType, setCategoryType] = useState();

  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const [cardBackgroundColor, setCardBackgroundColor] = useState("#F8DA95");
  const [categoryStatus, setCategoryStatus] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(0);

  const fechGift = () => {
    BuyItem.fetchAllGift().then((response) => {
      setFillGift(response.data.data);
    });
  };
  const handleTabClick = (index) => {
    setIsActive(index);
  };

  useEffect(() => {
    fechCategory();
    fechGift();
  }, []);

  useEffect(() => {
    fechUserApiById();
  }, []);

  const getPoint = (data) => {
    BuyItem.getPointHoney(data)
      .then((response) => {
        setFillPoint(response.data.data ? response.data.data : "0");
      })
      .catch((error) => console.log(error));
  };

  const fechUserApiById = () => {
    BuyItem.getUserAPiByid().then((response) => {
      setFillUserApi({
        ...response.data.data,
        khoa: "17.3",
        phone: "0763104018",
      });
    });
  };

  const fechCategory = () => {
    BuyItem.fetchAllCategory().then((response) => {
      setFillCategory(response.data.data);
      if (response.data.data != null) {
        setCategoryType(response.data.data[0].id);
      }
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

  useEffect(() => {
    fechGift();
  }, []);

  const onSubmitCreate = () => {
    if (!categoryType) {
      message.error("Vui lòng chọn loại điểm");
      return;
    }

    if (!selectedConversion) {
      message.error("Vui lòng chọn một mục trong danh sách chọn");
      return;
    }
    // else if (
    //   (selectedConversion ? selectedConversion.honey : 0) > fillPoint.point
    // ) {
    //   message.error("Bạn không đủ điểm để đổi quà trong ranh này.");
    //   return;
    // }

    const dataToAdd = {
      honeyId: fillPoint.id,
      studentId: fillUserApi.idUser,
      honeyPoint: parseInt(selectedConversion ? selectedConversion.honey : 0),
      giftId: selectedConversion ? selectedConversion.id : 0,
      nameGift: selectedConversion.name,
      honeyCategoryId: selectedConversion
        ? selectedConversion.honeyCategoryId
        : 0,
      idArchive: fillUserApi.idUser,
    };
    createRequest(dataToAdd);
  };

  const createRequest = (addRequest) => {
    BuyItem.createRequest(addRequest)
      .then((response) => {
        if (response.data.success) {
          message.success("Đổi quà thành công");
          navigate("/student/create-conversion/history");
        } else {
          message.error("Đổi quà thất bại!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="shop__gift">
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
              <div style={{ marginTop: "40px", color: "white" }}>
                {/* {item.quantity ? item.quantity : "vô hạn"} */}
              </div>
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
      <div className="item__detail">
        {selectedConversion && (
          <div className="detail__header">
            <div className="item__detail__image">
              <ImageRenderer image={selectedConversion.image} />
            </div>
            <div class="item__detail__body">
              <h3 title="Ba lô siêu vip">{selectedConversion.name}</h3>{" "}
              <p>Mật ong: {selectedConversion.honey}</p>{" "}
              <span>
                Số lượng:{" "}
                {selectedConversion.quantity
                  ? selectedConversion.quantity
                  : "vô hạn"}
              </span>
            </div>
          </div>
        )}
        {selectedConversion && (
          <div className="detail__text">
            <span>{selectedConversion.note}</span>
          </div>
        )}

        <Button className="detail__button" onClick={onSubmitCreate}>
          Mua vật phẩm
        </Button>
      </div>
    </section>
  );
});

export default Items;
