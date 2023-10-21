import { Button, Card, Col, Row, Space, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./letter-detail.css";
import { useState } from "react";
import { ArrowLeftOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationDetailAPI } from "../../../apis/student/notificaton-detail/notification-detail.api";
import { NotificationAPI } from "../../../apis/student/notification/notification.api";
const LetterDetail = memo(() => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [notification, SetNotification] = useState({});
  const [notificationDetail, setNotificationDetail] = useState([]);

  const dataReceiving = [];
  notificationDetail.map((n) => dataReceiving.push(n.notificationDetailId));

  const fetchOneNotification = (id) => {
    NotificationAPI.readOne(id)
      .then((response) => {})
      .catch(() => {});
  };

  const getNotificationById = (id) => {
    NotificationDetailAPI.getOneNotificationById(id)
      .then((response) => {
        SetNotification(response.data.data);
      })
      .catch(() => {
        message.error("Vui lòng f5 tải lại trang");
      });
  };

  const fetchNotificationDetail = (id) => {
    NotificationDetailAPI.fetchAllByIdStudentAndIdNotification(id)
      .then((response) => {
        setNotificationDetail(response.data.data);
      })
      .catch(() => {
        message.error("Bạn đã nhận quà rồi");
      });
  };

  const handleReceiving = (data, id) => {
    NotificationDetailAPI.receivingGiftsFromNotifications(data, id)
      .then(() => {
        message.success("Nhận quà thành công");
      })
      .catch(() => {
        message.error("Nhận quà thất bại");
      });
    NotificationDetailAPI.updateStatus(id)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
    navigate(`/student/letter`);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    getNotificationById(id);
    fetchOneNotification(id);
    fetchNotificationDetail(id);
  }, [id]);

  return (
    <section className="letter__detail">
      <div className="detail__item">
        <div className="letter__detail__image">
          <div className="letter__detail__date">
            <div style={{ textAlign: "center" }}>
              {/* thời gian nhận */}
              <h3>{formatDate(notification.createdDate)}</h3>
            </div>
          </div>
        </div>
        <div className="letter__detail__body">
          <Space
            style={{
              justifyContent: "space-between",
              display: "flex",
              marginBottom: "16px",
            }}
          >
            <div>
              {/* tiêu đề thư */}
              <h2>{notification.title}</h2>
              {/* thời gian nhận */}
              <p className="date">
                <ClockCircleOutlined className="icon__date" />
                {formatTime(notification.createdDate)}
              </p>
            </div>

            <Button
              className="item__button"
              onClick={() => handleReceiving(dataReceiving, id)}
              disabled={notification.status === "DA_NHAN" ? true : false}
            >
              {notification.status === "DA_NHAN" ? "Đã nhận" : "Nhận quà"}
            </Button>
          </Space>

          <div className="letter__detail__content">
            <div className="letter__detail__text">
              <div className="detail__icon">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              {/* nội dung thư */}
              {notificationDetail.map((nd) => (
                <div key={nd.notificationDetailId}>
                  <p>
                    <b>{nd.content}</b>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default LetterDetail;
