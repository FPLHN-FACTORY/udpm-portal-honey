import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClockCircleOutlined, HeatMapOutlined } from "@ant-design/icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./letter.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NotificationAPI } from "../../../apis/student/notification/notification.api";
import {
  GetNotification,
  SetNotification,
} from "../../../app/reducers/notification/notification.reducer";
import { GetCountNotification } from "../../../app/reducers/notification/count-notification.reducer";

const Letter = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [allRead, setAllRead] = useState(false);
  const [current, setCurrent] = useState(0);
  const [notificationHasData, setNotificationHasData] = useState(false);
  const dataCountNotification = useAppSelector(GetCountNotification);

  const toggleAllRead = () => {
    setAllRead(!allRead);
  };

  const fetchNotification = async () => {
    try {
      const response = await NotificationAPI.fetchNotification({
        page: current,
      });
      dispatch(SetNotification(response.data.data.data));

      setCurrent(response.data.data.currentPage);
      if (response.data.data.totalPages - current <= 1) {
        setNotificationHasData(false);
      } else {
        setNotificationHasData(true);
      }
    } catch (error) {}
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    NotificationAPI.fetchNotification({
      page: current,
    }).then((response) => {
      dispatch(SetNotification(response.data.data.data));
    });
    fetchNotification();
  }, [current, dataCountNotification]);

  const dataNotification = useAppSelector(GetNotification);
  console.log(dataNotification);

  // {
  //   /* ------------button đánh dấu đã đọc------------ */
  // }
  // <div className="button__tick">
  //   <a className="item__button">Đánh dấu tất cả là đã đọc</a>
  // </div>;
  return (
    <section className="letter">
      <div className="letter__title">
        <h2>Hòm thư</h2>
      </div>
      <div className="letter__list">
        <Col span={24}>
          {dataNotification.map((notification) => (
            <div className="letter__item" key={notification.id}>
              <div className="letter__item__image">
                <img
                  src={notification.image}
                  alt="Ảnh"
                  className="item__image"
                />
              </div>
              <div className="letter__item__content">
                <h4 className="letter__item__title">
                  <a href={notification.link} className="item__title__link">
                    {notification.title}
                  </a>
                </h4>
                <br />
                <div className="item__content">
                  <p className="date">
                    <ClockCircleOutlined className="icon__date" />
                    {formatDate(notification.createdDate)}
                  </p>
                  <div className="item__content__detail">
                    <p>{notification.content}</p>
                  </div>
                </div>
              </div>
              <div className="letter__item__button">
                <a
                  onClick={() => {
                    navigate("/student/chest");
                  }}
                  className="item__button"
                >
                  Xem ngay
                </a>
              </div>
            </div>
          ))}
        </Col>
      </div>
      {/* ---------------button xem thêm------------------- */}
      <div className="button__showmore">
        <a className="item__button">Xem thêm</a>
      </div>
    </section>
  );
});

export default Letter;
