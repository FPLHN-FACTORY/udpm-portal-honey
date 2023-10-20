import { Card, Col, Row, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { AppstoreAddOutlined } from "@ant-design/icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./shop.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Items from "./Items";
import Gift from "./Gift";

const Shop = memo(() => {
  const [activeTab, setActiveTab] = useState(0);
  const [mode, setMode] = useState("top");

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabData = [
    { title: "Vật phẩm", content: <Items /> },
    { title: "Đổi quà", content: <Gift /> },
  ];

  return (
    <section className="shop">
      <div className="shop__menu">
        <div className="shop__menu__logo">
          <AppstoreAddOutlined className="icon__store" />
          Cửa hàng
        </div>
        <div className="shop__menu__category">
          <Tabs
            tabPosition={mode}
            style={{
              height: "100%",
              width: 300,
            }}
            items={new Array(20).fill(null).map((_, i) => {
              const id = String(i);
              return {
                label: `Sliver-${id}`,
                key: id,
              };
            })}
          />
        </div>

        <div className="shop__menu__money">
          <img
            style={{
              width: "30px",
              height: "30px",
              marginRight: "5px",
              transform: "rotate(90deg)",
            }}
            src="https://static.vecteezy.com/system/resources/previews/019/049/713/non_2x/gold-coin-symbol-icon-png.png"
            alt="coins"
          />
          <span>9999</span>
        </div>
      </div>
      <div className="vertical-tab-container">
        <div className="tab-list">
          {tabData.map((tab, index) => (
            <div
              key={index}
              className={`tab ${index === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="tab-content">{tabData[activeTab].content}</div>
      </div>
    </section>
  );
});

export default Shop;
