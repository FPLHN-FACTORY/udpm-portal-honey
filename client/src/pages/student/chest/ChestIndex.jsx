import { Card, Col, Row, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./chest-index.css";
import { ShoppingOutlined } from "@ant-design/icons";
import ItemsChest from "./ItemsChest";
import GiftChest from "./GiftChest";
import ToolChest from "./ToolChest";
import Chest from "./Chest";

const ChestIndex = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [mode, setMode] = useState("top");

  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  const tabData = [
    { title: "Vật phẩm", content: <ItemsChest /> },
    { title: "Quà", content: <GiftChest /> },
    { title: "Dụng cụ", content: <ToolChest /> },
    { title: "Rương", content: <Chest /> },
  ];
  return (
    <section className="student__chest">
      <div className="chest__menu">
        <div className="chest__menu__logo">
          <ShoppingOutlined className="icon__store" />
          Túi đồ
        </div>
      </div>
      <div className="chest__tab">
        <div className="chest__tab__list">
          {tabData.map((tab, index) => (
            <div
              key={index}
              className={`tab__detail ${index === activeTab ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className="chest__tab__content">{tabData[activeTab].content}</div>
      </div>
    </section>
  );
});

export default ChestIndex;
