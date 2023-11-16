import { Button, Col, message, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from "@ant-design/icons";
import React, { memo, useEffect } from "react";
import "./index.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { UpgradeRateApi } from "../../../apis/student/upgrade-rate/upgrade-rate.api";
import {
  GetArchiveGift,
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";
import {
  SetUpgradeRate,
  GetUpgradeRate,
} from "../../../app/reducers/upgrade-rate/upgrade-rate.reducer";

function ImageRenderer({ image }) {
  if (image) {
    const byteArray = image.split(",").map(Number);
    const uint8Array = new Uint8Array(byteArray);
    const blob = new Blob([uint8Array], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(blob);

    return <img src={imageUrl} alt="Hình ảnh" />;
  } else {
    return <div>Chưa có ảnh</div>;
  }
}
const UpgrateHoneyIndex = memo(() => {
  const dispatch = useAppDispatch();
  const [condition, setCondition] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [idUpgrade, setIdUpgrade] = useState(null);
  const [upgradeRateClicked, setUpgradeRateClicked] = useState(true);
  const [checkCondition, setcheckCondition] = useState(true);
  const [clickedItem, setClickedItem] = useState(null);
  const [valueGift, setValueGift] = useState(null);
  const [valueUpgrade, setvalueUpgrade] = useState(null);

  useEffect(() => {
    fetchArchive();
    fechUpgradeRate();
  }, []);

  const fetchArchive = () => {
    UpgradeRateApi.getArchiveByStudent({
      type: 1,
      name: valueGift ? valueGift.trim() : valueGift,
    }).then((response) => {
      response.data.data.map((item) => {
        return {
          ...item,
          check: false,
        };
      });
      dispatch(SetArchiveGift(response.data.data));
    });
  };
  const dataArchive = useAppSelector(GetArchiveGift);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchArchive();
    }
  };

  const fechUpgradeRate = () => {
    UpgradeRateApi.getUpgradeRate({
      name: valueUpgrade ? valueUpgrade.trim() : valueUpgrade,
    }).then((response) => {
      dispatch(SetUpgradeRate(response.data.data));
    });
  };
  const dataUpgradeRate = useAppSelector(GetUpgradeRate);

  const handleKeyDownUpgrade = (e) => {
    if (e.key === "Enter") {
      fechUpgradeRate();
    }
  };

  const fechCondition = (id) => {
    UpgradeRateApi.getGiftCondition(id).then((response) => {
      setCondition(response.data.data);
    });
  };

  const update = () => {
    UpgradeRateApi.update({ idUpgrade: idUpgrade, idGift: gifts }).then(
      (response) => {
        if (response.status === 200) {
          if (response.data.data === true) {
            message.success("Nâng cấp thành công");
          } else if (response.data.data === false) {
            message.error("Nâng cấp thất bại");
          }
          fetchArchive();
          fechCondition(idUpgrade);
          setGifts([]);
        } else {
          message.warning(response.response.data.message);
          fetchArchive();
          fechCondition(idUpgrade);
        }
      }
    );
  };

  const handleClickIdUR = (id) => {
    fechCondition(id);
    setIdUpgrade(id);
    fetchArchive();
    setUpgradeRateClicked(false);
    setClickedItem(id);
    setGifts([]);
  };

  const handleClickQuantity = (el) => {
    const newDataArchive = dataArchive.map((item) => {
      if (
        item.id === el.id &&
        !el.check &&
        condition.some((conditionItem) => conditionItem.idGift === el.idGift)
      ) {
        setGifts([...gifts, el.idGift]);
        return {
          ...item,
          quantity: item.quantity - 1,
          check: true,
        };
      }
      return {
        ...item,
      };
    });
    setcheckCondition(false);
    dispatch(SetArchiveGift(newDataArchive));

    const conditionCheck = condition.map((item) => {
      if (item.idGift === el.idGift) {
        return {
          ...item,
          check: true,
        };
      } else {
      }
      return {
        ...item,
      };
    });
    setCondition(conditionCheck);
  };

  const handleClickCondition = (el) => {
    const newDataArchive = dataArchive.map((item) => {
      if (item.idGift === el.idGift && el.check) {
        return {
          ...item,
          quantity: item.quantity + 1,
          check: false,
        };
      }
      return {
        ...item,
      };
    });
    const updatedGifts = gifts.filter((id) => id !== el.idGift);
    setGifts(updatedGifts);
    dispatch(SetArchiveGift(newDataArchive));

    const conditionCheck = condition.map((item) => {
      if (item.idGift === el.idGift) {
        return {
          ...item,
          check: false,
        };
      }
      return {
        ...item,
      };
    });
    setcheckCondition(true);
    setCondition(conditionCheck);
  };

  const handleClickUpdate = () => {
    if (upgradeRateClicked) {
      message.warning("Bạn chưa chọn loại mật ong nâng nâng cấp");
    } else if (dataArchive.length === 0 && checkCondition) {
      message.warning("Bạn không đủ vật phẩm để nâng cấp");
    } else if (checkCondition) {
      message.warning("Bạn chưa chọn vật phẩm nâng cấp ");
    } else if (dataArchive.length === 0) {
      message.warning("Bạn không đủ vật phẩm để nâng cấp");
    } else {
      update();
    }
  };

  return (
    <section className="upgrate__honey">
      <div className="upgrate__honey__item">
        <div className="upgrate__honey__header">
          <div className="upgrate__honey__list">
            <div className="upgrate__honey__filter">
              <div className="upgrate__honey__text">
                {" "}
                Chọn loại mật ong để nâng cấp{" "}
              </div>
              <div className="upgrate__search">
                <SearchOutlined />
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập tên..."
                  value={valueUpgrade}
                  onChange={(e) => setvalueUpgrade(e.target.value)}
                  onKeyDown={handleKeyDownUpgrade}
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "3px",
                    borderRadius: "5px",
                    color: "#26a387",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            <div className="upgrate__list">
              {dataUpgradeRate.map((item) => (
                <Col
                  span={24}
                  onClick={() => handleClickIdUR(item.id)}
                  className={clickedItem === item.id ? "clicked" : ""}
                >
                  <div className="upgrate__honey__detail">
                    <div className="upgrate__item__image">
                      <ImageRenderer image={item.image2} />
                    </div>
                    <div className="upgrate__item__text">
                      <div className="upgrate__text__name">
                        {item.originalHoney} {item.originalHoneyName}
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRightLong}
                      className="upgrate__icon"
                    />
                    <div className="upgrate__item__image">
                      <ImageRenderer image={item.image1} />
                    </div>
                    <div className="upgrate__item__text">
                      <div className="upgrate__text__name">
                        {item.destinationHoney} {item.destinationHoneyName}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </div>
          </div>
        </div>
        <div className="upgrate__honey__chest">
          <div className="upgrate__chest__choose">
            <div
              className="upgrate__honey__filter"
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
            >
              <div className="upgrate__honey__text"> Túi đồ </div>
              <div className="upgrate__search">
                <SearchOutlined />
                <input
                  type="text"
                  class="form-control"
                  value={valueGift}
                  onChange={(e) => setValueGift(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tên..."
                  style={{
                    border: "none",
                    outline: "none",
                    padding: "3px",
                    borderRadius: "5px",
                    color: "#26a387",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
            <div className="upgrate__chest__list">
              {dataArchive.map((item) => (
                <div
                  className={`upgrate__chest__wrapper ${
                    upgradeRateClicked
                      ? "cursor-not-allowed"
                      : !condition.some(
                          (conditionItem) =>
                            conditionItem.idGift === item.idGift
                        )
                      ? "cursor-not-allowed"
                      : item.check
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleClickQuantity(item)}
                >
                  <div class="upgrate__chest__overlay"></div>
                  <div className="upgrate__honey__image">
                    <ImageRenderer image={item.image} />
                  </div>
                  <div class="upgrate__chest__quantity">{item.quantity}</div>
                  <div class="upgrate__chest__name">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="upgrate__honey__choose">
        <div className="upgrate__list__title"> Phôi nâng cấp </div>
        <div className="upgrate__list__box">
          {condition !== null &&
            condition.map((item) => (
              <div
                className={`upgrate__chest__wrapper ${
                  item.check ? "" : "cursor-not-allowed"
                }`}
                onClick={() => handleClickCondition(item)}
              >
                <div
                  className={` ${item.check ? "" : "upgrate__condition__item"}`}
                ></div>
                <div className="upgrate__honey__image">
                  <ImageRenderer image={item.image} />
                </div>
                <div class="upgrate__condition__name">{item.name}</div>
              </div>
            ))}
        </div>
        <div className="div-button">
          <Button className="use__button" onClick={() => handleClickUpdate()}>
            <p className="button__text">Nâng cấp</p>
          </Button>
        </div>
      </div>
    </section>
  );
});

export default UpgrateHoneyIndex;
