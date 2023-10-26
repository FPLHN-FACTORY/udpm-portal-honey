import { Col, Tooltip } from "antd";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import {
  GetArchiveCountGift,
  SetArchiveCountGift,
} from "../../../app/reducers/archive-gift/archive-count-gift.reducer";
import UsingGift from "./StudentUsingGift";
import {
  GetArchiveGift,
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";

const ItemsChest = memo(() => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(-1);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [archiveGift, setArchiveGift] = useState();

  useEffect(() => {
    fetchItems();
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

  const fetchItems = () => {
    ArchiveAPI.getArchive({ type: 1 }).then((response) => {
      dispatch(SetArchiveGift(response.data.data));
    });
  };

  const dataItems = useAppSelector(GetArchiveGift);

  const detailArchive = (id) => {
    ArchiveAPI.detailArchiveGift(id).then((response) => {
      setNote(response.data.note);
      setName(response.data.name);
      dispatch(SetArchiveCountGift(parseInt(response.data.quantity)));
    });
  };

  const quantity = useAppSelector(GetArchiveCountGift);

  return (
    <section className="item__chest">
      <div className="item__chest__list" gutter={16}>
        {dataItems.map((data, index) => (
          <Col span={6} key={index}>
            <Tooltip title={data.name}>
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
                  <ImageRenderer image={data.image} />
                  <div className="quantity-gift">{data.quantity}</div>
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
              <ImageRenderer image={dataItems.image} />
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
            <UsingGift archivegift={archiveGift} filter={{ type: 1 }} />
          </div>
        </div>
      ) : null}
    </section>
  );
});

export default ItemsChest;
