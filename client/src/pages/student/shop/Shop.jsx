import { Tabs } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import React, { memo, useEffect } from "react";
import "./shop.css";
import { useState } from "react";
import Items from "./Items";
import Gift from "./Gift";
import { ResquestConversion } from "../../../apis/user/ResquestConversiton/ResquestConversion.api";
import { BuyItem } from "../../../apis/student/buyItem/ButItem";

const Shop = memo(() => {
  const [fillCategory, setFillCategory] = useState([]);
  const [categoryType, setCategoryType] = useState();
  const [fillGift, setFillGift] = useState([]);
  const [fillGiftItem, setFillGiftItem] = useState([]);
  const [fillPoint, setFillPoint] = useState({ point: 0 });
  const [activeTab, setActiveTab] = useState(0);
  const [fillUserApi, setFillUserApi] = useState([]);
  const [filteredConversions, setFilteredConversions] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  // const [mode, setMode] = useState("");

  const fechCategory = () => {
    ResquestConversion.fetchAllCategory().then((response) => {
      setFillCategory(response.data.data);
    });
  };

  const updatePoints = (newPoints) => {
    setFillPoint({ point: newPoints });
  };

  const getPoint = (data) => {
    ResquestConversion.getPointHoney(data)
      .then((response) => {
        setFillPoint(response.data.data ? response.data.data : "0");
      })
      .catch((error) => console.log(error));
  };

  const fechUserApiById = () => {
    ResquestConversion.getUserAPiByid().then((response) => {
      setFillUserApi({
        ...response.data.data,
      });
    });
  };
  useEffect(() => {
    if (categoryType) {
      const filteredData = fillGift.filter(
        (gift) => gift.categoryId === categoryType
      );
      setFilteredConversions(filteredData);
    } else {
      setFilteredConversions(fillGift);
    }
  }, [categoryType, fillGift]);

  useEffect(() => {
    if (categoryType) {
      const filteredData = fillGiftItem.filter(
        (gift) => gift.categoryId === categoryType
      );
      setFilteredItem(filteredData);
    } else {
      if (!categoryType && fillCategory.length > 0) {
        setCategoryType(fillCategory[0].id);
        const data = {
          categoryId: fillCategory[0].id,
          studentId: fillUserApi.idUser,
        };
        getPoint(data);
      }
    }
  }, [categoryType, fillGiftItem, fillCategory, fillUserApi]);

  useEffect(() => {
    ResquestConversion.fetchAllGift().then((response) => {
      setFillGift(response.data.data);
    });
  }, []);

  useEffect(() => {
    BuyItem.fetchAllGift().then((response) => {
      setFillGiftItem(response.data.data);
    });
  }, []);

  const onchageCtae = (value) => {
    setCategoryType(value);
    const data = {
      categoryId: value,
      studentId: fillUserApi.idUser,
    };
    getPoint(data);
  };

  useEffect(() => {
    fechCategory();
    fechUserApiById();
  }, []);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabData = [
    {
      title: "Vật phẩm",
      content: (
        <Items
          filteredItem={filteredItem}
          fillPoint={fillPoint}
          updatePoints={updatePoints}
        />
      ),
    },
    {
      title: "Quà",
      content: (
        <Gift
          filteredConversions={filteredConversions}
          fillPoint={fillPoint}
          updatePoints={updatePoints}
        />
      ),
    },
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
            tabPosition={"top"}
            style={{
              height: "100%",
              width: 300,
            }}
            onChange={(value) => onchageCtae(value)}
            value={categoryType}
            items={fillCategory.map((category) => {
              return {
                label: category.name,
                key: category.id,
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
          <span> {fillPoint.point ? fillPoint.point : parseInt(0)}</span>
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
