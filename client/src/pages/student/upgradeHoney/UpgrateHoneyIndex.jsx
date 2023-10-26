import { Card, Col, Row, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import {
  PlusOutlined,
  SearchOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import React, { memo, useEffect } from "react";
import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UpgrateHoneyIndex = memo(() => {
  const data = [
    {
      name: "Vật phẩm 1",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 2",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 3",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 4",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image: "https://lienquan.garena.vn/kg/images/item-6.png",
      quantity: 12,
    },
    {
      name: "Vật phẩm 5",
      honey: 1000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrgyJ4QtqLGjtz0RwYGZUToXDjbCE2o8jXQ&usqp=CAU",
      quantity: 12,
    },
  ];
  // const dataBox = Array.from({ length: 15 }, (_, index) => ({
  //   image: "https://lienquan.garena.vn/kg/images/item-6.png",
  // }));
  const dataBox = Array.from({ length: 15 }, (_, index) => index + 1);
  return (
    <section className="upgrate__honey">
      <div className="upgrate__honey__item">
        <div className="upgrate__honey__header">
          <div className="upgrate__honey__list">
            <div className="upgrate__honey__filter">
              <div className="upgrate__honey__text">
                {" "}
                Chọn loại mật để nâng cấp{" "}
              </div>
              <div className="upgrate__search">
                <SearchOutlined />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập tên..."
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "3px",
                    borderRadius: "5px",
                    color: "#26a387",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>

            <div className="upgrate__list">
              {data.map((item) => (
                <Col span={12}>
                  <div className="upgrate__honey__detail">
                    <div className="upgrate__item__image">
                      <img alt="" src={item.image} />
                    </div>
                    <div className="upgrate__item__text">
                      <div className="upgrate__text__name">{item.name}</div>
                      <div className="upgrate__text__honey">
                        {" "}
                        Phí: {item.honey}{" "}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </div>
          </div>
          <div className="upgrate__honey__choose">
            <div className="upgrate__list__title">
              {" "}
              Chọn vật phẩm để nâng cấp{" "}
            </div>
            <div className="upgrate__list__box">
              {dataBox.map((item) => (
                <Col span={8}>
                  <div
                    className={`upgrate__box__item ${
                      item.image ? "change__background" : ""
                    }`}
                    key={item}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt="Hình ảnh vật phẩm"
                        className="box__image"
                      />
                    ) : (
                      <PlusOutlined className="icon__add" />
                    )}
                  </div>
                </Col>
              ))}
            </div>
          </div>
        </div>
        <div className="upgrate__honey__chest">
          <div
            className="upgrate__honey__filter"
            style={{ paddingLeft: "20px", paddingRight: "20px" }}
          >
            <div className="upgrate__honey__text">
              {" "}
              Chọn loại mật để nâng cấp{" "}
            </div>
            <div className="upgrate__search">
              <SearchOutlined />
              <input
                type="text"
                class="form-control"
                placeholder="Nhập tên..."
                style={{
                  border: "none",
                  outline: "none",
                  padding: "3px",
                  borderRadius: "5px",
                  color: "#26a387",
                  fontWeight: "600",
                }}
              />
            </div>
          </div>
          <div className="upgrate__chest__list">
            {data.map((item) => (
              <div class="upgrate__chest__wrapper">
                <div class="upgrate__chest__overlay"></div>
                <img class="upgrate__honey__image" src={item.image} />
                <div class="upgrate__chest__quantity">{item.quantity}</div>
                <a href="#">
                  <div class="upgrate__chest__name">{item.name}</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="update__honey__history">
        <div className="upgrate__chest__title ">Lúc đầu</div>
        <div className="update__history__before">
          <div className="history__before__item">
            <div class="before__item__name">Vật phẩm 1</div>
            <img alt="" src="https://lienquan.garena.vn/kg/images/item-6.png" />
            <div class="before__overlay"></div>
          </div>
        </div>
        <div className="upgrate__chest__title"> Lúc sau</div>
        <div className="update__history__before">
          <div className="history__before__item">
            <div class="before__item__name">Vật phẩm 2</div>
            <img alt="" src="https://lienquan.garena.vn/kg/images/item-6.png" />
            <div class="before__overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default UpgrateHoneyIndex;
