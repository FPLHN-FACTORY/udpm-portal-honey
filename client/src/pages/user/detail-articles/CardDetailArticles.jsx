import React from "react";
import anh1 from "../../../assets/images/home-decor-1.jpeg";
import { Avatar, Button, Col, Row, Space, Typography } from "antd";
import {
  BookOutlined,
  CommentOutlined,
  HeartOutlined,
  MailOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useState, useEffect } from "react";
import moment from "moment";
import JoditEditor from "jodit-react";
import "./index.css";
import { ArticleAPI } from "../../../apis/user/auth/article/article.api";
import DemoComment from "./demoComment";

const DetailArticles = (props) => {
  const [cardsData, setCardsData] = useState([]);
  const [articleByAuthor, setArticleByAuthor] = useState([]);
  const [articleByCategory, setArticleByCategory] = useState([]);
  useEffect(() => {
    setCardsData(props.data);
  }, [props.data]);

  useEffect(() => {
    const fetchArticlesByAuthor = async () => {
      try {
        const dataByAuthor = {
          userId: cardsData.userId,
        };
        const dataByCate = {
          categoryName: cardsData.nameCategory,
        };
        const response = await ArticleAPI.fetchAllArticleByAuthor(dataByAuthor);
        setArticleByAuthor(response.data.data.data);
        const response1 = await ArticleAPI.fetchAllArticleByCategory(
          dataByCate
        );
        setArticleByCategory(response1.data.data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticlesByAuthor();
  }, [cardsData]);

  return (
    <div className="justify-items-center">
      <Row>
        <Col span={24}>
          <h1 className="text-5xl text-slate-900 font-bold not-italic mb-8 ">
            {cardsData.title}
          </h1>
          <div className="flex">
            <Avatar src={anh1} style={{ width: "48px", height: "48px" }} />

            <div className="ml-3 mt-1">
              <div className="flex">
                <Typography variant="subtitle1">{cardsData.name}</Typography>
                <span className="text-3xl text-slate-900 font-normal ml-1 -mt-4 ">
                  .
                </span>

                <span className="ml-1 text-green-900">
                  <a href="# ">Follow</a>
                </span>
              </div>
              <span>{moment(cardsData.browseDate).format("DD/MM/YYYY")}</span>
            </div>
          </div>
          <div
            className="flex mt-8 -ml-3.5 py-3 px-1 justify-between"
            style={{
              borderBottom: "1px solid rgba(242, 242, 242, 1)",
              borderTop: "1px solid rgba(242, 242, 242, 1)",
            }}
          >
            <div className="flex">
              <span className="flex items-center ml-4 text-base">
                <HeartOutlined />
                <span className="text-base ml-1">{cardsData.tym}</span>
              </span>
              <span className="flex items-center ml-4 text-base">
                <CommentOutlined className="hover:text-blue-500" />
                <span className="text-base ml-1">
                  {cardsData.numberComments}
                </span>
              </span>
            </div>
            <div className="flex">
              <span className="flex items-center ml-4 text-base">
                <BookOutlined className="hover:text-blue-500" />
              </span>
              <span className="flex items-center ml-4 text-base">
                <ShareAltOutlined />
              </span>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <JoditEditor
              value={cardsData.content}
              tabIndex={-1}
              config={{
                readonly: true,
                toolbar: false,
                showCharsCounter: false,
                showWordsCounter: false,
                showStatusbar: true,
                showPoweredBy: false,
                className: "view_editor_jodit",
                style: {
                  backgroundColor: "rgb(250, 250, 250)",
                  border: "none",
                },
              }}
            />
          </div>
          <Row>
            <div className=" float-left pt-5 pb-10">
              <Space size={[0, 8]} wrap>
                {/* {cardsData.hashtags.split(", ").map((el) => (
                  <Tag bordered={false} className="rounded-lg">
                    <Link href={`/articel?hashtag=`}>{el}</Link>
                  </Tag>
                ))} */}
              </Space>
            </div>
          </Row>
        </Col>
      </Row>
      <div style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}>
        <div
          className="pt-16 "
          style={{
            borderBottom: "1px solid rgba(242, 242, 242, 1)",
          }}
        >
          <div>
            <a href="# ">
              <Avatar src={anh1} style={{ width: "72px", height: "72px" }} />
            </a>
          </div>
          <div className="flex -mt-3 mb-3 justify-between">
            <div>
              <h3 className="text-2xl font-medium mb-3">
                <a href="# " className="text-black">
                  Written by {cardsData.name}
                </a>
              </h3>
              <a href="# ">206K Followers</a>
              <p>
                Chào các bạn mình là Hải cute, cảm ơn các bạn đã ủng hộ bài viết
                của mình.
              </p>
            </div>
            <div className="mt-6 ">
              <Button
                className="rounded-3xl border-black bg-black px-4 py-2 text-white h-9 w-16 leading-2"
                style={{
                  borderRadius: "30px",
                }}
              >
                Follow
              </Button>
              <Button
                className=" border-2 border-black bg-black  text-sm  ml-2"
                style={{
                  borderRadius: "99em",
                  padding: "4px 9px",
                  color: " rgba(255, 255, 255, 1)",
                  lineHeight: "10px",
                }}
              >
                <MailOutlined className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
        <DemoComment></DemoComment>
        <Row className="pt-5 ">
          <h2 style={{ color: "#242424" }}>More from {cardsData.name}</h2>
        </Row>
        <div
          className="grid grid-cols-2 gap-4 pb-14"
          style={{
            borderBottom: "1px solid rgba(242, 242, 242, 1)",
            gap: "30px",
          }}
        >
          {articleByAuthor.map((item) => (
            <Card
              style={{
                width: "500px",
              }}
            >
              <div>
                <div className="flex -ml-2">
                  <div className="flex ml-2">
                    <Avatar className="mb-2" src={anh1} />
                    <Typography className="ml-2 pt-1" variant="subtitle1">
                      {item.name}
                    </Typography>
                  </div>
                  <span className="text-3xl text-slate-900 font-normal ml-1 -mt-3 ">
                    .
                  </span>
                  <div className="flex ml-1 pt-1">
                    <span>{moment(item.browseDate).format("DD/MM/YYYY")}</span>
                    <span> </span>
                  </div>
                </div>

                <Meta
                  className="flex mb-4 "
                  style={{ marginTop: "-20px" }}
                  title={<span className="text-xl">{item.title}</span>}
                  description={
                    <span className="text-base">{item.descriptive}</span>
                  }
                />

                <Space size={[0, 8]} wrap>
                  {/* {item.hashtags.split(", ").map((el) => (
                    <Tag bordered={false} className="rounded-lg">
                      <Link href={`/articel?hashtag=`}>{el}</Link>
                    </Tag>
                  ))} */}
                </Space>

                <div className="flex mt-3 -ml-3">
                  <span className="flex items-center ml-4 text-">
                    <HeartOutlined className="text-base" />
                    <span className="text-base ml-1 -mt-1">{item.tym}</span>
                  </span>
                  {/* <span className="flex items-center ml-4 text-base">
                    <CommentOutlined className="text-base ml-1" />
                    <span className="text-base ml-1">{item.numberComment}</span>
                  </span> */}
                  <span className="flex items-center ml-4 text-base">
                    <ShareAltOutlined className="text-base ml-1" />
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Row className="-pt-16">
          <div>
            <button
              className="buttonSeeAll"
              style={{
                marginBottom: "60px",
              }}
            >
              See all from {cardsData.name}
            </button>
          </div>
        </Row>
        <Row
          style={{
            borderTop: "1px solid rgba(242, 242, 242, 1)",
          }}
        >
          <h2 className="pt-14" style={{ color: "#242424" }}>
            Recommended from {cardsData.nameCategory}
          </h2>
        </Row>
        <div
          className="pb-14 grid grid-cols-2 gap-4"
          style={{
            borderBottom: "1px solid rgba(242, 242, 242, 1)",
            gap: "30px",
          }}
        >
          {articleByCategory.map((item1) => (
            <Card
              style={{
                width: "500px",
              }}
            >
              <div>
                <div className="flex -ml-2">
                  <div className="flex ml-2">
                    <Avatar className="mb-2" src={anh1} />
                    <Typography className="ml-2 pt-1" variant="subtitle1">
                      {item1.name}
                    </Typography>
                  </div>
                  <span className="text-3xl text-slate-900 font-normal ml-1 -mt-3 ">
                    .
                  </span>
                  <div className="flex ml-1 pt-1">
                    <span>{moment(item1.browseDate).format("DD/MM/YYYY")}</span>
                    <span> </span>
                  </div>
                </div>

                <Meta
                  className="flex mb-4"
                  title={<span className="text-xl">{item1.title}</span>}
                  description={
                    <span className="text-base">{item1.descriptive}</span>
                  }
                />

                <Space size={[0, 8]} wrap>
                  {/* {item1.hashtags.split(", ").map((el) => (
                    <Tag bordered={false} className="rounded-lg">
                      <Link href={`/articel?hashtag=`}>{el}</Link>
                    </Tag>
                  ))} */}
                </Space>

                <div className="flex mt-3 -ml-3">
                  <span className="flex items-center ml-4 text-">
                    <HeartOutlined className="text-base" />
                    <span className="text-base ml-1 -mt-1">{item1.tym}</span>
                  </span>
                  {/* <span className="flex items-center ml-4 text-base">
                    <CommentOutlined className="text-base ml-1" />
                    <span className="text-base ml-1">{item1.numberComment}</span>
                  </span> */}
                  <span className="flex items-center ml-4 text-base">
                    <ShareAltOutlined className="text-base ml-1" />
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <Row>
          <div>
            <button
              style={{
                marginBottom: "60px",
              }}
              className="buttonSeeMore"
            >
              See more recommendations
            </button>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default DetailArticles;
