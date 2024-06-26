import { Col, Popconfirm, Slider, message } from "antd";
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
import "./chest-index.css";

const ItemsChest = memo(() => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(-1);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [archiveGift, setArchiveGift] = useState();
  const [quantityDelete, setQuantityDelete] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

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

  const handleConfirm = (id) => {
    const data = {
      quantity: quantityDelete,
    };
    ArchiveAPI.deleteItem(data, id)
      .then((response) => {
        dispatch(SetArchiveCountGift(parseInt(response.data.quantity)));
        message.success("Xóa thành công!");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      })
      .finally(() => {
        fetchItems();
      });
  };

  return (
    <section className="item__chest">
      <div className="item__chest__list" gutter={16}>
        {dataItems.map((data, index) => (
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
            <Popconfirm
              title={
                <div>
                  <p>Số lượng:</p>
                  <Slider
                    value={quantityDelete}
                    onChange={(e) => {
                      setQuantityDelete(e);
                    }}
                    max={quantity}
                    min={0}
                    style={{ width: "70px" }}
                  />
                </div>
              }
              onConfirm={() => handleConfirm(archiveGift.id)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <div>Xóa</div>
            </Popconfirm>
          </div>
        </div>
      ) : null}
    </section>
  );
});

export default ItemsChest;
