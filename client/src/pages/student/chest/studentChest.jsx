import React, { useEffect, useState } from "react";
import { Card, Col, Pagination, Row, Spin, Tabs } from "antd";
import "./studentChest.css";
import { ArchiveAPI } from "../../../apis/student/archive/ArchiveAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  GetGiftArchive,
  SetGiftArchive,
} from "../../../app/reducers/archive-gift/gift-archive.reducer";
import {
  FindByIdArchiveGift,
  GetArchiveGift,
  SetArchiveGift,
} from "../../../app/reducers/archive-gift/archive-gift.reducer";
import {
  GetArchiveChest,
  SetArchiveChest,
} from "../../../app/reducers/archive-gift/archive-chest.reducer";
import UsingGift from "./StudentUsingGift";
import OpenChest from "./StudentOpenChest";
const StudentChest = () => {
  const [filter, setFilter] = useState({ type: 0 });
  const [tabPosition] = useState("right");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const dataGift = useAppSelector(GetGiftArchive);
  const dataChest = useAppSelector(GetArchiveChest);
  const dataArchive = useAppSelector(GetArchiveGift);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
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

  const items = [
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
    setLoading(true);
    ArchiveAPI.getGift(filter).then((response) => {
      dispatch(SetGiftArchive(response.data.data));
      setLoading(false);
    });
  };

  const fetchArchive = () => {
    setLoading(true);
    ArchiveAPI.getArchive(filter).then((response) => {
      dispatch(SetArchiveGift(response.data.data));
      setLoading(false);
    });
  };

  const fetchChest = () => {
    setLoading(true);
    ArchiveAPI.getChest(filter).then((response) => {
      dispatch(SetArchiveChest(response.data.data));
      console.log(response.data.data);
      setLoading(false);
    });
  };

  const handleTabChange = (key) => {
    setName("");
    setNote("");
    setQuantity("");
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
      setQuantity("Số lượng: " + response.data.quantity);
    });
  };

  const detailArchiveChest = (id) => {
    ArchiveAPI.detailArchiveChest(id).then((response) => {
      setNote(response.data.note);
      setName(response.data.name);
      setQuantity("Số lượng: " + response.data.quantity);
    });
  };

  return (
    <>
      <Spin spinning={loading}></Spin>
      <div
        className="dialog-transaction"
        style={{ minWidth: "800px", Height: "1000px" }}
      >
        <Card>
          <div className="bar-transaction" />
          <Row
            style={{
              padding: "5px 15px 0px 15px",
            }}
          >
            <Col span={12}>
              <div className="tag-backgroup">
                <b className="text-title"></b>
              </div>
            </Col>
            <Col span={12} className="col-title-balo">
              <div>
                <b className="title-balo">
                  <img
                    className="img-balo"
                    height={"30px"}
                    src={require("../../../assets/images/balo-student.png")}
                    alt="balo"
                  />
                  TÚI ĐỒ
                </b>
              </div>
            </Col>
          </Row>
          <Row className="row-content">
            <Col span={7} className="chest-transaction">
              <Row className="row-items">
                <Col span={4}>
                  {showAdditionalInfo ? (
                    <div className="chess-square-note">
                      <div className="item">
                        <img
                          src={require("../../../assets/images/ui-student/avata-item.png")}
                          alt=""
                        />
                      </div>
                      <span className="name-item">{name}</span>
                      <span className="quantity-item">{quantity}</span>
                      <hr
                        style={{
                          height: "2px",
                          width: "85%",
                          backgroundColor: "black",
                        }}
                      />
                      <span className="quantity-item">{note}</span>
                      <div className="div-button">
                        {filter.type === 3 ? (
                          <OpenChest chest={archiveChest} />
                        ) : (
                          <UsingGift
                            archivegift={archiveGift}
                            filter={filter}
                          />
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
                      <div
                        className="chess-square"
                        onClick={() => {
                          detailArchive(data.idGift);
                          setArchiveGift(data);
                          setShowAdditionalInfo(true);
                        }}
                      >
                        <ImageRenderer image={data.image} />
                      </div>
                    </Col>
                  ))}
                {(filter.type === 1 || filter.type === 2) &&
                  dataArchive.map((data, id) => (
                    <Col key={id} span={4}>
                      <div
                        className="chess-square"
                        onClick={() => {
                          detailArchive(data.idGift);
                          setArchiveGift(data);
                          setShowAdditionalInfo(true);
                        }}
                      >
                        <ImageRenderer image={data.image} />
                      </div>
                    </Col>
                  ))}

                {filter.type === 3 &&
                  dataChest.map((data, id) => (
                    <Col key={id} span={4}>
                      <div
                        className="chess-square"
                        onClick={() => {
                          detailArchiveChest(data.chestId);
                          setArchiveChest(data);
                          setShowAdditionalInfo(true);
                        }}
                      >
                        <ImageRenderer image={data.image} />
                      </div>
                    </Col>
                  ))}
              </Row>
            </Col>
            <Tabs
              defaultActiveKey="0"
              tabPosition={tabPosition}
              items={items}
              onChange={handleTabChange}
              style={{ color: "white", fontWeight: "700" }}
            />
          </Row>
          {/* <Pagination simple defaultCurrent={2} total={50} /> */}
        </Card>
      </div>
    </>
  );
};
export default StudentChest;
