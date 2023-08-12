import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Menu,
  Row,
  Space,
  Tooltip,
  Typography,
  Image,
  message,
} from "antd";
import Meta from "antd/es/card/Meta";
import {
  BookOutlined,
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  LineOutlined,
  MinusCircleOutlined,
  ShareAltOutlined,
  StarFilled,
} from "@ant-design/icons";
import moment from "moment";
import { TymAPI } from "../../../apis/user/auth/tym/tym.api";
import { getImageUrl } from "../../../AppConfig";
import { Link } from "react-router-dom";

const CardMyArticle = (props) => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    setCardsData(props.data);
  }, [props.data]);

  const handleLike = async (id) => {
    try {
      await TymAPI.createTymArticle({
        articlesId: id,
      });
      setCardsData((prevCardsData) =>
        prevCardsData.map((card) => {
          if (card.id === id) {
            const newFavoriteValue = card.favorite === 0 ? 1 : 0;
            const newTymValue =
              newFavoriteValue === 1 ? card.tym + 1 : card.tym;
            return { ...card, favorite: newFavoriteValue, tym: newTymValue };
          }
          return card;
        })
      );
    } catch (error) {
      message.error("Lỗi");
    }
  };
  const handleUnlike = async (id) => {
    try {
      await TymAPI.deleteTymArticle(id);
      setCardsData((prevCardsData) =>
        prevCardsData.map((card) => {
          if (card.id === id) {
            const newFavoriteValue = card.favorite === 1 ? 0 : 1;
            const newTymValue =
              newFavoriteValue === 1 ? card.tym + 1 : card.tym - 1;
            return { ...card, favorite: newFavoriteValue, tym: newTymValue };
          }
          return card;
        })
      );
    } catch (error) {
      message.error("Lỗi");
    }
  };

  const [index, setIndex] = useState("");

  const onClick = (e) => {
    setIndex(e.key);
  };

  const menu = (
    <Menu onClick={onClick} selectedKeys={[index]}>
      <Menu.Item key="setting:1">Option 1</Menu.Item>
      <Menu.Item key="setting:2">Option 2</Menu.Item>
    </Menu>
  );
  const onVisibleChange = (visible) => {
    if (!visible) {
      setIndex(null);
    }
  };
  const UserInfoTooltip = ({ name, followCount, descriptive, img }) => (
    <div style={{ alignItems: "center", color: "#000" }}>
      <div className="flex">
        <Avatar src={img} />
        <p className="ml-3 mt-1 text-white-400" variant="subtitle1">
          {name}
        </p>
      </div>

      <p>My name is Hai, I am human, hihi, nice to meet you.</p>
      <hr />
      <Row>
        <Col span={12}>
          <p>Followers: 12</p>
        </Col>
        <Col span={12}>
          <Button
            style={{ borderRadius: "20px" }}
            className="bg-green-500 mt-2 float-right  hover:bg-green-400 border-0"
          >
            <span style={{ color: "aliceblue" }}>Follow</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
  return (
    <div className="pb-10">
      <div>
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md relative mb-6"
          >
            <Card>
              <Row>
                <Col span={16}>
                  <div className="flex pb-2">
                    <div className="flex">
                      <Tooltip
                        key={card.id}
                        color="#fff"
                        placement="right"
                        title={<UserInfoTooltip {...card} />}
                      >
                        <Avatar src={card.img} />
                      </Tooltip>
                      <Typography
                        avatar={card.img}
                        variant="subtitle1"
                        className="ml-3 pt-1 font-bold"
                      >
                        {card.name}
                      </Typography>
                    </div>
                    <div className="flex pt-1">
                      <span>
                        <LineOutlined style={{ transform: "rotate(90deg)" }} />
                      </span>
                      <span>
                        {moment(card.browseDate).format("DD/MM/YYYY")}
                      </span>
                      <span className="text-yellow-400">
                        <StarFilled style={{ marginLeft: "10px" }} />
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        <Link href={`/articel?category=`}>
                          {card.nameCategory}
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <Meta
                      title={<span className="text-xl"> {card.title}</span>}
                      description={
                        <>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            {/* HashTag */}
                            <Space
                              size={[0, 8]}
                              wrap
                              className="float-left mt-3"
                            >
                              {/* {card.hashtags.split(", ").map((el) => (
                                <Tag bordered={false} className="rounded-lg">
                                  <Link href={`/articel?hashtag=`}>{el}</Link>
                                </Tag>
                              ))} */}
                            </Space>

                            {/* Description */}
                            <div className="flex items-center">
                              <p
                                className="w-4/5"
                                style={{
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {card.descriptive}
                              </p>{" "}
                              <Link
                                className="w-1/5"
                                to={`/user/my-article/${card.id}`}
                              >
                                Xem thêm
                              </Link>
                            </div>

                            {/* Like share comment */}
                            <div className="flex mt-3 -ml-3.5 float-left">
                              <span className="flex items-center ml-4 text-base">
                                {card.favorite === 1 ? (
                                  <HeartFilled
                                    style={{ color: "red" }}
                                    onClick={() => handleUnlike(card.id)}
                                  />
                                ) : (
                                  <HeartOutlined
                                    onClick={() => handleLike(card.id)}
                                  />
                                )}
                                <span className="text-base ml-1">
                                  {card.tym}
                                </span>
                              </span>

                              <span className="flex items-center ml-4 text-base cursor-pointer">
                                <CommentOutlined className="hover:text-blue-500" />
                                <span className="text-base ml-1">
                                  {card.comment}
                                </span>
                              </span>

                              <span className="flex items-center ml-4 text-base cursor-pointer">
                                <BookOutlined className="hover:text-blue-500" />
                              </span>
                              <span className="flex items-center ml-4 text-base cursor-pointer">
                                <MinusCircleOutlined className="hover:text-blue-500" />
                              </span>
                              <Dropdown
                                overlay={menu}
                                trigger={["click"]}
                                onVisibleChange={onVisibleChange}
                              >
                                <span className="flex items-center ml-4 text-base cursor-pointer">
                                  <ShareAltOutlined className="hover:text-blue-500" />
                                </span>
                              </Dropdown>
                            </div>
                          </div>
                        </>
                      }
                      className="text-left"
                    />
                  </div>
                </Col>
                <Col span={8} className="flex justify-end items-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      float: "right",
                    }}
                  >
                    <Image
                      style={{
                        height: "130px",
                        objectFit: "cover",
                      }}
                      alt="example"
                      src={getImageUrl(card.id)}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardMyArticle;
