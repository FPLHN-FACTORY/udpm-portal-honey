import { Card, Col, Row } from "antd";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./index.css";
import { ProfileApi } from "../../../apis/student/profile/profileApi.api";
import { GetUser, SetUser } from "../../../app/reducers/users/users.reducer";
import { GetHoney, SetHoney } from "../../../app/reducers/honey/honey.reducer";
import TransactionHistory from "../transaction/TransactionHistory";
import { useState } from "react";

const MyProfile = memo(() => {
  const dispatch = useAppDispatch();

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

  return (
    <section
      className="student"
      style={{ height: isCategoryVisible ? "auto" : "100%" }}
    >
      <div className="wrapper"></div>
      <div
        className="student__profile"
        style={{ height: isCategoryVisible ? "auto" : "100%" }}
      >
        <Card
          className="student__card "
          style={{
            position: isCategoryVisible ? "fixed" : "relative",
            top: isCategoryVisible ? "0" : "0",
          }}
        >
          <div className="student__card__image">
            <img
              src="https://images.pexels.com/photos/36469/woman-person-flowers-wreaths.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="image"
              className="infor__image"
              // src={data.img}
            />
          </div>
          <div className="student__card__infor">
            <p>{data.name}</p>
            <em>{data.userName}</em>
          </div>
          <div className="category__button">
            <button
              className="show"
              id="show__more"
              onClick={toggleCategoryVisibility}
              style={{ borderRadius: isCategoryVisible ? "10px" : "100px" }}
            >
              {isCategoryVisible ? "Ẩn" : "Xem thêm"}
            </button>
          </div>
        </Card>
      </div>

      {/* ----category hiển thị theo dạng slide */}
      {/* sau khi nhét data vào chỉ để lại 1 cái col 8 trong class này thôi còn lại xoá đi(xoá theo chỉ dẫn) */}
      <div
        className={
          isCategoryVisible ? "category__slide hidden" : "category__slide"
        }
      >
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              {/* nơi nhét ảnh category */}
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4> {/* nơi nhét tên category */}
              <p>1000đ</p> {/* nơi nhét điểm category */}
            </div>
          </div>
        </Col>

        {/* ---------XOÁ------- */}
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://icons.iconarchive.com/icons/iconarchive/badge-trophy/256/Badge-Trophy-Shield-icon.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://zendo.vn/images/tag/icon/tc/rank_lb.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/battlefield-5/4/4f/Battlefield_hardline_rank_150.png?width=640" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://i.pinimg.com/originals/53/73/f5/5373f5978c59cdf89dbacb3f1cc17d5e.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        {/*-------------XOÁ -------------*/}
      </div>

      {/* ----category hiển thị theo dạng grid */}
      {/* sau khi nhét data vào chỉ để lại 1 cái col 8 trong class này thôi còn lại xoá đi(xoá theo chỉ dẫn) */}
      <div className={isCategoryVisible ? "category" : "category hidden"}>
        <Col span={8}>
          <div class="category__item">
            {/* nơi nhét ảnh category */}
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>
            <div class="category__name">
              <h4>SLIVER</h4> {/* nơi nhét tên category */}
              <p>1000đ</p> {/* nơi nhét điểm category */}
            </div>
          </div>
        </Col>

        {/*-------------XOÁ -------------*/}
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div class="category__item">
            <div className="category__image">
              <img src="https://api.truecost.gg/63f049b0ccacbc0026a1b7bf/ce1b6c8b-5b8f-4e5e-aa5c-4f9dbf1e4e22/u.png" />
            </div>

            <div class="category__name">
              <h4>SLIVER</h4>
              <p>1000đ</p>
            </div>
          </div>
        </Col>
        {/*-------------XOÁ -------------*/}
      </div>
    </section>
  );
});

export default MyProfile;
