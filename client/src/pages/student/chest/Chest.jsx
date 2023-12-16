/* eslint-disable jsx-a11y/alt-text */
import { Badge, Col } from "antd";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import {
  GetArchiveChest,
  SetArchiveChest,
} from "../../../app/reducers/archive-gift/archive-chest.reducer";
import OpenChest from "./StudentOpenChest";

const Chest = memo(() => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(-1);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [archiveChest, setArchiveChest] = useState();

  useEffect(() => {
    fetchGift();
  }, []);

  function ImageRenderer({ image, quantity }) {
    const imageUrl = `https://github-production-user-asset-6210df.s3.amazonaws.com/92096173/279314951-92d1478c-d8a7-4d67-b5e5-0224c241f83d.png`;

    return (
      <div style={{ position: "relative" }}>
        <Badge.Ribbon text={quantity} color="red">
          <img
            src={imageUrl}
            style={{ width: "100%", height: "100%" }}
            alt="Hình ảnh"
          />
        </Badge.Ribbon>
      </div>
    );
  }

  const handleTabClick = (index) => {
    setIsActive(index);
  };

  const fetchGift = () => {
    ArchiveAPI.getChest().then((response) => {
      dispatch(SetArchiveChest(response.data.data));
    });
  };

  const dataChest = useAppSelector(GetArchiveChest);

  const detailArchiveChest = (id) => {
    ArchiveAPI.detailArchiveChest(id).then((response) => {
      setNote(response.data.note);
      setName(response.data.name);
    });
  };

  return (
    <section className="item__chest">
      <div className="item__chest__list" gutter={16}>
        {dataChest.map((data, index) => (
          <Col span={6} key={index}>
            <div
              className={`item__chest__card ${
                index === isActive ? "active__item" : ""
              }`}
              onClick={() => {
                handleTabClick(index);
                detailArchiveChest(data.chestId);
                setArchiveChest(data);
                setShowAdditionalInfo(true);
              }}
            >
              <div className="chest__card__image">
                <ImageRenderer quantity={1} />
              </div>
              <div className="chest__card__body">
                <h3>{data.name}</h3>
              </div>
            </div>
          </Col>
        ))}
      </div>
      {showAdditionalInfo ? (
        <div className="chest__item__detail">
          <div className="chest__detail__header">
            <div className="chest__detail__image">
              <img
                src="https://github.com/cuongnq189/react-basic/assets/92096173/92d1478c-d8a7-4d67-b5e5-0224c241f83d"
                atl="image"
              />
            </div>
            <div class="chest__detail__body">
              <h3>{name}</h3>
              <span>Số lượng: 1</span>
            </div>
          </div>
          <div className="chest__detail__text">
            <span>{note}</span>
          </div>
          <div className="chest__detail__button">
            <OpenChest
              chest={archiveChest}
              closeAdditionalInfo={() => setShowAdditionalInfo(false)}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
});

export default Chest;
