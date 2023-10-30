import { Col, Tooltip } from "antd";
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

  function ImageRenderer({ image }) {
    const byteArray = image ? image.split(",").map(Number) : [];
    const base64ImageData = btoa(
      String.fromCharCode.apply(null, new Uint8Array(byteArray))
    );
    const imageUrl = `data:image/jpeg;base64,${base64ImageData}`;

    return (
      <img
        src={imageUrl}
        style={{ width: "40px", height: "40px" }}
        alt="Hình ảnh"
      />
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
            <Tooltip title={data.name}>
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
                  <ImageRenderer image={data.image} />
                  <div className="quantity-gift">1</div>
                </div>
                <div className="chest__card__body">
                  <h3>{data.name}</h3>
                </div>
              </div>
            </Tooltip>
          </Col>
        ))}
      </div>
      {showAdditionalInfo ? (
        <div className="chest__item__detail">
          <div className="chest__detail__header">
            <div className="chest__detail__image">
              <ImageRenderer image={dataChest.image} />
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
