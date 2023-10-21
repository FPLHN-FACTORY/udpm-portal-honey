import { Card, Col, Row, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./item.css";
import "./shop-gift.css";

const Gift = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(0);

  const handleTabClick = (index) => {
    setIsActive(index);
  };

  const data = [
    {
      name: "Quà 1",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Quà 2",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Quà 3",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Quà 4",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Quà 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Quà 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
    },
  ];

  return (
    <section className="shop__gift">
      <div className="item__list" gutter={16}>
        {data.map((item, index) => (
          <Col span={6} key={index}>
            <a
              className={`item__card ${
                index === isActive ? "active__item" : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              <div className="card__image">
                <img src={item.image} atl="image" />
              </div>
              <div className="card__body">
                <h3>{item.name}</h3>
                <div className="card__body__honey">
                  <img
                    src="https://servreality.com/wp-content/uploads/2022/10/game-coin-a-good-investment.png"
                    atl="image"
                  />
                  <span>{item.honey}</span>
                </div>
              </div>
            </a>
          </Col>
        ))}
      </div>
      <div className="item__detail">
        <div className="detail__header">
          <div className="item__detail__image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrgyJ4QtqLGjtz0RwYGZUToXDjbCE2o8jXQ&usqp=CAU"
              atl="image"
            />
          </div>
          <div class="item__detail__body">
            <h3 title="Ba lô siêu vip">Ba lô siêp vip</h3> <p>Mật ong: 1000</p> <span>Số lượng: 331</span>
          </div>
        </div>
        <div className="detail__text">
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            commodi ipsam inventore dolore tempora, omnis sequi, dolorem enim
            repudiandae consequuntur provident nesciunt eligendi adipisci
            blanditiis culpa quia! Dicta, sunt vero.
          </span>
        </div>
        <a className="detail__button">Sử dụng</a>
      </div>
    </section>
  );
});

export default Gift;
