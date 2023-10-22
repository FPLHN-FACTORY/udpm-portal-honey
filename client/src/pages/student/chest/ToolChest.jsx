import { Card, Col, Row, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ToolChest = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(0);

  const handleTabClick = (index) => {
    setIsActive(index);
  };

  const data = [
    {
      name: "Vật phẩm 1",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NeXcgAPJnMoaISgsvdFtOrrGIllaNXbAvQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 2",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrgyJ4QtqLGjtz0RwYGZUToXDjbCE2o8jXQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 3",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NeXcgAPJnMoaISgsvdFtOrrGIllaNXbAvQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 4",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrgyJ4QtqLGjtz0RwYGZUToXDjbCE2o8jXQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NeXcgAPJnMoaISgsvdFtOrrGIllaNXbAvQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrgyJ4QtqLGjtz0RwYGZUToXDjbCE2o8jXQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NeXcgAPJnMoaISgsvdFtOrrGIllaNXbAvQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrgyJ4QtqLGjtz0RwYGZUToXDjbCE2o8jXQ&usqp=CAU",
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrgyJ4QtqLGjtz0RwYGZUToXDjbCE2o8jXQ&usqp=CAU",
    },
  ];

  return (
    <section className="item__chest">
      <div className="item__chest__list" gutter={16}>
        {data.map((item, index) => (
          <Col span={6} key={index}>
            <a
              className={`item__chest__card ${
                index === isActive ? "active__item" : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              <div className="chest__card__image">
                <img src={item.image} atl="image" />
              </div>
              <div className="chest__card__body">
                <h3>{item.name}</h3>
              </div>
            </a>
          </Col>
        ))}
      </div>
      <div className="chest__item__detail">
        <div className="chest__detail__header">
          <div className="chest__detail__image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1NeXcgAPJnMoaISgsvdFtOrrGIllaNXbAvQ&usqp=CAU"
              atl="image"
            />
          </div>
          <div class="chest__detail__body">
            <h3 title="Vật phẩm 1">Vật phẩm 1</h3>
            <span>Số lượng: 331</span>
          </div>
        </div>
        <div className="chest__detail__text">
          <span>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
            commodi ipsam inventore dolore tempora, omnis sequi, dolorem enim
            repudiandae consequuntur provident nesciunt eligendi adipisci
            blanditiis culpa quia! Dicta, sunt vero.
          </span>
        </div>
        <a className="chest__detail__button">Sử dụng</a>
      </div>
    </section>
  );
});

export default ToolChest;
