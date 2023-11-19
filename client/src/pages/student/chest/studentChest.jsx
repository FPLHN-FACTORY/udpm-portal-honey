import React, { useEffect, useState } from "react";
import { Col, Row, Tabs, Tooltip } from "antd";
import "./studentChest.css";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetGiftArchive,
  SetGiftArchive,
} from "../../../app/reducers/archive-gift/gift-archive.reducer";
import {
  GetArchiveGift,
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";
import {
  GetArchiveChest,
  SetArchiveChest,
} from "../../../app/reducers/archive-gift/archive-chest.reducer";
import UsingGift from "./StudentUsingGift";
import OpenChest from "./StudentOpenChest";
import { ShoppingOutlined } from "@ant-design/icons";
import {
  GetArchiveCountGift,
  SetArchiveCountGift,
} from "../../../app/reducers/archive-gift/archive-count-gift.reducer";
const StudentChest = () => {
  const [filter, setFilter] = useState({ type: 0 });
  const dispatch = useAppDispatch();
  const dataGift = useAppSelector(GetGiftArchive);
  const dataChest = useAppSelector(GetArchiveChest);
  const dataArchive = useAppSelector(GetArchiveGift);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [archiveGift, setArchiveGift] = useState();
  const [archiveChest, setArchiveChest] = useState();
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

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
  useEffect(() => {
    fetchGift();
    fetchArchive();
    fetchChest();
  }, [filter]);

  const tabData = [
    {
      key: "0",
      label: "Quà",
    },
    {
      key: "1",
      label: "Vật phẩm",
    },
    {
      key: "2",
      label: "Dụng cụ",
    },
    {
      key: "3",
      label: "Rương",
    },
  ];

  const fetchGift = () => {
    ArchiveAPI.getGift(filter).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
    });
  };

  const fetchArchive = () => {
    ArchiveAPI.getArchive(filter).then((response) => {
      dispatch(SetArchiveGift(response.data.data));
    });
  };

  const fetchChest = () => {
    ArchiveAPI.getChest(filter).then((response) => {
      dispatch(SetArchiveChest(response.data.data));
    });
  };

  const handleTabChange = (key) => {
    setShowAdditionalInfo(false);
    if (key === "0") {
      setFilter({ type: 0 });
    } else if (key === "1") {
      setFilter({ type: 1 });
    } else if (key === "2") {
      setFilter({ type: 2 });
    } else if (key === "3") {
      setFilter({ type: 3 });
    }
  };

  const detailArchive = (id) => {
    ArchiveAPI.detailArchiveGift(id).then((response) => {
      setNote(response.data.note);
      setName(response.data.name);
      dispatch(SetArchiveCountGift(response.data.quantity));
    });
  };

  const detailArchiveChest = (id) => {
    ArchiveAPI.detailArchiveChest(id).then((response) => {
      setNote(response.data.note);
      setName(response.data.name);
      dispatch(SetArchiveCountGift(response.data.quantity));
    });
  };

  const quantityArchive = useAppSelector(GetArchiveCountGift);

  return (
    <section className="student__chest">
      <div className="chest__menu">
        <div className="chest__menu__logo">
          <ShoppingOutlined className="icon__store" />
          Túi đồ
        </div>
      </div>
      <Row className="row-content">
        <Col span={7} className="chest-transaction">
          <Row className="row-items">
            <Col span={4}>
              {showAdditionalInfo && quantityArchive !== 0 ? (
                <div className="chess-square-note">
                  <div className="item">
                    <img
                      src={require("../../../assets/images/ui-student/avata-item.png")}
                      alt=""
                    />
                  </div>
                  <span className="name-item">{name}</span>
                  <span className="quantity-item">
                    Số lượng: {quantityArchive}
                  </span>
                  <span className="quantity-item">{note}</span>
                  <div className="div-button">
                    {filter.type === 3 ? (
                      <OpenChest chest={archiveChest} />
                    ) : (
                      <UsingGift archivegift={archiveGift} filter={filter} />
                    )}
                  </div>
                </div>
              ) : null}
            </Col>
          </Row>
        </Col>

        <Col span={14}>
          <Row className="row-chest">
            {filter.type === 0 &&
              dataGift.map((data, id) => (
                <Col key={id} span={4}>
                  <Tooltip title={data.name}>
                    <div
                      className="chess-square"
                      onClick={() => {
                        detailArchive(data.idGift);
                        setArchiveGift(data);
                        setShowAdditionalInfo(true);
                      }}
                    >
                      <ImageRenderer image={data.image} />
                      <div className="quantity-gift">{data.quantity}</div>
                    </div>
                  </Tooltip>
                </Col>
              ))}
            {(filter.type === 1 || filter.type === 2) &&
              dataArchive.map((data, id) => (
                <Col key={id} span={4}>
                  <Tooltip title={data.name}>
                    <div
                      className="chess-square"
                      onClick={() => {
                        detailArchive(data.idGift);
                        setArchiveGift(data);
                        setShowAdditionalInfo(true);
                      }}
                    >
                      <ImageRenderer image={data.image} />
                      <div className="quantity-gift">{data.quantity}</div>
                    </div>
                  </Tooltip>
                </Col>
              ))}

            {filter.type === 3 &&
              dataChest.map((data, id) => (
                <Col key={id} span={4}>
                  <Tooltip title={data.name}>
                    <div
                      className="chess-square"
                      onClick={() => {
                        detailArchiveChest(data.chestId);
                        setArchiveChest(data);
                        setShowAdditionalInfo(true);
                      }}
                    >
                      <ImageRenderer image={data.image} />
                      <div className="quantity-gift">{data.quantity}</div>
                    </div>
                  </Tooltip>
                </Col>
              ))}
          </Row>
        </Col>
        <div className="chest__tab">
          <div className="chest__tab__list">
            <Tabs
              defaultActiveKey="0"
              items={tabData}
              onChange={handleTabChange}
            />
          </div>
        </div>
      </Row>
    </section>
  );
};
export default StudentChest;
