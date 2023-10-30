import { Card, Col, Row } from "antd";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./index.css";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import { GetUser, SetUser } from "../../../app/reducers/users/users.reducer";
import { GetHoney, SetHoney } from "../../../app/reducers/honey/honey.reducer";
import TransactionHistory from "../transaction/TransactionHistory";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MyProfile = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function ImageRenderer({ image }) {
    const byteArray = image ? image.split(",").map(Number) : [];
    const base64ImageData = btoa(
      String.fromCharCode.apply(null, new Uint8Array(byteArray))
    );
    const imageUrl = `data:image/jpeg;base64,${base64ImageData}`;

    return <img src={imageUrl} alt="Hình ảnh" />;
  }

  useEffect(() => {
    getProfile();
    getHoneyProfile();
  }, []);

  const getProfile = () => {
    return ProfileApi.getUserLogin().then((response) => {
      dispatch(SetUser(response.data.data));
    });
  };

  const getHoneyProfile = () => {
    return ProfileApi.getHoneyUser().then((response) => {
      dispatch(SetHoney(response.data.data));
    });
  };

  const data = useAppSelector(GetUser);
  const dataHoney = useAppSelector(GetHoney);

  const slides = document.querySelectorAll(".category__item");
  const [isCategoryVisible, setCategoryVisibility] = useState(false);

  const toggleCategoryVisibility = () => {
    setCategoryVisibility(!isCategoryVisible);
  };

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      slide.scrollIntoView({ behavior: "smooth" });
    });
  });
  console.log(dataHoney);
  console.log(data);
  return (
    <section
      className="student"
      style={{ height: isCategoryVisible ? "auto" : "495px" }}>
      <div className="wrapper"></div>
      <div
        className="student__profile"
        style={{ height: isCategoryVisible ? "auto" : "100%" }}>
        <Card
          className="student__card "
          style={{
            position: isCategoryVisible ? "fixed" : "relative",
            top: isCategoryVisible ? "0" : "0",
          }}>
          <div className="student__card__image">
            <img alt="image" className="infor__image" src={data.picture} />
          </div>
          <div className="student__card__infor">
            <p>{data.name}</p>
            <em>{data.userName}</em>
          </div>
          <div className="category__button">
            <button
              onClick={() => {
                navigate("/student/history");
              }}
              className="show"
              id="show__more"
              style={{ borderRadius: "10px" }}>
              Lịch sử
            </button>
            <button
              className="show"
              id="show__more"
              onClick={toggleCategoryVisibility}
              style={{
                borderRadius: "10px",
                marginLeft: "10px",
              }}>
              {isCategoryVisible ? "Ẩn" : "Xem thêm"}
            </button>
          </div>
        </Card>
      </div>

      {/* ----category hiển thị theo dạng slide */}
      <div
        className={
          isCategoryVisible ? "category__slide hidden" : "category__slide"
        }>
        {dataHoney.map((item) => (
          <Col span={8}>
            <div class="category__item">
              <div className="category__image">
                <ImageRenderer image={item.image} />
              </div>

              <div class="category__name">
                <h4 title={item.nameHoney}>{item.nameHoney}</h4>{" "}
                {/* nơi nhét tên category */}
                <p title={item.point}>{item.point}</p>{" "}
                {/* nơi nhét điểm category */}
              </div>
            </div>
          </Col>
        ))}
      </div>

      {/* ----category hiển thị theo dạng grid */}
      <div className={isCategoryVisible ? "category" : "category hidden"}>
        {dataHoney.map((item) => (
          <Col md={8} sm={12}>
            <div class="category__item">
              <div className="category__image">
                <ImageRenderer image={item.image} />
              </div>

              <div class="category__name">
                <h4 title={item.nameHoney}>{item.nameHoney}</h4>{" "}
                {/* nơi nhét tên category */}
                <p title={item.point}>{item.point}</p>{" "}
                {/* nơi nhét điểm category */}
              </div>
            </div>
          </Col>
        ))}
      </div>
    </section>
  );
});

export default MyProfile;
