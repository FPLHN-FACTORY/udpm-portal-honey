import React, { useState } from "react";
import "./index.css";
import { Image, Tabs } from "antd";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

export default function StudentHistory() {
  const data = [
    { status: 0, point: "100 điểm" },
    { status: 1, point: "100 điểm Đồng" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
    { status: 2, point: "100 điểm" },
  ];
  const navigate = useNavigate();

  return (
    <div className="student__history">
      <div className="wapper">
        <div className="button-group">
          <button
            className="button button__active"
            onClick={() => navigate("/student/history")}>
            Lịch sử
          </button>
          <button
            className="button button__notactive"
            onClick={() => navigate("/student/request")}>
            Yêu cầu
          </button>
        </div>
        <hr className="separator" />
        <div className="wapper__content">
          {data.map((e) => {
            return (
              <div className={`content ${e.status === 1 && "red"}`}>
                <Image
                  height={"100%"}
                  className="content__image"
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <div className="student__history__text">
                  Mua gói quà Assignment 1 [
                  {e.status === 0
                    ? "Chờ phê duyệt"
                    : e.status === 1
                    ? "Hoàn thành"
                    : "Đã hủy"}
                  ]
                </div>
                <div
                  className={`student__history__point ${
                    e.status === 1 && "red__text"
                  }`}>
                  <span style={{ marginRight: "10px" }}>
                    {e.status === 1 && "-"}
                    {e.point}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
