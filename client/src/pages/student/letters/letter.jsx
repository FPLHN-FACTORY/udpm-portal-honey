import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClockCircleOutlined, HeatMapOutlined } from "@ant-design/icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./letter.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Letter = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [allRead, setAllRead] = useState(false);

  const toggleAllRead = () => {
    setAllRead(!allRead);
  };

  return (
    <section className="letter">
      <div className="letter__title">
        <h2>Hòm thư</h2>
      </div>
      {/* ------------button đánh dấu đã đọc------------ */}
      <div className="button__tick">
        <a className="item__button">Đánh dấu tất cả là đã đọc</a>
      </div>
      <div className="letter__list">
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                {/* --------tiêu đề----- */}
                <a href="#" className="item__title__link ">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="icon__location"
                  />
                  Hà nội
                </p>
                <p className="date">
                {/* -----------thời gian nhận--------- */}                  
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  {/* ---------nội dung-------- */}
                  <p>
                    1Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a
                onClick={() => {
                  navigate("/student/letter/detail");
                }}
                className="item__button"
              >
                Xem ngay
              </a>
            </div>
          </div>
        </Col>

        {/* ---------------------------------- */}
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link  ">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="icon__location"
                  />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a
                className="item__button"
                onClick={() => {
                  navigate("/student/letter/detail");
                }}
              >
                Xem ngay
              </a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link  ">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="icon__location"
                  />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a className="item__button">Xem ngay</a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="icon__location"
                  />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a className="item__button">Xem ngay</a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="icon__location"
                  />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a className="item__button">Xem ngay</a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <HeatMapOutlined className="icon__location" />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a className="item__button">Xem ngay</a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <HeatMapOutlined className="icon__location" />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a className="item__button">Xem ngay</a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <HeatMapOutlined className="icon__location" />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a className="item__button">Xem ngay</a>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="letter__item">
            <div className="letter__item__image">
              <img
                src="https://www.tooplate.com/templates/2134_gotto_job/images/logos/google.png"
                alt="ảnh"
                className="item__image"
              />
            </div>
            <div className="letter__item__content">
              <h4 class="letter__item__title">
                <a href="#" className="item__title__link">
                  Technical Lead
                </a>
              </h4>
              <br></br>
              <div className="item__content">
                <p className="location">
                  <HeatMapOutlined className="icon__location" />
                  Hà nội
                </p>
                <p className="date">
                  <ClockCircleOutlined className="icon__date" />
                  10 hours ago
                </p>
                <div className="item__content__detail">
                  <p>
                    10Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quod natus numquam, explicabo aut assumenda nam ipsa ut
                    dolor nostrum, tenetur consequatur temporibus est sapiente
                    debitis excepturi veritatis eius nisi quisquam!
                  </p>
                </div>
              </div>
            </div>
            <div className="letter__item__button">
              <a className="item__button">Xem ngay</a>
            </div>
          </div>
        </Col>
      </div>
        {/* ---------------------------------- */}

        {/* ---------------button xem thêm------------------- */}
      <div className="button__showmore">
        <a className="item__button">Xem thêm</a>
      </div>
    </section>
  );
});

export default Letter;
