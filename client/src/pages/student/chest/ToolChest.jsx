import { Col } from "antd";
import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from "react";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import {
  GetArchiveCountGift,
  SetArchiveCountGift,
} from "../../../app/reducers/archive-gift/archive-count-gift.reducer";
import {
  GetArchiveGift,
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";

const ToolChest = memo(() => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(-1);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [archiveGift, setArchiveGift] = useState();

  useEffect(() => {
    fetchTool();
  }, []);

  function ImageRenderer({ image, quantity }) {
    const byteArray = image ? image.split(",").map(Number) : [];
    const base64ImageData = btoa(
      String.fromCharCode.apply(null, new Uint8Array(byteArray))
    );
    const imageUrl = `data:image/jpeg;base64,${base64ImageData}`;

    return (
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          style={{ width: "100%", height: "100%" }}
          alt="Hình ảnh"
        />
        <div className="quantity-item">{quantity}</div>
      </div>
    );
  }

  const handleTabClick = (index) => {
    setIsActive(index);
  };

  const fetchTool = () => {
    ArchiveAPI.getArchive({ type: 2 }).then((response) => {
      dispatch(SetArchiveGift(response.data.data));
    });
  };

  const dataTool = useAppSelector(GetArchiveGift);

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
        {dataTool.map((data, index) => (
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
                <ImageRenderer image={data.image} quantity={data.quantity} />
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
              <ImageRenderer image={archiveGift.image} />
            </div>
            <div class="chest__detail__body">
              <h3>{name}</h3>
              <span>Số lượng: {quantity}</span>
            </div>
          </div>
          <div className="chest__detail__text">
            <span>{note}</span>
          </div>
        </div>
      ) : null}
    </section>
  );
});

export default ToolChest;
