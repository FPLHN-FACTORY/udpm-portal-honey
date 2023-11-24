import { Col } from "antd";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import {
  GetGiftArchive,
  SetGiftArchive,
} from "../../../app/reducers/archive-gift/gift-archive.reducer";
import {
  GetArchiveCountGift,
  SetArchiveCountGift,
} from "../../../app/reducers/archive-gift/archive-count-gift.reducer";
import UsingGift from "./StudentUsingGift";
import "./chest-index.css";

const GiftChest = memo(() => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(-1);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [archiveGift, setArchiveGift] = useState();

  useEffect(() => {
    fetchGift();
  }, []);

  const handleTabClick = (index) => {
    setIsActive(index);
  };

  const fetchGift = () => {
    ArchiveAPI.getGift({ type: 0 }).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
    });
  };

  const dataGift = useAppSelector(GetGiftArchive);

  const detailArchive = (id) => {
    ArchiveAPI.detailArchiveGift(id).then((response) => {
      setNote(response.data.note);
      setName(response.data.name);
      dispatch(SetArchiveCountGift(response.data.quantity));
    });
  };

  const quantity = useAppSelector(GetArchiveCountGift);

  return (
    <section className="item__chest">
      <div className="item__chest__list" gutter={16}>
        {dataGift.map((data, index) => (
          <Col span={6} key={index}>
            <div
              className={`item__chest__card ${
                index === isActive ? "active__item" : ""
              }`}
              onClick={() => {
                handleTabClick(index);
                detailArchive(data.idGift);
                setArchiveGift(data);
                setShowAdditionalInfo(true);
              }}
            >
              <div className="chest__card__image">
                <img src={data.image} alt="" />
              </div>
              <div className="chest__card__quantity">{data.quantity}</div>
              <div className="chest__card__body">
                <h3>{data.name}</h3>
              </div>
            </div>
          </Col>
        ))}
      </div>
      {showAdditionalInfo && quantity >= 0 ? (
        <div className="chest__item__detail">
          <div className="chest__detail__header">
            <div className="chest__detail__image">
              <img src={archiveGift.image} alt="" />
            </div>
            <div class="chest__detail__body">
              <h3>{name}</h3>
              <span>Số lượng: {quantity}</span>
            </div>
          </div>
          <div className="chest__detail__text">
            <span>{note}</span>
          </div>
          <div className="chest__detail__button">
            <UsingGift archivegift={archiveGift} filter={{ type: 0 }} />
          </div>
        </div>
      ) : null}
    </section>
  );
});

export default GiftChest;
