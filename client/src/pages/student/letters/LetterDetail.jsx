import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./letter-detail.css";
import { useState } from "react";
import { ArrowLeftOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const LetterDetail = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <section className="letter__detail">
      <div className="detail__item">
        <div className="letter__detail__image">
          <a className="letter__detail__date">
            {/* thời gian nhận */}
            <h3>15</h3>
            <p>Jan</p>
          </a>
        </div>
        <div className="letter__detail__body">
          {/* tiêu đề thư */}
          <h2>Google inks pact for new 35-storey office</h2>
          {/* thời gian nhận */}
          <p className="date">
            <ClockCircleOutlined className="icon__date" />
            10 hours ago
          </p>
          <div className="letter__detail__content">
            <div className="letter__detail__text">
              <div className="detail__icon">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              {/* nội dung thư */}
              <em>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Commodi recusandae veritatis quos incidunt vero minus voluptatum
                provident quisquam eveniet, consequatur enim fugiat eius beatae
                soluta at, nihil corrupti nobis reprehenderit!
              </em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default LetterDetail;
