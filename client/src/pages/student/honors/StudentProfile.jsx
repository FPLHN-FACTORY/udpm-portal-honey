import { Card, Col } from "antd";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./index.css";
import { StudenHallOfFameAPI } from "../../../apis/student/honor/honor.api";
import { GetUser, SetUser } from "../../../app/reducers/users/users.reducer";
import { GetHoney, SetHoney } from "../../../app/reducers/honey/honey.reducer";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StudentProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    getProfile();
    getHoneyProfile();
  }, []);

  const getProfile = () => {
    return StudenHallOfFameAPI.detailStudent(id).then((response) => {
      dispatch(SetUser(response.data.data));
    });
  };

  const getHoneyProfile = () => {
    return StudenHallOfFameAPI.detailProfile(id).then((response) => {
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
      id="myProfile"
      className="student"
      style={{ height: isCategoryVisible ? "auto" : "495px" }}
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
            <img alt="image" className="infor__image" src={data.picture} />
          </div>
          <div className="student__card__infor">
            <p>{data.name}</p>
            <em>{data.userName}</em>
          </div>
        </Card>
      </div>

      {/* ----category hiển thị theo dạng grid */}
      <div className="category">
        {dataHoney.map((item) => (
          <Col md={8} sm={12}>
            <div class="category__item">
              <div className="category__image">
                <img src={item.image} alt="" />
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
};

export default StudentProfile;
