import React, { memo } from "react";
import { useState } from "react";
import "./chest-index.css";
import { ShoppingOutlined } from "@ant-design/icons";
import ItemsChest from "./ItemsChest";
import GiftChest from "./GiftChest";
import ToolChest from "./ToolChest";
import Chest from "./Chest";

const ChestIndex = memo(() => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabData = [
    { title: "Quà", content: <GiftChest /> },
    { title: "Vật phẩm", content: <ItemsChest /> },
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
