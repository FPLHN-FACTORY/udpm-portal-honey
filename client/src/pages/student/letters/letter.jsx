import { Card, Col, Row, message, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClockCircleOutlined, HeatMapOutlined } from "@ant-design/icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./letter.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotificationAPI } from "../../../apis/student/notification/notification.api";
import {
  GetNotification,
  SetNotification,
} from "../../../app/reducers/notification/notification.reducer";
import { GetCountNotification } from "../../../app/reducers/notification/count-notification.reducer";
import imageNotification from "../../../assets/images/bell.png";

const Letter = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [allRead, setAllRead] = useState(false);
  const [current, setCurrent] = useState(0);
  const [crease, setCrease] = useState(false);
  const [notificationHasData, setNotificationHasData] = useState(false);
  const dataCountNotification = useAppSelector(GetCountNotification);

  const toggleAllRead = () => {
    setAllRead(!allRead);
  };

  const readAllNotification = () => {
    NotificationAPI.readAllNotification().then((response) => {
      if (response.status === 200) {
        message.success("Đã đọc hết thư");
        fetchListNotification();
      } else {
        message.warning("Không thể đọc hết thư");
      }
    });
  };

  const fetchNotification = async () => {
    try {
      const response = await NotificationAPI.fetchNotification({
        page: current,
      });
      dispatch(SetNotification(response.data.data.data));

      setCurrent(response.data.data.currentPage);

      setCrease(true);
      if (response.data.data.totalPages - current <= 1) {
        setNotificationHasData(false);
      } else {
        setNotificationHasData(true);
      }
    } catch (error) {}
  };

  const fetchListNotification = () => {
    NotificationAPI.fetchListNotification()
      .then((response) => {
        dispatch(SetNotification(response.data.data));
        setCurrent(0);
        setCrease(false);
      })
      .catch(() => {
        message.warning("Không có thư để xem");
      });
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    fetchNotification();
  }, [current, dataCountNotification]);

  const dataNotification = useAppSelector(GetNotification);
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
      {dataCountNotification > 0 && (
        <div>
          <div
            className="button__readAll"
            onClick={() => readAllNotification()}
          >
            <span className="item__button">Đọc hết</span>
          </div>
        </div>
      )}
      <div className="letter__list">
        <Col span={24}>
          {dataNotification.map((notification) => (
            <Link to={`/student/letter/detail/${notification.id}`}>
              <div className="letter__item" key={notification.id}>
                <div className="letter__item__image">
                  <img
                    src={imageNotification}
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
                    {/* <div className="item__content__detail">
                    <p>{notification.content}</p>
                  </div> */}
                  </div>
                </div>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    backgroundColor: `${
                      notification.status === "0" ? "#52c41a" : ""
                    }`,
                  }}
                ></div>
                {/*  */}
              </div>
            </Link>
          ))}
        </Col>
      </div>
      {/* ---------------button xem thêm------------------- */}
      {crease === true ? (
        <div
          className="button__showmore"
          onClick={() => fetchListNotification()}
        >
          <span className="item__button">Xem thêm</span>
        </div>
      ) : (
        <div className="button__showmore" onClick={() => fetchNotification()}>
          <span className="item__button">Thu gọn</span>
        </div>
      )}
    </section>
  );
});

export default Letter;
